import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  DatePicker,
  Checkbox,
  Select,
} from 'antd'
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { addBatchLog } from '@/src/features/batch/batchActions'

const { Option } = Select

const AddRecordDrawer = ({ visible, onClose, batchId }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [showFertilizer, setShowFertilizer] = useState(false)
  const [showPesticides, setShowPesticides] = useState(false)
  const [showPruning, setShowPruning] = useState(false)
  const [showTraining, setShowTraining] = useState(false)

  useEffect(() => {
    if (visible) {
      form.resetFields()
      setShowFertilizer(false)
      setShowPesticides(false)
      setShowPruning(false)
      setShowTraining(false)
    }
  }, [visible, form])

  const handleSave = (values) => {
    const formattedValues = {
      ...values,
      batchId,
      interventionDate: dayjs(values.interventionDate).format('YYYY-MM-DD'),
    }
    console.log('Form values:', formattedValues)
    dispatch(addBatchLog(formattedValues))
    onClose()
  }

  const handleInterventionsChange = (checkedValues) => {
    setShowFertilizer(checkedValues.includes('fertilization'))
    setShowPesticides(checkedValues.includes('pesticides'))
    setShowPruning(checkedValues.includes('pruning'))
    setShowTraining(checkedValues.includes('training'))
  }

  return (
    <Drawer
      title={t('Add Record to Batch')}
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            {t('Cancel')}
          </Button>
          <Button onClick={() => form.submit()} type="primary">
            {t('Save')}
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form} onFinish={handleSave}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="interventionDate"
              label={t('Intervention Date')}
              rules={[
                {
                  required: true,
                  message: t('Please select the intervention date'),
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="plantHeight" label={t('Plant Height (cm)')}>
              <Input placeholder={t('Plant Height (cm)')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="relativeHumidity"
              label={t('Relative Humidity (%)')}
            >
              <Input placeholder={t('Relative Humidity (%)')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="soilHumidity" label={t('Soil Humidity (%)')}>
              <Input placeholder={t('Soil Humidity (%)')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="temperature" label={t('Ambient Temperature (°C)')}>
              <Input placeholder={t('Ambient Temperature (°C)')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ph" label={t('PH')}>
              <Input placeholder={t('PH')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="interventions" label={t('Interventions')}>
              <Checkbox.Group onChange={handleInterventionsChange}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="fertilization">
                      {t('Fertilization')}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="pesticides">
                      {t('Pesticides/Fungicides')}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="pruning">{t('Pruning')}</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="defoliation">{t('Defoliation')}</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="training">
                      {t('Training Techniques')}
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>
        {showFertilizer && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="fertilizerType" label={t('Fertilizer Type')}>
                <Input placeholder={t('Fertilizer Type')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fertilizerDose"
                label={t('Fertilizer Dose (ml)')}
              >
                <Input placeholder={t('Fertilizer Dose (ml)')} />
              </Form.Item>
            </Col>
          </Row>
        )}
        {showPesticides && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="pesticideType" label={t('Pesticide Type')}>
                <Input placeholder={t('Pesticide Type')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="pesticideDose" label={t('Pesticide Dose (ml)')}>
                <Input placeholder={t('Pesticide Dose (ml)')} />
              </Form.Item>
            </Col>
          </Row>
        )}
        {showPruning && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="pruningType" label={t('Pruning Type')}>
                <Select placeholder={t('Select Pruning Type')}>
                  <Option value="topping">{t('Topping')}</Option>
                  <Option value="fimming">{t('Fimming')}</Option>
                  <Option value="lollipopping">{t('Lollipopping')}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}
        {showTraining && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="trainingTechnique"
                label={t('Training Technique')}
              >
                <Select placeholder={t('Select Training Technique')}>
                  <Option value="lst">{t('LST')}</Option>
                  <Option value="hst">{t('HST')}</Option>
                  <Option value="scrog">{t('SCROG')}</Option>
                  <Option value="sog">{t('SOG')}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="observations"
              label={t('Observations')}
              rules={[{ max: 500, message: t('Maximum 500 characters') }]}
            >
              <Input.TextArea rows={4} placeholder={t('Observations')} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default AddRecordDrawer
