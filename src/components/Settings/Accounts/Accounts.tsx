import React from 'react';
import { View } from 'react-native';
import { Platform } from '../../../reducer/reducer';
import { SettingsProps } from '../Settings';
import { Account } from './Account';

export const Accounts = (props: SettingsProps) => {
    const supportedPlatforms: Platform[] = ['gg'];

    return (
        <View style={settingsStyle.wrapper}>
            {supportedPlatforms.map(platform => (
                <Account
                    key={platform}
                    state={props.state}
                    dispatch={props.dispatch}
                    platform={platform}
                    flowToNetwork={props.flowToNetwork}
                />
            ))}
        </View>
    )
};

const settingsStyle = {
    wrapper: {
        flexGrow: 1,
        padding: 20
    },
}