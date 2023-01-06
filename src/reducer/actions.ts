import { MessageType, ScreenView } from "./reducer";

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

export type Action = NewMessage | DeleteMessage | BanUser | ChageView;