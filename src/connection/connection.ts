import { useEffect, useState, useRef } from "react";
import { Subject } from "rxjs";
import { Action } from "../reducer/actions";
import { ggCreds, twitchCreds } from "./credentials";

export const getTwitchData = () => fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `client_id=<${twitchCreds.clientId}>&client_secret=<${twitchCreds.clientSecret}>&grant_type=client_credentials`,
})
    .then(response => response.json())
    .then(data => console.log(data));

const useGG = (subject: Subject<Action>) => {
    const [credentials, setCredentials] = useState<{ user_id: string; token: string; result: boolean } | undefined>();
    const ws = useRef<WebSocket | null>(null);
    const obs = useRef(subject);

    useEffect(() => {
        const getCreds = async () => {  
            const formdata = new FormData();
            formdata.append("login", ggCreds.login);
            formdata.append("password", ggCreds.password);
            return await fetch('https://goodgame.ru/ajax/chatlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: formdata,
            }).then(response => response.json()).then(data => setCredentials({
                user_id: data.user_id,
                token: data.token,
                result: data.result,
            }));
        }

        getCreds();
    }, []);

    useEffect(() => {
        if (!credentials) return;

        ws.current = new WebSocket('wss://chat.goodgame.ru/chat/websocket');

        ws.current.onopen = () => {
            console.log('ggWsOpened');
            ws.current?.send(JSON.stringify({
                type: 'auth',
                data: {
                    user_id: credentials.user_id,
                    token: credentials.token,
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
                case 'message':
                    obs.current.next({
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
        }
    }, [credentials?.token]);
};

export const useConnection = () => {
    const subject = new Subject<Action>();
    useGG(subject);

    return subject;
};