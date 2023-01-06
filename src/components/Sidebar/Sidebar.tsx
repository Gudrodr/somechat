import React, { Dispatch } from 'react';
import { View, Image } from 'react-native';
import { Action } from '../../reducer/actions';
import { StateType } from '../../reducer/reducer';
import { SettingsTabs } from './SettingsTabs';
import { Statusbar } from './Statusbar';

export const Sidebar = (props: { state: StateType, dispatch: Dispatch<Action> }) => {
    const { state, dispatch } = props;

    const switchView = (st: StateType) => {
        dispatch({ type: 'changeView', payload: st.view === 'main' ? 'connectionSetting' : 'main'})
    }

    return (
        <View style={{
            height: '100%',
            width: 75,
            borderRightWidth: 2,
            borderColor: 'gray',
            alignItems: 'center',
            paddingBottom: 15
        }}>
            {state.view === 'main' ? <Statusbar {...state} /> : <SettingsTabs state={state} dispatch={dispatch} /> }
            <View style={{ height: 50, flexGrow: 0 }} onTouchEnd={() => switchView(state)}>
                <Image source={require('../../../assets/gear.png')} />
            </View>
        </View>
    )   
}