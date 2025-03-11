import { useState } from 'react'
import { Modal, Form, Input, Select, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useTranslation } from 'next-i18next'

const { Option } = Select

export default function AddSeedModal({ visible, onCancel, onAddSeed }) {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])

  const handleOk = () => {
    form.validateFields().then((values) => {
      const formData = new FormData()
      formData.append('genetic', values.genetic)
      formData.append('seedBank', values.seedBank)
      formData.append('chemoType', values.chemoType)
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
    <Modal
      open={visible}
      title={t('Add New Seed')}
      onCancel={onCancel}
      onOk={handleOk}
      okText={t('Add Strain')}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="genetic"
          label={t('Genetic name')}
          rules={[{ required: true, message: t('Please input the genetic!') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="seedBank"
          label={t('Seed Bank')}
          rules={[
            { required: true, message: t('Please input the seed bank!') },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="chemoType"
          label={t('Chemo Type')}
          rules={[
            { required: true, message: t('Please select the chemo type!') },
          ]}
        >
          <Select>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        </Form.Item>
        <Form.Item name="image" label={t('Image')}>
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>{t('Upload')}</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
