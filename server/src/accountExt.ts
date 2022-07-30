import * as accRef from '../../../../server/interface/iAccount';

declare module 'alt-server' {
    export interface Account extends Partial<accRef.Account> {
        language: string;
    }
}
