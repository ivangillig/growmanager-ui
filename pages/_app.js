import { Provider } from 'react-redux'
import { wrapper } from '../src/store'
import Notifications from '@/components/Common/toastMessages'
import { App, ConfigProvider } from 'antd'
import { appWithTranslation } from 'next-i18next'
import 'antd/dist/reset.css'
import '../src/styles/index.less'
import '../lib/i18n'
import { useState, useEffect } from 'react'

async function getInitialProps({ Component, ctx }) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}

function MyApp({ Component, pageProps, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Provider store={store}>
      <ConfigProvider theme={{ hashed: false }} store={store}>
        <App>
          <Component {...props.pageProps} />
          <Notifications />
        </App>
      </ConfigProvider>
    </Provider>
  )
}

MyApp.getInitialProps = getInitialProps

export default appWithTranslation(MyApp)
