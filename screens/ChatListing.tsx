import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { users } from '../data'; 

type RootStackParamList = {
  Chat: { userName: string }; 
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

const ChatListing: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const navigation = useNavigation<NavigationProp>();

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: typeof users[0] }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Chat", { userName: item.username })}
      style={[
        styles.userImageContainer,
        filteredUsers.indexOf(item) % 2 !== 0 ? styles.oddBackground : null,
      ]}
    >
      <View style={styles.userImageContainer}>
        {item.isOnline && (
          <View style={styles.onlineIndicator} />
        )}
        <Image source={require("../assets/profile.png")} resizeMode="contain" style={styles.userImage} />
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{item.username}</Text>
        <Text style={styles.lastSeen}>{item.message || 'No recent message'}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    return (
      <View>
        <View style={styles.searchBar}>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color={"#666"} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={search}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
          />
          <TouchableOpacity>
            <Image
              source={require("../assets/edit.png")}
              resizeMode="contain"
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>{renderContent()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingLeft: 10,
    color: "#333",
  },
  editIcon: {
    width: 24,
    height: 24,
    tintColor: "#f00",
  },
  userImageContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    marginRight: 22,
  },
  onlineIndicator: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "#4caf50",
    position: "absolute",
    top: 14,
    right: 2,
    zIndex: 999,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  userInfoContainer: {
    flexDirection: "column",
    marginVertical: 12
  },
  userName: {
    fontSize: 14,
    color: "#000",
    fontWeight: '500'
  },
  lastSeen: {
    fontSize: 14,
    color: "#666",
  },
  oddBackground: {
    backgroundColor: "#f0f0f0",
  },
});

export default ChatListing;
