import React, { Dispatch } from 'react';
import { Text, View } from 'react-native';

export const ChatSettings = () => {
    return (
        <View style={settingsStyle.wrapper}><Text style={{color: 'white'}}>Chat Settings</Text></View>
    )
};

const settingsStyle = {
    wrapper: {
        flexGrow: 1,
    }
}