import React, { useCallback, useEffect, useState } from 'react';
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from 'react-native';
import { Platform } from '../../../reducer/reducer';
import { SettingsProps } from '../Settings';
import { Credentials } from '../../../connection/connection';

export interface AccountProps extends SettingsProps {
    platform: Platform;
}

const defaultCredsValue = { login: '', password: '' };

export const Account = (props: AccountProps) => {
    const { state, platform, flowToNetwork } = props;
    const [ creds, setCreds ] = useState<Credentials>(defaultCredsValue);
    const [ isValid, setIsValid ] = useState(false);
    const titles = {
        gg: 'Good Game',
        tw: 'Twitch',
        vk: 'VK Play Live',
    };

    const disconnectAccount = useCallback(() => {
        flowToNetwork.next({
            type: 'disconnectAccount',
            payload: platform,
        });
    }, []);

    const connectAccount = useCallback(() => {
        console.log('CREDS', creds);
        if (!isValid) return;
        flowToNetwork.next({
            type: 'connectAccount',
            payload: {
                platform,
                ...creds,
            }
        });
    }, [creds]);

    const setLogin = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setCreds({
            password: creds.password,
            login: e.nativeEvent.text,
        });
    }, [creds?.password]);

    const setPassword = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setCreds({
            login: creds.login,
            password: e.nativeEvent.text,
        });
    }, [creds?.login]);

    useEffect(() => {
        setCreds(defaultCredsValue);
    }, [state.accounts]);

    useEffect(() => {
        setIsValid(creds?.login !== '' && creds?.password !== '');
    }, [creds]);

    return (
        <View>
            <Text style={settingsStyle.titleText as any}>{titles[platform]}</Text>
            <View>
                {props.state.accounts.includes(platform) && <View style={settingsStyle.blockingLayer as any} />}
                <TextInput
                    placeholder='LOGIN'
                    style={settingsStyle.input}
                    value={creds.login}
                    onChange={setLogin}
                />
                <TextInput
                    secureTextEntry
                    placeholder='PASSWORD'
                    style={settingsStyle.input} 
                    value={creds.password}
                    onChange={setPassword}
                />
            </View>
            {state.accounts.includes(platform)
                ? <Pressable style={settingsStyle.pressable as any} onPress={disconnectAccount}>
                    <Text style={settingsStyle.pressableText as any}>Disconnect</Text>
                </Pressable>
                : <Pressable
                    style={settingsStyle.pressable as any}
                    disabled={!isValid}
                    onPress={connectAccount}
                >
                    <Text style={settingsStyle.pressableText as any}>Connect</Text>
                </Pressable>
            }
        </View>
    )
}

const settingsStyle = {
    titleText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    blockingLayer: {
        position: 'absolute',
        width: '100%',
        height: '95%',
        borderRadius: 4,
        backgroundColor: '#4C4E52',
        opacity: 0.8,
        zIndex: 2,
    },
    input: {
        backgroundColor: 'black',
        color: 'white',
        fontSize: 18,
        padding: 10,
        marginBottom: 5
    },
    pressable: {
        backgroundColor: '#161B22',
        height: 40,
        width:  100,
        borderRadius: 20,
        justifyContent: 'center'
    },
    pressableText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    }
}