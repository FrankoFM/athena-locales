import * as alt from 'alt-server';
import { Athena } from '../../../../server/api/athena';
import { AgendaSystem } from '../../../../server/systems/agenda';
import { LOCALES_CLIENT } from '../../shared/events';

import { locales, placeholder } from '../../shared/locales';

let currentLanguage: Array<string> = [];

/**
 * All locales have a base language in ISO-639-1.
 * Example for English is: 'en'.
 *
 * Variables are replaced in their respective orders.
 * Variable placeholders are written with: _%_ (changeable in shared/locales.ts)
 */

export class LocalelsServer {
    /**
     * Sets the language of the player
     * -> Save it to the database
     * -> Emits the language to the client
     * @static
     * @param {alt.Player} player
     * @param {string} [iso639="en"]
     * @return {*}
     * @memberof LocalelsServer
     */
    static setLanguage(player: alt.Player, iso639: string = "en") {
        if (!locales[iso639]) {
            alt.log(`Language ${iso639} was not found`);
            return;
        }

        // Set the language serverside
        currentLanguage[player.id] = iso639;

        // Set the language clientside and for webviews
        alt.emitClient(player, LOCALES_CLIENT.UPDATE_LOCALES, iso639);

        // Update the player's language in the database
        if (iso639 !== player.accountData.language) {
            Athena.database.funcs.updatePartialData(
                player.accountData._id,
                { language: iso639 },
                Athena.database.collections.Accounts
            );
        }
    }


    /**
     * Returns the local string for the given key and args in the players language
     * @static
     * @param {alt.Player} player
     * @param {string} key
     * @param {...any[]} args
     * @return {*}  {string}
     * @memberof LocalelsServer
     */
    static get(player: alt.Player, key: string, ...args: any[]): string {
        if (!locales[currentLanguage[player.id]]) {
            alt.log(
                `Language ${currentLanguage[player.id]} for player ${
                    player.data._id
                } was not found`
            );
            return `${currentLanguage[player.id]} - ${key}`;
        }

        if (!locales[currentLanguage[player.id]][key]) {
            alt.log(
                `Translation key ${key} for player ${player.data._id} was not found`
            );
            return key;
        }

        let message = locales[currentLanguage[player.id]][key];

        if (args && args.length > 0) {
            for (const element of args) {
                message = message.replace(placeholder, element);
            }
        }

        return message;
    }
}

// Leave it at 3 if possible. So the player gets the locals as soon as possible.
// @2 the `player.accountData` gets loaded so its not possible to load the language before that.
AgendaSystem.set(3, (player: alt.Player) => {
    LocalelsServer.setLanguage(
        player,
        player.accountData.language ?? undefined
    );
    AgendaSystem.goNext(player);
});
