import React from 'react';
import { ScrollView } from 'react-native';
import { MessageType } from '../../reducer/reducer';
import { Message } from './Message';

export const Chat = (props: { messages: MessageType[] }) => {
    const { messages } = props;
    console.log('CHAT', messages);
    return (
        <ScrollView>
            {messages.map((message, index) => <Message key={message.messageId} {...message} />)}
        </ScrollView>
    );
}