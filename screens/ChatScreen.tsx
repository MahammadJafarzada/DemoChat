// screens/ChatScreen.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat, IMessage, Send } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = () => {
  // Explicitly define the type of the messages state
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I help you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Support',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Icon name="send" size={24} color="#007aff" />
        </View>
      </Send>
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        placeholder="Type a message..."
        showUserAvatar={true}
        renderAvatarOnTop={true}
        renderSend={renderSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sendButton: {
    marginRight: 10,
    marginBottom: 5,
  },
});

export default ChatScreen;
