import type { AppProps } from 'next/app';
import Layout from '../components/Containers/layout';
import '../styles/global.scss';

// Wrapper around each page to handle global styles and general layout.
// The page container is used to wrap the content of the page.
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
