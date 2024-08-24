import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Keyboard } from 'react-native';
import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Feather, FontAwesome } from "@expo/vector-icons";
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat';

const ChatScreen: React.FC = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [inputMessages, setInputMessages] = useState<string>("");
  const inputRef = useRef<TextInput | null>(null);

  const handleInputText = (text: string) => {
    setInputMessages(text);
  };

  const handleEmojiSelect = (emoji: string) => {
    setInputMessages((prev) => prev + emoji);
    setShowPicker(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleShowPicker = () => {
    Keyboard.dismiss();
    setShowPicker((prev) => !prev);
  };

  const renderMessage = (props: any) => {
    const { currentMessage } = props;
    if (currentMessage.user._id === 1) {
      return (
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: "#0f0",
                marginVertical: 12,
                marginRight: 12,
              },
            }}
            textStyle={{
              right: {
                color: "#000",
              },
            }}
          />
        </View>
      );
    }
    return <Bubble {...props} />;
  };

  const submitHandler = () => {
    if (inputMessages.trim()) {
      const message: IMessage = {
        _id: Math.random().toString(36).substr(2, 7),
        text: inputMessages,
        createdAt: new Date().getTime(),
        user: { _id: 1 },
      };
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [message]));
      setInputMessages("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require("../assets/back.png")} resizeMode="contain" style={styles.backImage} />
          </TouchableOpacity>
          <View>
            <View style={styles.onlineDot} />
            <Image source={require("../assets/profile.png")} resizeMode="contain" style={styles.profileImage} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Julia</Text>
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Feather name="video" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Feather name="phone" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        renderInputToolbar={() => null}
        user={{ _id: 1 }}
        minInputToolbarHeight={0}
        renderMessage={renderMessage}
      />
      <View style={styles.inputContainer}>
        <View style={styles.inputMessageContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Type here..."
            placeholderTextColor={"#000"}
            value={inputMessages}
            onChangeText={handleInputText}
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.inputIcon}>
              <Image source={require("../assets/camera.png")} resizeMode="contain" style={styles.inputIconImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputIcon} onPress={handleShowPicker}>
              <Image source={require("../assets/smile.png")} resizeMode="contain" style={styles.inputIconImage} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={submitHandler}>
            <FontAwesome name="send" size={22} color="#850" />
          </TouchableOpacity>
        </View>
      </View>
      {showPicker && (
        <EmojiSelector
          key="emoji-picker"
          onEmojiSelected={handleEmojiSelect}
          category={Categories.all}
          showTabs={true}
          showSearchBar={true}
          showHistory={true}
          columns={10}
          placeholder="Search emoji..."
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomColor: "#f7f7f7",
    borderBottomWidth: 0.2,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginHorizontal: 12,
  },
  backImage: {
    height: 24,
    width: 24,
    tintColor: "#000",
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0f0",
    zIndex: 999,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 999,
  },
  headerTextContainer: {
    marginLeft: 16,
  },
  headerText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 12,
    color: "#0f0",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginHorizontal: 8,
  },
  inputContainer: {
    backgroundColor: "#fff",
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  inputMessageContainer: {
    height: 54,
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    alignItems: "center",
    borderColor: "rgba(128,128,128,.4)",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  input: {
    color: "#000",
    flex: 1,
    paddingHorizontal: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    marginHorizontal: 8,
  },
  inputIconImage: {
    width: 20,
    height: 20,
    tintColor: "#f00",
  },
  sendButton: {
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 999,
    marginHorizontal: 6,
  },
});

export default ChatScreen;
