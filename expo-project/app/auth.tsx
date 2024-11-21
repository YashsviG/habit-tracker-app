import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { saveUserToken } from "@/utils/storage";
import { useRouter } from "expo-router";

const AuthScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = async () => {
    if (username && password) {
      await saveUserToken("dummy-token");
      router.replace("/");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineLarge" style={styles.title}>
        Welcome Back
      </Text>
      <TextInput
        mode="outlined"
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { marginBottom: 20, textAlign: "center" },
  input: { marginBottom: 15 },
  button: { marginTop: 10 },
});

export default AuthScreen;
