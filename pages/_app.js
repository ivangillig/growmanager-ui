import { Provider } from 'react-redux'
import { wrapper } from '../src/store'
import { App, ConfigProvider } from 'antd'
import { appWithTranslation } from 'next-i18next'
import 'antd/dist/reset.css'
import '../styles/index.less'
import '../lib/i18n'
import Notifications from '@/components/Common/Notifications'

async function getInitialProps({ Component, ctx }) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}

function MyApp({ Component, pageProps, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <ConfigProvider theme={{ hashed: false }}>
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
