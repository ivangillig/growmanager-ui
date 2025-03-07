import { Layout } from 'antd'
import { useRouter } from 'next/router'
import CustomHeader from './Header'
import CustomSider from './Sider'
import CustomContent from './Content'

const { Footer } = Layout

export default function MainLayout({ children }) {
  const router = useRouter()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CustomHeader />
      <Layout>
        <CustomSider />
        <Layout style={{ padding: '24px' }}>
          <CustomContent>{children}</CustomContent>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>GrowManager ©2023</Footer>
    </Layout>
  )
}
