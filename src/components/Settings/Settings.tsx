import React, { Dispatch } from 'react';
import { Action } from '../../reducer/actions';
import { StateType } from '../../reducer/reducer';
import { ChatSettings } from './ChatSettings';
import { ConnectionSettings } from './ConnectionSettings';

export const Settings = (props: { state: StateType, dispatch: Dispatch<Action> }) => {
    return props.state.view === 'connectionSetting'
        ? <ConnectionSettings />
        : <ChatSettings />
};