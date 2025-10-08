// // import '@/styles/globals.css'
// // import type { AppProps } from 'next/app'

// // export default function App({ Component, pageProps }: AppProps) {
// //   return <Component {...pageProps} />
// // }



// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'
// import { ThemeProvider } from '@mui/material/styles'
// import { CssBaseline } from '@mui/material'
// import { Provider } from 'react-redux'
// import { store } from '../store'
// import { theme } from '../styles/theme'

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <Provider store={store}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Component {...pageProps} />
//       </ThemeProvider>
//     </Provider>
//   )
// }



import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store'; // ajustá la ruta si está en otra carpeta
import Layout from '../components/layout/Layout';
import '../styles/globals.css'; // si tenés estilos globales

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
