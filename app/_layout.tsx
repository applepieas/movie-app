import { pingAppwrite } from "@/lib/appwrite";
import { Stack } from "expo-router";
import { useEffect } from "react";
import './globals.css';

export default function RootLayout() {
  useEffect(() => {
    pingAppwrite().catch((error) => {
      console.warn('Appwrite ping failed:', error);
    });
  }, []);

  return <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="movies/[id]"
      options={{ headerShown: false }}
    />

  </Stack>;
}
