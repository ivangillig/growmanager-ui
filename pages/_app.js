import { Provider } from 'react-redux'
import { wrapper } from '../src/store'
import { ConfigProvider } from 'antd'
import MainLayout from './layout/MainLayout'
import 'antd/dist/reset.css'
import '../styles/index.less'

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

export default MyApp
