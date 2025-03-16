import { Table, Modal, Button, Space, Tooltip, Row, Col } from 'antd'
import { useTranslation } from 'next-i18next'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddRecordDrawer from './AddRecordDrawer'
import { MdAdd } from 'react-icons/md'
import { fetchBatchLogs } from '@/src/features/batch/batchActions'

const BatchLogTable = ({ batchId, isVisible, onClose }) => {
  const { t } = useTranslation()
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const dispatch = useDispatch()
  const addBatchSuccess = useSelector((state) => state.batch.addBatchSuccess)
  const { batchLogs, pagination } = useSelector((state) => state.batch)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    if (addBatchSuccess && batchId) {
      dispatch(fetchBatchLogs(batchId, limit, page))
    }
  }, [addBatchSuccess, dispatch, batchId, limit, page])

  useEffect(() => {
    if (batchId) {
      dispatch(fetchBatchLogs({ batchId, limit, page }))
    }
  }, [batchId, limit, page, dispatch])

  const handleTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current)
    setLimit(pagination.pageSize)
    const sortField = sorter.field
    const sortOrder = sorter.order === 'ascend' ? 'asc' : 'desc'
    dispatch(
      fetchBatchLogs({
        batchId,
        limit: pagination.pageSize,
        page: pagination.current,
        filter: filters,
        sort: { field: sortField, order: sortOrder },
      })
    )
  }

  const columns = [
    {
      title: t('Intervention Date'),
      dataIndex: 'interventionDate',
      key: 'interventionDate',
      render: (date) => dayjs.utc(date).format('DD-MM-YYYY'),
      sorter: true,
    },
    {
      title: t('Event type'),
      dataIndex: 'eventType',
      key: 'eventType',
      render: (value) => t(value),
      filters: [
        { text: t('Pesticides/Fungicides'), value: 'Pesticides' },
        { text: t('Defoliation'), value: 'Defoliation' },
        { text: t('Fertilization'), value: 'Fertilization' },
        { text: t('Incident'), value: 'Incident' },
        { text: t('Pruning'), value: 'Pruning' },
        { text: t('Data record'), value: 'Data record' },
        { text: t('Manual watering'), value: 'Manual watering' },
        { text: t('Training'), value: 'Training' },
      ],
      onFilter: (value, record) => record.eventType.includes(value),
    },
    {
      title: t('Plant Height (cm)'),
      dataIndex: 'plantHeight',
      key: 'plantHeight',
      render: (value) => (value ? `${value} cm` : ''),
      sorter: true,
    },
    {
      title: t('Relative Humidity (%)'),
      dataIndex: 'relativeHumidity',
      key: 'relativeHumidity',
      render: (value) => (value ? `${value} %` : ''),
      sorter: true,
    },
    {
      title: t('Soil Humidity (%)'),
      dataIndex: 'soilHumidity',
      key: 'soilHumidity',
      render: (value) => (value ? `${value} %` : ''),
      sorter: true,
    },
    {
      title: t('Ambient Temperature (°C)'),
      dataIndex: 'temperature',
      key: 'temperature',
      render: (value) => (value ? `${value} °C` : ''),
      sorter: true,
    },
    {
      title: t('PH'),
      dataIndex: 'ph',
      key: 'ph',
      sorter: true,
    },
    {
      title: t('Fertilizer Type'),
      dataIndex: 'fertilizerType',
      key: 'fertilizerType',
    },
    {
      title: t('Fertilizer Dose (ml)'),
      dataIndex: 'fertilizerDose',
      key: 'fertilizerDose',
      render: (value) => (value ? `${value} ml` : ''),
      sorter: true,
    },
    {
      title: t('Pesticide Type'),
      dataIndex: 'pesticideType',
      key: 'pesticideType',
    },
    {
      title: t('Pesticide Dose (ml)'),
      dataIndex: 'pesticideDose',
      key: 'pesticideDose',
      render: (value) => (value ? `${value} ml` : ''),
      sorter: true,
    },
    {
      title: t('Pruning Type'),
      dataIndex: 'pruningType',
      key: 'pruningType',
    },
    {
      title: t('Training Technique'),
      dataIndex: 'trainingTechnique',
      key: 'trainingTechnique',
    },
    {
      title: t('Observations'),
      dataIndex: 'observations',
      key: 'observations',
    },
  ]

  return (
    <>
      <Modal
        title={
          <Row justify="space-between" align="middle">
            <Col>{t('Batch Log History')}</Col>
            <Col>
              <Tooltip title={t('Add Record')}>
                <Button
                  type="primary"
                  icon={<MdAdd />}
                  onClick={() => setIsDrawerVisible(true)}
                  style={{ marginRight: 30 }}
                >
                  {t('Add Record')}
                </Button>
              </Tooltip>
            </Col>
          </Row>
        }
        open={isVisible}
        onCancel={onClose}
        footer={null}
        width={'90vw'}
      >
        <Table
          columns={columns}
          dataSource={batchLogs}
          rowKey="_id"
          scroll={{ x: 800 }}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
          }}
          onChange={handleTableChange}
        />
      </Modal>
      <AddRecordDrawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        batchId={batchId}
      />
    </>
  )
}

export default BatchLogTable
