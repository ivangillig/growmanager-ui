import { Layout } from 'antd'
import Image from 'next/image'

const { Header } = Layout

export default function CustomHeader() {
  return (
    <Header
      style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}
    >
      <div className="logo">
        <Image
          src="/images/logo.png"
          alt="GrowManager Logo"
          width={32}
          height={32}
        />
        <span style={{ marginLeft: '12px', color: 'white' }}>GrowManager</span>
      </div>
    </Header>
  )
}
