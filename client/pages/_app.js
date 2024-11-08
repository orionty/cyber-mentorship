import { ChakraProvider } from "@chakra-ui/react"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConfettiProvider } from '@/components/providers/confetti-provider'
import { ToasterProvider } from '@/components/providers/toaster-provider'
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    console.error('Google Client ID is not defined');
    return null;
  }

  return (
    <>
      <ToasterProvider />
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <ChakraProvider>
          <ConfettiProvider>
            <Component {...pageProps} />
          </ConfettiProvider>
        </ChakraProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default MyApp;