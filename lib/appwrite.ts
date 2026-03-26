import { Client } from 'react-native-appwrite';
import 'react-native-url-polyfill/auto';

const APPWRITE_ENDPOINT = 'https://fra.cloud.appwrite.io/v1';

declare global {
  var appwriteClient: Client | undefined;
}

export const client = new Client()
  .setProject('69c0430b0020c7b12d22')
  .setEndpoint(APPWRITE_ENDPOINT);

globalThis.appwriteClient = client;

export const pingAppwrite = async () => {
  const response = await fetch(`${APPWRITE_ENDPOINT}/health/version`, {
    headers: {
      'X-Appwrite-Project': '69c0430b0020c7b12d22',
    },
  });

  // Appwrite Cloud may respond 401 for some health routes without elevated auth.
  // If we can reach the endpoint at all, networking/config is usually fine.
  if (response.status === 401) {
    return;
  }

  if (!response.ok) {
    throw new Error(`Appwrite health check failed with status ${response.status}`);
  }
};
