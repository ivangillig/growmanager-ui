import { Typography } from 'antd'
import { useTranslation } from 'next-i18next'
import AppRoot from '../src/hoc/AppRoot'

const { Title } = Typography

function DashboardPage() {
  const { t } = useTranslation()

  return (
    <AppRoot>
      <Title level={2}>{t('Dashboard')}</Title>
      <p>{t('Welcome to your GrowManager dashboard!')}</p>
    </AppRoot>
  )
}

export default DashboardPage
