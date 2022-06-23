import type { AppProps } from 'next/app';
import Layout from '../components/Containers/layout';
import PageContainer from '../components/Containers/PageContainer';
import '../styles/global.scss';

// Wrapper around each page to handle global styles and general layout.
// The page container is used to wrap the content of the page.
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
    </Layout>
  );
}

export default MyApp;
