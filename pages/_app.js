import { Provider } from 'react-redux'
import { wrapper } from '../src/store'
import { ConfigProvider } from 'antd'
import { appWithTranslation } from 'next-i18next'
import MainLayout from './layout/MainLayout'
import 'antd/dist/reset.css'
import '../styles/index.less'
import { i18n } from '../src/i18n'
import '../src/i18n'

function MyApp({ Component, pageProps, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <ConfigProvider>
        <MainLayout>
          <Component {...props.pageProps} />
        </MainLayout>
      </ConfigProvider>
    </Provider>
  )
}

export default appWithTranslation(MyApp, i18n)
