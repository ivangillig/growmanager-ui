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

const UpdateBatchModal = ({ visible, onCancel, onUpdateBatch, batch }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
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
        productionDate: batch.productionDate
          ? dayjs(batch.productionDate)
          : null,
        seedId: seed ? seed?._id : undefined,
      }
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
      setSelectedSeed(null)
    }
  }, [batch, form, seeds])

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onUpdateBatch({ ...values, id: batch._id })
    })
  }

  const handleSeedChange = (value) => {
    const seed = seeds.find((seed) => seed._id === value)
    setSelectedSeed(seed)
  }

  const tabItems = [
    {
      key: '1',
      label: t('Batch Start'),
      children: (
        <>
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
        </>
      ),
    },
    {
      key: '2',
      label: t('In Process'),
      children: (
        <>
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
        </>
      ),
    },
    {
      key: '3',
      label: t('Harvest'),
      children: (
        <>
          <Form.Item name="cuttingDate" label={t('Cutting Date')}>
            <DatePicker
              style={{ width: '100%' }}
              format="DD-MM-YYYY"
              placeholder={t('Select date')}
            />
          </Form.Item>
          <Form.Item name="dryingTime" label={t('Drying Time (days)')}>
            <Input type="number" />
          </Form.Item>
        </>
      ),
    },
    {
      key: '4',
      label: t('Post Production'),
      children: (
        <>
          <Form.Item
            layout="vertical"
            name="productionDate"
            label={t('Production End Date')}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="DD-MM-YYYY"
              placeholder={t('Select date')}
            />
          </Form.Item>
          <Form.Item name="curingTime" label={t('Curing Time (days)')}>
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
        </>
      ),
    },
  ]

  return (
    <Modal
      title={t('Update Batch')}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Tabs defaultActiveKey="1" items={tabItems} />
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            {t('Save changes')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateBatchModal
