import type { AppProps } from 'next/app';
import { Provider } from 'src/machines/test.machine';
import '../../styles/globals.css';
 
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;