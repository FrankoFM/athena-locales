import { locales, placeholder } from '../shared/locales';

let currentLanguage = 'en';

export class LocalesClient {
    static setLanguage(iso639: string = 'en') {
        if (!locales[iso639]) {
            console.log(`Language ${iso639} was not found`);
            return;
        }

        currentLanguage = iso639;
    }

    static get(key: string, ...args: any[]): string {
        if (!locales[currentLanguage]) {
            console.log(`Language ${currentLanguage} was not found`);
            return `${currentLanguage} - ${key}`;
        }

        if (!locales[currentLanguage][key]) {
            console.log(`Translation for key ${key} was not found`);
            return key;
        }

        let message = locales[currentLanguage][key];

        if (args && args.length > 0) {
            for (const element of args) {
                message = message.replace(placeholder, element);
            }
        }

        return message;
    }
}
