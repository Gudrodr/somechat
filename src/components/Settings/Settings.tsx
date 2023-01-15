import React, { Dispatch } from 'react';
import { Action } from '../../reducer/actions';
import { StateType } from '../../reducer/reducer';
import { ChatSettings } from './ChatSettings';
import { Accounts } from './Accounts/Accounts';
import { Subject } from 'rxjs';
import { ConnectionAction } from '../../connection/actions';

export interface SettingsProps {
    state: StateType;
    dispatch: Dispatch<Action>;
    flowToNetwork: Subject<ConnectionAction>;
}

export const Settings = (props: SettingsProps) => {
    return props.state.view === 'accountsSetting'
        ? <Accounts state={props.state} dispatch={props.dispatch} flowToNetwork={props.flowToNetwork} />
        : <ChatSettings />
};