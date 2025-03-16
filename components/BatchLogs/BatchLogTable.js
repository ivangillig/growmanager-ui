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
    ...(batchLogs.some((log) => log.eventType === 'Fertilization')
      ? [
          {
            title: t('Fertilizer type'),
            dataIndex: 'fertilizerType',
            key: 'fertilizerType',
          },
          {
            title: t('Fertilizer dose'),
            dataIndex: 'fertilizerDose',
            key: 'fertilizerDose',
            render: (value) => (value ? `${value} ml` : ''),
            sorter: true,
          },
        ]
      : []),
    ...(batchLogs.some((log) => log.eventType === 'Pesticides')
      ? [
          {
            title: t('Pesticide type'),
            dataIndex: 'pesticideType',
            key: 'pesticideType',
          },
          {
            title: t('Pesticide dose'),
            dataIndex: 'pesticideDose',
            key: 'pesticideDose',
            render: (value) => (value ? `${value} ml` : ''),
            sorter: true,
          },
        ]
      : []),
    ...(batchLogs.some((log) => log.eventType === 'Pruning')
      ? [
          {
            title: t('Pruning type'),
            dataIndex: 'pruningType',
            key: 'pruningType',
          },
        ]
      : []),
    ...(batchLogs.some((log) => log.eventType === 'Training')
      ? [
          {
            title: t('Training technique'),
            dataIndex: 'trainingTechnique',
            key: 'trainingTechnique',
          },
        ]
      : []),
    ...(batchLogs.some((log) => log.eventType === 'Data record')
      ? [
          {
            title: t('Plant height'),
            dataIndex: 'plantHeight',
            key: 'plantHeight',
            render: (value) => (value ? `${value} cm` : ''),
            sorter: true,
          },
          {
            title: t('Relative humidity'),
            dataIndex: 'relativeHumidity',
            key: 'relativeHumidity',
            render: (value) => (value ? `${value} %` : ''),
            sorter: true,
          },
          {
            title: t('Soil humidity'),
            dataIndex: 'soilHumidity',
            key: 'soilHumidity',
            render: (value) => (value ? `${value} %` : ''),
            sorter: true,
          },
          {
            title: t('Ambient temperature'),
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
        ]
      : []),
    ...(batchLogs.some((log) => log.eventType === 'Manual watering')
      ? [
          {
            title: t('Water amount'),
            dataIndex: 'waterAmount',
            key: 'waterAmount',
            render: (value) => (value ? `${value} ml` : ''),
            sorter: true,
          },
          {
            title: t('Water PH'),
            dataIndex: 'waterPh',
            key: 'waterPh',
          },
          {
            title: t('Water temperature'),
            dataIndex: 'waterTemperature',
            key: 'waterTemperature',
            render: (value) => (value ? `${value} °C` : ''),
            sorter: true,
          },
          {
            title: t('Fertilized?'),
            dataIndex: 'fertilized',
            key: 'fertilized',
            render: (value) => (value ? t('Yes') : t('No')),
          },
        ]
      : []),
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
