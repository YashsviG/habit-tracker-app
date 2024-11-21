import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { getUserToken } from "@/utils/storage";
import { ActivityIndicator, MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import React from "react";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getUserToken();
      setIsAuthenticated(!!token); // Set true if token exists
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <PaperProvider theme={MD3LightTheme}>
        <ActivityIndicator style={{ flex: 1 }} size="large" />
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={MD3LightTheme}>
      <Stack>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="index" options={{ headerShown: false}} />
            <Stack.Screen name="stats" options={{ headerShown: false }} />
          </>
        ) : (
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
