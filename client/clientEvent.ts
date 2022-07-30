import * as alt from 'alt-client';
import { LOCALES_CLIENT } from '../shared/events';
import { LocalesClient } from './localesClient';

alt.onServer(LOCALES_CLIENT.UPDATE_LOCALES, LocalesClient.setLanguage);
