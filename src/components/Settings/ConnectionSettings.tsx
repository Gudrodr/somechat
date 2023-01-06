import React, { Dispatch } from 'react';
import { Text, TextInput, View } from 'react-native';

export const ConnectionSettings = () => {
    return (
        <View style={settingsStyle.wrapper}>
            <View>
                <Text style={settingsStyle.titleText as any}>GG</Text>
                <TextInput placeholder='LOGIN' style={settingsStyle.input} />
                <TextInput secureTextEntry placeholder='PASSWORD' style={settingsStyle.input} />
            </View>
        </View>
    )
};

const settingsStyle = {
    wrapper: {
        flexGrow: 1,
        padding: 20
    },
    titleText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    input: {
        backgroundColor: 'black',
        color: 'white',
        fontSize: 18,
        padding: 10,
        marginBottom: 5
    }
}