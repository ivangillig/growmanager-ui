import React from 'react'
import { useState } from 'react'
import { Modal, Form, Input, Select, Upload, Button, Checkbox } from 'antd'
import { useTranslation } from 'next-i18next'
import { LuCloudUpload } from 'react-icons/lu'
import { PlusOutlined } from '@ant-design/icons'
import AddSeedBankModal from './AddSeedBankModal' // Importar el nuevo modal

const { Option } = Select

const AddSeedModal = ({ visible, onCancel, onAddSeed }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
  const [isSeedBankModalVisible, setSeedBankModalVisible] = useState(false)

  const handleOk = () => {
    form.validateFields().then((values) => {
      const formData = new FormData()
      formData.append('genetic', values.genetic)
      formData.append('seedBank', values.seedBank)
      formData.append('chemoType', values.chemoType)
      formData.append('dominance', values.dominance)
      formData.append('ratio', values.ratio)
      formData.append('cannabinoids', JSON.stringify(values.cannabinoids))
      if (fileList.length > 0) {
        formData.append('image', fileList[0].originFileObj)
      }
      onAddSeed(formData)
      form.resetFields()
      setFileList([])
    })
  }

  const handleUploadChange = ({ fileList }) => setFileList(fileList)

  return (
    <>
      <Modal
        open={visible}
        title={t('Add New Seed')}
        onCancel={onCancel}
        onOk={handleOk}
        okText={t('Add Strain')}
        cancelText={t('Cancel')}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="genetic"
            label={t('Genetic name')}
            rules={[{ required: true, message: t('Please input the genetic') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="seedBank"
            label={t('Seed Bank')}
            rules={[{ required: true, message: t('Please select the seed bank') }]}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Select style={{ flex: 1 }}>
                <Option value="Bank1">{t('Bank1')}</Option>
                <Option value="Bank2">{t('Bank2')}</Option>
              </Select>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setSeedBankModalVisible(true)}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="chemoType"
            label={t('Chemo Type')}
            rules={[
              { required: true, message: t('Please select the chemo type') },
            ]}
          >
            <Select>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dominance"
            label={t('Dominance')}
            rules={[{ required: true, message: t('Please input the dominance') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ratio"
            label={t('Ratio')}
            rules={[{ required: true, message: t('Please input the ratio') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cannabinoids"
            label={t('Cannabinoids')}
            rules={[
              {
                required: true,
                message: t('Please select at least one cannabinoid'),
              },
            ]}
          >
            <Checkbox.Group>
              <Checkbox value="THC">THC</Checkbox>
              <Checkbox value="CBD">CBD</Checkbox>
              <Checkbox value="CBG">CBG</Checkbox>
              <Checkbox value="CBN">CBN</Checkbox>
              <Checkbox value="CBC">CBC</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="image" label={t('Image')}>
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
            >
              <Button icon={<LuCloudUpload />}>{t('Upload')}</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <AddSeedBankModal
        visible={isSeedBankModalVisible}
        onCancel={() => setSeedBankModalVisible(false)}
      />
    </>
  )
}

export default AddSeedModal
