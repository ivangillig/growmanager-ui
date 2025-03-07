import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Button, Input, List } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getSeeds, addSeed } from '../src/features/seed/seedActions'
import SeedCard from '../components/SeedCard'

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
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Seeds</Breadcrumb.Item>
      </Breadcrumb>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSeed}>
        Add Seed
      </Button>
      <Input.Search placeholder="Buscar cepas" onSearch={handleSearch} />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={seeds}
        renderItem={(seed) => (
          <List.Item>
            <SeedCard seed={seed} />
          </List.Item>
        )}
      />
    </>
  )
}
