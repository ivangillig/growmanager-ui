import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Button, Input, Layout, Menu, List, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import {
  getProducts,
  addProduct,
} from '../../src/features/products/productActions'

const { Header, Content } = Layout

export default function ProductsPage() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.items)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const handleAddProduct = () => {
    dispatch(addProduct({ name: 'New Product' }))
  }

  const handleSearch = (value) => {}

  return (
    <Layout>
      <Header>
        <Menu mode="horizontal">
          <Menu.Item key="breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb>
          </Menu.Item>
          <Menu.Item key="add">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddProduct}
            >
              Agregar Cepa
            </Button>
          </Menu.Item>
          <Menu.Item key="search">
            <Input.Search
              placeholder="Buscar productos"
              onSearch={handleSearch}
            />
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={products}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.name}>{item.description}</Card>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  )
}
