import { Provider } from "react-redux";
import { wrapper } from "../store";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import "../styles/globals.css";

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ConfigProvider>
        <Component {...props.pageProps} />
      </ConfigProvider>
    </Provider>
  );
}

export default MyApp;
