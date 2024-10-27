import { ChakraProvider } from "@chakra-ui/react"
import { GoogleOAuthProvider } from '@react-oauth/google';
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    console.error('Google Client ID is not defined');
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
