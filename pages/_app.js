import { Provider } from 'react-redux'
import { wrapper } from '../src/store'
import { ConfigProvider } from 'antd'
import { appWithTranslation } from 'next-i18next'
import MainLayout from './layout/MainLayout'
import 'antd/dist/reset.css'
import '../styles/index.less'
import '../lib/i18n'
import { useRouter } from 'next/router'

async function getInitialProps({ Component, ctx }) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}

function MyApp({ Component, pageProps, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const router = useRouter()

  const isLoginPage = router.pathname === '/login'

  return (
    <Provider store={store}>
      <ConfigProvider theme={{ hashed: false }}>
        {isLoginPage ? (
          <Component {...props.pageProps} />
        ) : (
          <MainLayout>
            <Component {...props.pageProps} />
          </MainLayout>
        )}
      </ConfigProvider>
    </Provider>
  )
}

MyApp.getInitialProps = getInitialProps

export default appWithTranslation(MyApp)
