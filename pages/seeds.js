import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Button, Input, List, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getSeeds, addSeed } from '../src/features/seed/seedActions'
import SeedCard from '../components/SeedCard'
import AddSeedModal from '../components/AddSeedModal'

export default function SeedsPage() {
  const dispatch = useDispatch()
  const seeds = useSelector((state) => state.seed.seeds || [])
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    dispatch(getSeeds())
  }, [dispatch])

  const handleAddSeed = (seedData) => {
    dispatch(addSeed(seedData))
      .then(() => {
        dispatch(getSeeds())
      })
    setIsModalVisible(false)
  }

  const handleSearch = (value) => {}

  return (
    <>
      <Row className="header" gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Seeds</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs={24} sm={12} className="actions">
          <Input.Search placeholder="Buscar cepas" onSearch={handleSearch} />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add Seed
          </Button>
        </Col>
      </Row>
      <Row className="list" gutter={[16, 16]}>
        <Col span={24}>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={seeds}
            renderItem={(seed) => (
              <List.Item>
                <SeedCard seed={seed} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <AddSeedModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onAddSeed={handleAddSeed}
      />
    </>
  )
}
