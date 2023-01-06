import { Action } from "./actions";

export interface MessageType {
    platform: 'gg' | 'tw' | 'vk';
    userName: string;
    userId: number;
    messageId: number;
    text: string;
    removed: boolean;
}

export type ScreenView = 'main' | 'connectionSetting' | 'chatSetting';

export interface StateType {
    messages: MessageType[];
    connnectedPlatforms: string[];
    view: ScreenView;
}

export const initialState: StateType = {
    messages: [],
    connnectedPlatforms: [],
    view: 'main',
};

export const reducer = (state: StateType, action: Action) => {
    console.log('STATE UPDATE', action);
    switch (action.type) {
        case 'newMessage':
            const tmpMssgs = state.messages.slice(0, 48);
            tmpMssgs.unshift(action.payload);
            return {
                ...state,
                messages: tmpMssgs,
            };
        case 'deleteMessage':
            return state;
        case 'banUser':
            return state;
        case 'changeView':
            return {
                ...state,
                view: action.payload,
            };
        default:
            throw new Error();
    }
}