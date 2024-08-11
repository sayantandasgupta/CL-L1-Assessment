import React, { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

import theme from '@/theme/themeConfig';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<ConfigProvider theme={theme}>
    <Component {...pageProps} />
  </ConfigProvider>)
};

export default App;