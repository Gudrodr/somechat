import React, { Dispatch } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SidebarProps } from './Sidebar';

export const SettingsTabs = (props: SidebarProps) => {
    const { state, dispatch } = props;
    return (
        <View
            style={{
                width: '100%',
                flexGrow: 4,
            }}
        >
            <Pressable
                style={tabStyle.pressable as any}
                onPress={() => dispatch({ type: 'changeView', payload: 'connectionSetting'})}
            >
                <Text style={tabStyle.text}>Conn</Text>
            </Pressable>
            <Pressable
                style={tabStyle.pressable as any}
                onPress={() => dispatch({ type: 'changeView', payload: 'chatSetting'})}
            >
                <Text style={tabStyle.text}>Chat</Text>
            </Pressable>
        </View>
    )
}

const tabStyle = {
    pressable: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        height: 75,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20
    }
};