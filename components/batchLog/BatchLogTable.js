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

const BatchLogTable = ({ batchLogs, batchId, isVisible, onClose }) => {
  const { t } = useTranslation()
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const dispatch = useDispatch()
  const addBatchSuccess = useSelector((state) => state.batch.addBatchSuccess)

  useEffect(() => {
    if (addBatchSuccess) {
      dispatch(fetchBatchLogs(batchId))
    }
  }, [addBatchSuccess, dispatch, batchId])

  const translateInterventions = (interventions) => {
    return interventions.map((intervention) => t(intervention)).join(', ')
  }

  const columns = [
    {
      title: t('Intervention Date'),
      dataIndex: 'interventionDate',
      key: 'interventionDate',
      render: (date) => dayjs.utc(date).format('DD-MM-YYYY'),
    },
    {
      title: t('Plant Height (cm)'),
      dataIndex: 'plantHeight',
      key: 'plantHeight',
      render: (value) => (value ? `${value} cm` : ''),
    },
    {
      title: t('Relative Humidity (%)'),
      dataIndex: 'relativeHumidity',
      key: 'relativeHumidity',
      render: (value) => (value ? `${value} %` : ''),
    },
    {
      title: t('Soil Humidity (%)'),
      dataIndex: 'soilHumidity',
      key: 'soilHumidity',
      render: (value) => (value ? `${value} %` : ''),
    },
    {
      title: t('Ambient Temperature (°C)'),
      dataIndex: 'temperature',
      key: 'temperature',
      render: (value) => (value ? `${value} °C` : ''),
    },
    {
      title: t('PH'),
      dataIndex: 'ph',
      key: 'ph',
    },
    {
      title: t('Interventions'),
      dataIndex: 'interventions',
      key: 'interventions',
      render: (interventions) => translateInterventions(interventions),
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
        visible={isVisible}
        onCancel={onClose}
        footer={null}
        width={'90vw'}
      >
        <Table
          columns={columns}
          dataSource={batchLogs}
          rowKey="id"
          scroll={{ x: 800 }}
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
