import '../globals.css';
import AppLayout from '../App';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  // Check if the page is an auth page (no sidebar)
  const isAuthPage = Component.isAuthPage || false;

  if (isAuthPage) {
    return (
      <>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <AppLayout>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
