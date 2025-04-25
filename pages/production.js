import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Breadcrumb,
  Button,
  Input,
  Table,
  Row,
  Col,
  Empty,
  Space,
  Tooltip,
  Modal,
} from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import {
  fetchBatches,
  addBatch,
  deleteBatch,
  updateBatch,
} from '../src/features/batch/batchActions'
import BatchModal from '../components/Production/CreateBatchModal'
import UpdateBatchModal from '../components/Production/UpdateBatchModal'
import BatchLogTable from '../components/BatchLogs/BatchLogTable'
import { MdDelete, MdEdit, MdLibraryAdd, MdHistory } from 'react-icons/md'
import AppRoot from '../src/hoc/AppRoot'

function ProductionPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const batches = useSelector((state) => state.batch?.batches || [])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLogModalVisible, setIsLogModalVisible] = useState(false)
  const [editingBatch, setEditingBatch] = useState(null)
  const [selectedBatchId, setSelectedBatchId] = useState(null)

  useEffect(() => {
    dispatch(fetchBatches())
  }, [dispatch])

  const handleAddBatch = (batchData) => {
    const formattedBatchData = {
      ...batchData,
      productionDate: dayjs(batchData.productionDate).format('YYYY-MM-DD'),
    }
    dispatch(addBatch(formattedBatchData))
    setIsModalVisible(false)
  }

  const handleEditBatch = (batchData) => {
    const formattedBatchData = {
      ...batchData,
      productionDate: dayjs(batchData.productionDate).format('YYYY-MM-DD'),
    }
    dispatch(updateBatch(formattedBatchData))
    setIsModalVisible(false)
    setEditingBatch(null)
  }

  const handleDeleteBatch = (batchId) => {
    Modal.confirm({
      title: t('confirmDelete'),
      onOk: () => {
        dispatch(deleteBatch(batchId))
      },
    })
  }

  const handleEditButtonClick = (batch) => {
    setEditingBatch(batch)
    setIsModalVisible(true)
  }

  const handleViewHistoryClick = (batchId) => {
    if (batchId) {
      setSelectedBatchId(batchId)
      setIsLogModalVisible(true)
    }
  }

  const buildColumns = () => [
    { title: t('BatchCode'), dataIndex: 'batchCode', key: 'batchCode' },
    {
      title: t('Germination Date'),
      dataIndex: 'germinationDate',
      key: 'germinationDate',
      render: (date) => dayjs(date).format('DD-MM-YYYY'),
    },
    { title: t('Genetic'), dataIndex: ['seedId', 'genetic'], key: 'genetic' },
    { title: t('THC (%)'), dataIndex: 'thc', key: 'thc' },
    { title: t('CBD (%)'), dataIndex: 'cbd', key: 'cbd' },
    { title: t('Drying Time'), dataIndex: 'dryingTime', key: 'dryingTime' },
    {
      title: t('Quantity Produced (g)'),
      dataIndex: 'qtyProduced',
      key: 'qtyProduced',
    },
    { title: t('RAV'), dataIndex: 'rav', key: 'rav' },
    {
      title: t('Actions'),
      key: 'action',
      render: (_, record) => (
        <Space>
          <Tooltip title={t('Edit batch')}>
            <Button
              type="primary"
              icon={<MdEdit />}
              onClick={() => handleEditButtonClick(record)}
            />
          </Tooltip>
          <Tooltip title={t('Delete')}>
            <Button
              type="primary"
              danger
              icon={<MdDelete />}
              onClick={() => handleDeleteBatch(record._id)}
            />
          </Tooltip>
          <Tooltip title={t('View history')}>
            <Button
              type="primary"
              icon={<MdHistory />}
              onClick={() => handleViewHistoryClick(record._id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <AppRoot>
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
            icon={<MdLibraryAdd />}
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
            rowKey="_id"
            locale={{
              emptyText: <Empty description={t('No batches found')} />,
            }}
          />
        </Col>
      </Row>
      {editingBatch ? (
        <UpdateBatchModal
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false)
            setEditingBatch(null)
          }}
          onUpdateBatch={handleEditBatch}
          batch={editingBatch}
        />
      ) : (
        <BatchModal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onAddBatch={handleAddBatch}
        />
      )}
      <BatchLogTable
        batchId={selectedBatchId}
        isVisible={isLogModalVisible}
        onClose={() => setIsLogModalVisible(false)}
      />
    </AppRoot>
  )
}

export default ProductionPage
