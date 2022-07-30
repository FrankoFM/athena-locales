import * as alt from 'alt-server';
import { PluginSystem } from '../../../server/systems/plugins';
import './src/accountExt';

const PLUGIN_NAME = 'Locales';

PluginSystem.registerPlugin(PLUGIN_NAME, async () => {
    alt.log(`~lg~Athena Plugin by franko ==> ${PLUGIN_NAME} was Loaded.`);
});
