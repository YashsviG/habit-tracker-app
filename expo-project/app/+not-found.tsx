import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";
import React from "react";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>Page Not Found</Text>
        <Link href="./index">Go Back to Home Page</Link>
      </View>
    </>
  );
}
