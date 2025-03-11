import { Typography } from 'antd'
import { useTranslation } from 'next-i18next'

const { Title } = Typography

export default function Dashboard() {
  const { t } = useTranslation()

  return (
    <>
      <Title level={2}>{t('Dashboard')}</Title>
      <p>{t('Welcome to your GrowManager dashboard!')}</p>
    </>
  )
}
