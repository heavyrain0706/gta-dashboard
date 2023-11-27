import Layout from '@/components/layout/Layout'
import '@/styles/globals.scss'
import '@/styles/reset.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
