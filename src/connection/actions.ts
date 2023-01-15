import { Platform } from "../reducer/reducer";

interface ConnectAccount {
    type: 'connectAccount';
    payload: {
        platform: Platform;
        login: string;
        password: string;
    };

}

interface DisconnectAccount {
    type: 'disconnectAccount';
    payload: Platform;

}

interface ConnectPlatform {
    type: 'connectPlatform';
    payload: Platform;

}

interface DisconnectPlatform {
    type: 'disconnectPlatform';
    payload: Platform;

}

export type ConnectionAction = ConnectAccount 
    | DisconnectAccount
    | ConnectPlatform
    | DisconnectPlatform;