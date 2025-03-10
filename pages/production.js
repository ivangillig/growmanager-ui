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
} from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import {
  fetchBatches,
  addBatch,
  deleteBatch,
} from '../src/features/batch/batchActions'
import AddBatchModal from '../components/AddBatchModal'

export default function ProductionPage() {
  const dispatch = useDispatch()
  const batches = useSelector((state) => state.batch?.batches || [])
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    dispatch(fetchBatches())
  }, [dispatch])

  const handleAddBatch = (batchData) => {
    const formattedBatchData = {
      ...batchData,
      production_date: dayjs(batchData.production_date).format('YYYY-MM-DD'),
    }
    dispatch(addBatch(formattedBatchData))
    setIsModalVisible(false)
  }

  const handleDeleteBatch = (batchId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this batch?',
      onOk: () => {
        dispatch(deleteBatch(batchId)).then(() => {
          dispatch(fetchBatches())
        })
      },
    })
  }

  const handleEditBatch = (batchId) => {
    // Implement edit functionality here
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
            onClick={() => handleEditBatch(record.id)}
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
      <AddBatchModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onAddBatch={handleAddBatch}
      />
    </>
  )
}
