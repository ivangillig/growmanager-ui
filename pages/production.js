import { useEffect, useState } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
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
import {
  fetchBatches,
  addBatch,
  deleteBatch,
  updateBatch,
} from '../src/features/batch/batchActions'
import BatchModal from '../components/BatchModal'

export default function ProductionPage() {
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
      notification.success({ message: 'Batch added successfully' })
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
      title: 'Are you sure you want to delete this batch?',
      onOk: () => {
        dispatch(deleteBatch(batchId)).then(() => {
          dispatch(fetchBatches())
          notification.success({ message: 'Batch deleted successfully' })
        })
      },
    })
  }

  const handleEditButtonClick = (batch) => {
    setEditingBatch(batch)
    setIsModalVisible(true)
  }

  const buildColumns = () => [
    { title: 'BatchCode', dataIndex: 'batchCode', key: 'batchCode' },
    {
      title: 'Production Date',
      dataIndex: 'production_date',
      key: 'production_date',
      render: (date) => dayjs(date).format('DD-MM-YYYY'),
    },
    { title: 'Genetic', dataIndex: ['seedId', 'genetic'], key: 'genetic' },
    { title: 'THC (%)', dataIndex: 'thc', key: 'thc' },
    { title: 'CBD (%)', dataIndex: 'cbd', key: 'cbd' },
    { title: 'Drying Time', dataIndex: 'drying_time', key: 'drying_time' },
    {
      title: 'Quantity Produced (g)',
      dataIndex: 'quantity_produced',
      key: 'quantity_produced',
    },
    { title: 'RAV', dataIndex: 'rav', key: 'rav' },
    {
      title: 'Action',
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
          <Breadcrumb items={[{ title: 'Home' }, { title: 'Production' }]} />
        </Col>
        <Col xs={24} sm={12} className="actions">
          <Input.Search placeholder="Search batches" />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add Batch
          </Button>
        </Col>
      </Row>
      <Row className="list" gutter={[16, 16]}>
        <Col span={24}>
          <Table
            columns={buildColumns()}
            dataSource={batches}
            rowKey="id"
            locale={{ emptyText: <Empty description="No batches found" /> }}
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
