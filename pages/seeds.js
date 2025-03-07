import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Button, Input, Layout, Menu, List } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getSeeds, addSeed } from '../src/features/seed/seedActions'
import SeedCard from '../components/SeedCard'

const { Header, Content } = Layout

export default function SeedsPage() {
  const dispatch = useDispatch()
  const seeds = useSelector((state) => state.seed.seeds || [])

  useEffect(() => {
    dispatch(getSeeds())
  }, [dispatch])

  const handleAddSeed = () => {
    dispatch(addSeed({ name: 'New Seed' }))
  }

  const handleSearch = (value) => {}

  return (
    <Layout>
      <Header>
        <Menu mode="horizontal">
          <Menu.Item key="breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Seeds</Breadcrumb.Item>
            </Breadcrumb>
          </Menu.Item>
          <Menu.Item key="add">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddSeed}
            >
              Agregar Cepa
            </Button>
          </Menu.Item>
          <Menu.Item key="search">
            <Input.Search placeholder="Buscar cepas" onSearch={handleSearch} />
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={seeds}
          renderItem={(seed) => (
            <List.Item>
              <SeedCard seed={seed} />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  )
}
