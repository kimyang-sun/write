import React from 'react';
import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'styles/DefaultTheme';
import GlobalStyle from 'styles/GlobalStyle';
import wrapper from 'store/configureStore';
import 'react-app-polyfill/ie11';
import '../styles/my_custom.css';

// Types
type AppProps = {
  Component: React.ElementType;
};

// styled components
const Wrap = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  color: ${props => props.theme.color.black};

  @media (max-width: ${props => props.theme.mediaSize.xlarge}) {
    padding: 0 15px;
  }
`;

function App({ Component }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="마음을 적는 공간" />
        <title>&quot;쓰다&quot; - 마음을 적는 공간</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Wrap>
        <Component />
      </Wrap>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
