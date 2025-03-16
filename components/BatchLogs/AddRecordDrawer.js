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
  InputNumber,
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
  const [eventType, setEventType] = useState(null)

  useEffect(() => {
    if (visible) {
      form.resetFields()
      setEventType(null)
      form.setFieldsValue({ eventDate: dayjs() })
    }
  }, [visible, form])

  const handleSave = (values) => {
    const formattedValues = {
      ...values,
      batchId,
      eventDate: dayjs(values.eventDate).format('YYYY-MM-DD HH:mm'),
    }
    dispatch(addBatchLog(formattedValues))
    onClose()
  }

  const handleEventTypeChange = (value) => {
    setEventType(value)
  }

  return (
    <Drawer
      title={t('Add Record to Batch')}
      width={450}
      onClose={onClose}
      open={visible}
      styles={{ body: { paddingBottom: 80 } }}
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
          <Col span={24}>
            <Form.Item
              name="eventDate"
              label={t('Event date')}
              rules={[
                {
                  required: true,
                  message: t('Please select the event date'),
                },
              ]}
            >
              <DatePicker
                showTime
                style={{ width: '100%' }}
                format={'DD-MM-YYYY HH:mm'}
                placeholder={t('Select date')}
                defaultValue={dayjs()}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="eventType"
              label={t('Event type')}
              rules={[
                {
                  required: true,
                  message: t('Please select the event type'),
                },
              ]}
            >
              <Select
                placeholder={t('Select event type')}
                onChange={handleEventTypeChange}
              >
                <Option value="Pesticides">{t('Pesticides/Fungicides')}</Option>
                <Option value="Defoliation">{t('Defoliation')}</Option>
                <Option value="Fertilization">{t('Fertilization')}</Option>
                <Option value="Incident">{t('Incident')}</Option>
                <Option value="Pruning">{t('Pruning')}</Option>
                <Option value="Data record">{t('Data record')}</Option>
                <Option value="Manual watering">{t('Manual watering')}</Option>
                <Option value="Training">{t('Training')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {eventType === 'pesticides' && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="pesticideType" label={t('Pesticide type')}>
                <Input placeholder={t('Pesticide type')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="pesticideDose" label={t('Pesticide dose')}>
                <InputNumber
                  addonAfter="ml"
                  placeholder={t('Pesticide dose')}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        {eventType === 'fertilization' && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="fertilizerType" label={t('Fertilizer type')}>
                <Input placeholder={t('Select a fertilizer type')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="fertilizerDose" label={t('Fertilizer dose')}>
                <Input
                  placeholder={t('Input fertilizer dose')}
                  addonAfter="ml"
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        {eventType === 'pruning' && (
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="pruningType" label={t('Pruning type')}>
                <Select placeholder={t('Select pruning type')}>
                  <Option value="topping">{t('Topping')}</Option>
                  <Option value="fimming">{t('Fimming')}</Option>
                  <Option value="lollipopping">{t('Lollipopping')}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}
        {eventType === 'dataRecord' && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="relativeHumidity" label={t('Relative humidity')}>
                <Input placeholder={t('Relative humidity')} addonAfter="%" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="soilHumidity" label={t('Soil humidity')}>
                <Input
                  placeholder={t('Input the soil humidity')}
                  addonAfter="%"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="plantHeight" label={t('Plant height')}>
                <Input
                  placeholder={t('Input the plant height')}
                  addonAfter="cm"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="temperature" label={t('Ambient temperature')}>
                <Input
                  placeholder={t('Input ambient temperature')}
                  addonAfter="°C"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="ph" label={t('PH')}>
                <Input placeholder={t('PH')} />
              </Form.Item>
            </Col>
          </Row>
        )}
        {eventType === 'manualWatering' && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="waterAmount" label={t('Water amount')}>
                <Input placeholder={t('Water amount')} addonAfter="ml" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="waterPh" label={t('Water PH')}>
                <Input placeholder={t('Water PH')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="waterTemperature" label={t('Water temperature')}>
                <Input placeholder={t('Water temperature')} addonAfter="°C" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="fertilized" valuePropName="checked">
                <Checkbox>{t('Fertilized?')}</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        )}
        {eventType === 'training' && (
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="trainingTechnique"
                label={t('Training technique')}
              >
                <Select placeholder={t('Select training technique')}>
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
