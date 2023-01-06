import React from 'react';
import { View } from 'react-native';
import { StateType } from '../../reducer/reducer';

export const Statusbar = (state: StateType) => {
    return (
        <View style={{
            flexGrow: 1
        }} />
    )
}