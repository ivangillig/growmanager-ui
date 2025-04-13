import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Button, Input, List, Row, Col, Empty } from 'antd'
import { MdLibraryAdd } from 'react-icons/md'
import { getSeeds, addSeed } from '../src/features/seed/seedActions'
import SeedCard from '../components/Seeds/SeedCard'
import AddSeedModal from '../components/Seeds/AddSeedModal'
import { useTranslation } from 'next-i18next'
import AppRoot from '../src/hoc/AppRoot'

function SeedsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const seeds = useSelector((state) => state.seed.seeds || [])
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    dispatch(getSeeds())
  }, [dispatch])

  const handleAddSeed = (seedData) => {
    dispatch(addSeed(seedData))
    setIsModalVisible(false)
  }

  const handleSearch = (value) => {}

  return (
    <AppRoot>
      <Row className="header" gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Breadcrumb>
            <Breadcrumb.Item>{t('Home')}</Breadcrumb.Item>
            <Breadcrumb.Item>{t('Seeds')}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs={24} sm={12} className="actions">
          <Input.Search
            placeholder={t('Search strains')}
            onSearch={handleSearch}
          />
          <Button
            type="primary"
            icon={<MdLibraryAdd />}
            onClick={() => setIsModalVisible(true)}
          >
            {t('Add Strain')}
          </Button>
        </Col>
      </Row>
      <Row className="list" gutter={[16, 16]}>
        <Col span={24}>
          <List
            grid
            dataSource={seeds}
            renderItem={(seed) => (
              <List.Item>
                <SeedCard seed={seed} />
              </List.Item>
            )}
            locale={{
              emptyText: <Empty description={t('No seeds found')} />,
            }}
          />
        </Col>
      </Row>
      <AddSeedModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onAddSeed={handleAddSeed}
      />
    </AppRoot>
  )
}

export default SeedsPage
