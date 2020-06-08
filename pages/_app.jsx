import App from 'next/app';
import 'react-image-gallery/styles/css/image-gallery.css';
import { ThemeProvider } from 'styled-components';
import theme from '../themes/default.theme';
import GlobalStyles from '../assets/style/Global.style';
import Layout from '../container/Layout/Layout';

import { SearchProvider } from 'context/SearchProvider';
// import { withData } from 'library/helpers/restriction';

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    const { query, pathname } = ctx;
    // const { user } = withData(ctx);

    return {
      pageProps, query, pathname,
    };
  } // getInitialProps deprecrated

  render() {
    const { Component, pageProps, query } = this.props;
    return (
      <SearchProvider query={query}>
        {/* // Render cứng header và footer - */}
        <Layout>
          {/* Các đoạn code ở dưới là children bao gồm cả các pages default index.js */}
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyles />
              {/* Các pages - data */}
              <Component {...pageProps} />
            </>
          </ThemeProvider>
        </Layout>
      </SearchProvider>
    );
  }
}
