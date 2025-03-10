import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Breadcrumb,
  Button,
  Input,
  Table,
  Row,
  Col,
  Modal,
  Empty,
  Space,
  notification,
} from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import {
  fetchBatches,
  addBatch,
  deleteBatch,
  updateBatch,
} from '../src/features/batch/batchActions'
import BatchModal from '../components/BatchModal'

export default function ProductionPage() {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const batches = useSelector((state) => state.batch?.batches || [])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingBatch, setEditingBatch] = useState(null)

  useEffect(() => {
    dispatch(fetchBatches())
  }, [dispatch])

  const handleAddBatch = (batchData) => {
    const formattedBatchData = {
      ...batchData,
      production_date: dayjs(batchData.production_date).format('YYYY-MM-DD'),
    }
    dispatch(addBatch(formattedBatchData)).then(() => {
      notification.success({ message: t('batchAdded') })
    })
    setIsModalVisible(false)
  }

  const handleEditBatch = (batchData) => {
    const formattedBatchData = {
      ...batchData,
      production_date: dayjs(batchData.production_date).format('YYYY-MM-DD'),
    }
    dispatch(updateBatch(formattedBatchData))
    setIsModalVisible(false)
    setEditingBatch(null)
  }

  const handleDeleteBatch = (batchId) => {
    Modal.confirm({
      title: t('confirmDelete'),
      onOk: () => {
        dispatch(deleteBatch(batchId)).then(() => {
          dispatch(fetchBatches())
          notification.success({ message: t('batchDeleted') })
        })
      },
    })
  }

  const handleEditButtonClick = (batch) => {
    setEditingBatch(batch)
    setIsModalVisible(true)
  }

  const buildColumns = () => [
    { title: t('BatchCode'), dataIndex: 'batchCode', key: 'batchCode' },
    {
      title: t('Production Date'),
      dataIndex: 'production_date',
      key: 'production_date',
      render: (date) => dayjs(date).format('DD-MM-YYYY'),
    },
    { title: t('Genetic'), dataIndex: ['seedId', 'genetic'], key: 'genetic' },
    { title: t('THC (%)'), dataIndex: 'thc', key: 'thc' },
    { title: t('CBD (%)'), dataIndex: 'cbd', key: 'cbd' },
    { title: t('Drying Time'), dataIndex: 'drying_time', key: 'drying_time' },
    {
      title: t('Quantity Produced (g)'),
      dataIndex: 'quantity_produced',
      key: 'quantity_produced',
    },
    { title: t('RAV'), dataIndex: 'rav', key: 'rav' },
    {
      title: t('action'),
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditButtonClick(record)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteBatch(record.id)}
          />
        </Space>
      ),
    },
  ]

  return (
    <>
      <Row className="header" gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Breadcrumb
            items={[{ title: t('home') }, { title: t('production') }]}
          />
        </Col>
        <Col xs={24} sm={12} className="actions">
          <Input.Search placeholder={t('searchBatches')} />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            {t('addBatch')}
          </Button>
        </Col>
      </Row>
      <Row className="list" gutter={[16, 16]}>
        <Col span={24}>
          <Table
            columns={buildColumns()}
            dataSource={batches}
            rowKey="id"
            locale={{
              emptyText: <Empty description={t('No batches found')} />,
            }}
          />
        </Col>
      </Row>
      <BatchModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          setEditingBatch(null)
        }}
        onAddBatch={handleAddBatch}
        onEditBatch={handleEditBatch}
        batch={editingBatch}
      />
    </>
  )
}
