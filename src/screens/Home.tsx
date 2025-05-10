import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useAuth} from '../context/AuthContext';

export default function Home() {
  const {logout, userId} = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Page!</Text>
      <Text>Your User ID: {userId}</Text>
      <Pressable style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
