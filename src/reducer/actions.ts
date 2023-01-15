import { MessageType, Platform, ScreenView } from "./reducer";

interface NewMessage {
    type: 'newMessage';
    payload: MessageType;
}

interface DeleteMessage {
    type: 'deleteMessage';
    payload: {
        messageId: number;
    };
}

interface BanUser {
    type: 'banUser';
    payload: {
        userId: number;
    };
}

interface ChageView {
    type: 'changeView';
    payload: ScreenView;
}

interface ConnectAccount {
    type: 'connectAccount';
    payload: Platform;

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

export type Action = NewMessage
    | DeleteMessage
    | BanUser 
    | ChageView 
    | ConnectAccount 
    | DisconnectAccount
    | ConnectPlatform
    | DisconnectPlatform;