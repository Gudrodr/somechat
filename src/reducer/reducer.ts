import { Action } from "./actions";

export type Platform = 'gg' | 'tw' | 'vk';

export interface MessageType {
    platform: Platform;
    userName: string;
    userId: number;
    messageId: number;
    text: string;
    removed: boolean;
}

export type ScreenView = 'main' | 'accountsSetting' | 'chatSetting';

export interface StateType {
    messages: MessageType[];
    accounts: Platform[];
    connnectedPlatforms: Platform[];
    view: ScreenView;
}

export const initialState: StateType = {
    messages: [],
    connnectedPlatforms: [],
    accounts: [],
    view: 'main',
};

export const reducer = (state: StateType, action: Action) => {
    console.log('STATE UPDATE', action);
    switch (action.type) {
        case 'connectPlatform':
            const connPlatforms = [...state.connnectedPlatforms];
            connPlatforms.push(action.payload);
            return {
                ...state,
                connnectedPlatforms: connPlatforms,
            };
        case 'disconnectPlatform':
            const connectedPltfrms = state.connnectedPlatforms.filter(platform => platform !== action.payload);
            return {
                ...state,
                connnectedPlatforms: connectedPltfrms,
            };
        case 'disconnectAccount':
            const filteredAccounts = state.accounts.filter(acc => acc !== action.payload);
            return {
                ...state,
                accounts: filteredAccounts,
            };
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
            console.log(`Undefined action -> ${action.type}`);
            return state;
    }
}