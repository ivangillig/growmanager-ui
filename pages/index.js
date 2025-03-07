import MainLayout from './layout/MainLayout'
import { Typography } from 'antd'

const { Title } = Typography

export default function Home() {
  return (
    <MainLayout>
      <Title level={2}>Home</Title>
      <p>Welcome to the GreenTrack application!</p>
    </MainLayout>
  )
}
