// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from './../api/store';
import { Toaster } from 'react-hot-toast';
import Layout from '../component/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </Provider>
  )
}
