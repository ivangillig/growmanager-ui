import { Layout } from 'antd'

const { Content } = Layout

export default function CustomContent({ children }) {
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        background: '#fff',
        borderRadius: '4px',
      }}
    >
      {children}
    </Content>
  )
}
