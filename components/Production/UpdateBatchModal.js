import { getSeeds } from '@/src/features/seed/seedActions'
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Switch,
  Tabs,
  Button,
  Row,
  Col,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import BasicSeedCard from '../Seeds/BasicSeedCard'

const { Option } = Select
const { TabPane } = Tabs

const UpdateBatchModal = ({ visible, onCancel, onUpdateBatch, batch }) => {
  const { t } = useTranslation()
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()
  const [form3] = Form.useForm()
  const [form4] = Form.useForm()
  const dispatch = useDispatch()
  const seeds = useSelector((state) => state.seed.seeds || [])
  const [selectedSeed, setSelectedSeed] = useState(null)

  useEffect(() => {
    if (seeds.length === 0) {
      dispatch(getSeeds())
    }
  }, [dispatch, seeds])

  useEffect(() => {
    if (batch) {
      const seed = seeds.find((seed) => seed._id === batch.seedId._id)
      setSelectedSeed(seed)
      const initialValues = {
        ...batch,
        germinationDate: batch.germinationDate
          ? dayjs(batch.germinationDate)
          : null,
        firstTransplateDate: batch.firstTransplateDate
          ? dayjs(batch.firstTransplateDate)
          : null,
        secondTransplateDate: batch.secondTransplateDate
          ? dayjs(batch.secondTransplateDate)
          : null,
        photoperiodChangeDate: batch.photoperiodChangeDate
          ? dayjs(batch.photoperiodChangeDate)
          : null,
        cuttingDate: batch.cuttingDate ? dayjs(batch.cuttingDate) : null,
        production_end_date: batch.production_end_date
          ? dayjs(batch.production_end_date)
          : null,
        seedId: seed ? seed._id : undefined,
      }
      form1.setFieldsValue(initialValues)
      form2.setFieldsValue(initialValues)
      form3.setFieldsValue(initialValues)
      form4.setFieldsValue(initialValues)
    } else {
      form1.resetFields()
      form2.resetFields()
      form3.resetFields()
      form4.resetFields()
      setSelectedSeed(null)
    }
  }, [batch, form1, form2, form3, form4, seeds])

  const handleForm1Submit = () => {
    form1.validateFields().then((values) => {
      onUpdateBatch({ ...values, id: batch._id })
      form1.resetFields()
    })
  }

  const handleForm2Submit = () => {
    form2.validateFields().then((values) => {
      onUpdateBatch({ ...values, id: batch._id })
      form2.resetFields()
    })
  }

  const handleForm3Submit = () => {
    form3.validateFields().then((values) => {
      onUpdateBatch({ ...values, id: batch._id })
      form3.resetFields()
    })
  }

  const handleForm4Submit = () => {
    form4.validateFields().then((values) => {
      onUpdateBatch({ ...values, id: batch._id })
      form4.resetFields()
    })
  }

  const handleSeedChange = (value) => {
    const seed = seeds.find((seed) => seed._id === value)
    setSelectedSeed(seed)
  }

  return (
    <Modal
      title={t('Update Batch')}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab={t('Batch Start')} key="1">
          <Form form={form1} layout="vertical" onFinish={handleForm1Submit}>
            <Form.Item
              name="seedId"
              label={t('Genetic')}
              rules={[{ required: true }]}
            >
              <Select onChange={handleSeedChange}>
                {seeds.map((seed) => (
                  <Option key={seed._id} value={seed._id}>
                    {`${seed.seedBank} - ${seed.genetic}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {selectedSeed && <BasicSeedCard seed={selectedSeed} />}
            <Form.Item
              name="germinationDate"
              label={t('Germination Date')}
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              layout="horizontal"
              name="isCutting"
              label={t('Is Cutting')}
              valuePropName="checked"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Switch />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                {t('Save changes')}
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab={t('In Process')} key="2">
          <Form form={form2} layout="vertical" onFinish={handleForm2Submit}>
            <Form.Item
              name="firstTransplateDate"
              label={t('First Transplant Date')}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="DD-MM-YYYY"
                placeholder={t('Select date')}
              />
            </Form.Item>
            <Form.Item
              name="secondTransplateDate"
              label={t('Second Transplant Date')}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="DD-MM-YYYY"
                placeholder={t('Select date')}
              />
            </Form.Item>
            <Form.Item
              name="photoperiodChangeDate"
              label={t('Photoperiod Change Date')}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="DD-MM-YYYY"
                placeholder={t('Select date')}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                {t('Save changes')}
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab={t('Harvest')} key="3">
          <Form form={form3} layout="vertical" onFinish={handleForm3Submit}>
            <Form.Item name="cuttingDate" label={t('Cutting Date')}>
              <DatePicker
                style={{ width: '100%' }}
                format="DD-MM-YYYY"
                placeholder={t('Select date')}
              />
            </Form.Item>
            <Form.Item name="drying_time" label={t('Drying Time (days)')}>
              <Input type="number" />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                {t('Save changes')}
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab={t('Post Production')} key="4">
          <Form.Item
            layout="vertical"
            name="production_end_date"
            label={t('Production End Date')}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="DD-MM-YYYY"
              placeholder={t('Select date')}
            />
          </Form.Item>
          <Form form={form4} layout="vertical" onFinish={handleForm4Submit}>
            <Form.Item name="curing_time" label={t('Curing Time (days)')}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="qtyProduction" label={t('Quantity Produced (g)')}>
              <Input type="number" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="thc" label={t('THC (%)')}>
                  <Input addonAfter="%" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="cbd" label={t('CBD (%)')}>
                  <Input addonAfter="%" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="rav" label={t('RAV')}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                {t('Save changes')}
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  )
}

export default UpdateBatchModal
