import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MessageType } from '../../reducer/reducer';

export const Message = (props: MessageType) => {
    const { userName, text } = props;
    return (
        <View style={styles.wrapper}>
            <Text style={styles.textWrapper}> 
                <Text style={styles.nickname}>{userName}: </Text>
                <Text style={styles.text}>{text}</Text>
            </Text>
        </View>
    )
};


const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        borderColor: 'white',
        borderBottomWidth: 1,
    },
    textWrapper: {
        flex: 1,
        color: 'white',
        fontSize: 24,
    },
    nickname: {
        fontWeight: 'bold',
    },
    text: {},
  });