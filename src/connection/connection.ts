import { useEffect, useState, useRef, useCallback } from "react";
import { Subject } from "rxjs";
import { Action } from "../reducer/actions";
import EncryptedStorage from 'react-native-encrypted-storage';
import { ConnectionAction } from "./actions";

export interface Credentials {
    login: string;
    password: string;
}

// export const getTwitchData = () => fetch('https://id.twitch.tv/oauth2/token', {
//     method: 'POST',
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: `client_id=<${twitchCreds.clientId}>&client_secret=<${twitchCreds.clientSecret}>&grant_type=client_credentials`,
// })
//     .then(response => response.json())
//     .then(data => console.log(data));

export const getGGsession = async (creds: Credentials) => {
    const formdata = new FormData();
    formdata.append("login", creds.login);
    formdata.append("password", creds.password);
    return await fetch('https://goodgame.ru/ajax/chatlogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: formdata,
    }).then(response => response.json()).then(data => ({
        user_id: data.user_id,
        token: data.token,
        result: data.result,
    }));
}

const useGG = (fromNetwork: Subject<Action>, toNetwork: Subject<ConnectionAction>) => {
    const [ session, setSession ] = useState<{ user_id: string; token: string; result: boolean} | undefined>();
    const ws = useRef<WebSocket | null>(null);

    const getSavedCreds = useCallback(async (): Promise<Credentials | null> => {
        const creds = await EncryptedStorage.getItem('gg');
        if (!creds) return null;
        return JSON.parse(creds);
    }, []);

    const getSavedSessionData = useCallback(async () => {
        const session = await EncryptedStorage.getItem('ggSession');
        console.log('GET_SESSION_DATA', session);
        if (!session) return null;
        return JSON.parse(session);
    }, []);


    const runSession = useCallback(async () => {
        const sessionData = await getSavedSessionData();
        console.log('SESSION_DATA', sessionData);
        if (sessionData) {
            setSession(sessionData);
        } else {
            const creds = await getSavedCreds();
            if (creds) {
                const newSessionData = await getGGsession(creds);
                if (newSessionData.result) {
                    EncryptedStorage.setItem('ggSession', JSON.stringify(newSessionData));
                    setSession(newSessionData);
                }
            }
        }
    }, []);

    useEffect(() => {
        // runSession();
    }, []);

    
    useEffect(() => {
        toNetwork.subscribe({
            next: (event) => {},
            error: (err) => console.error(err),
        });

        return () => toNetwork.unsubscribe();
    }, []);

    useEffect(() => {
        if (!session) return;
        ws.current = new WebSocket('wss://chat.goodgame.ru/chat/websocket');

        ws.current.onopen = () => {
            console.log('ggWsOpened');
            ws.current?.send(JSON.stringify({
                type: 'auth',
                data: {
                    user_id: session.user_id,
                    token: session.token,
                }
            }));
        };

        ws.current.onmessage = (event) => {
            const { data, type } = JSON.parse(event.data);
            console.log('ggWsMessage', data, type);
            switch(type) {
                case 'success_auth':
                    ws.current?.send(JSON.stringify({
                        type: 'join',
                        data: {
                            channel_id: 29403,
                            hidden: false,
                        }
                    }));
                    break;
                case 'success_join':
                    fromNetwork.next({
                        type: 'connectPlatform',
                        payload: 'gg',
                    });
                    break;
                case 'message':
                    fromNetwork.next({
                        type: 'newMessage',
                        payload: {
                            platform: 'gg',
                            userName: data.user_name,
                            userId: data.user_id,
                            messageId: data.message_id,
                            text: data.text,
                            removed: false,
                        }
                    });
                    break;
                case 'remove_message':
                    break;
                default:
                    break;
            }
        };

        ws.current.onerror = (error) => {
            console.error('ggWsError', error.message);
        };

        ws.current.onclose = (event) => {
            console.warn('ggWsClose', event.code, event.reason);
        };

        return () => {
            ws.current?.close();
            setSession(undefined);
        }
    }, [session]);
};

export const useConnection = () => {
    const flowFromNetwork = useRef(new Subject<Action>());
    const flowToNetwork = useRef(new Subject<ConnectionAction>());
    useGG(flowFromNetwork.current, flowToNetwork.current);

    return { flowFromNetwork: flowFromNetwork.current, flowToNetwork: flowToNetwork.current };
};