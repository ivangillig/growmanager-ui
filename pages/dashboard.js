import { Typography, Row, Col, Card } from 'antd'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { Pie, Bar, Line } from '@ant-design/plots'
import AppRoot from '../src/hoc/AppRoot'

const { Title } = Typography

function DashboardPage() {
  const { t } = useTranslation()
  const batches = useSelector((state) => state.batch?.batches || [])

  // Calculate statistics
  const totalBatches = batches.length
  const totalProductionKg = batches.reduce((sum, batch) => sum + batch.qtyProduced, 0) / 1000
  const geneticsCount = batches.reduce((acc, batch) => {
    const genetic = batch.seedId?.genetic || t('Unknown')
    acc[genetic] = (acc[genetic] || 0) + 1
    return acc
  }, {})

  // Prepare data for charts
  const pieData = Object.entries(geneticsCount).map(([genetic, count]) => ({
    type: genetic,
    value: count,
  }))
  const barData = batches.map((batch) => ({
    batch: batch.batchCode,
    qtyProduced: batch.qtyProduced / 1000,
  }))
  const lineData = batches.map((batch) => ({
    date: batch.productionDate,
    dryingTime: batch.dryingTime,
  }))

  return (
    <AppRoot>
      <Title level={2}>{t('Dashboard')}</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col span={8}>
          <Card title={t('Total Batches')} bordered>
            {totalBatches}
          </Card>
        </Col>
        <Col span={8}>
          <Card title={t('Total Production (kg)')} bordered>
            {totalProductionKg.toFixed(2)}
          </Card>
        </Col>
        <Col span={8}>
          <Card title={t('Drying Time Trends')} bordered>
            {t('Average Drying Time')}: {batches.reduce((sum, batch) => sum + batch.dryingTime, 0) / totalBatches || 0} {t('days')}
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title={t('Batches by Genetic')} bordered>
            <Pie
              data={pieData}
              angleField="value"
              colorField="type"
              // radius={0.8}
              // label={{ type: 'outer', content: '{name} {percentage}' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={t('Production by Batch (kg)')} bordered>
            <Bar
              data={barData}
              xField="batch"
              yField="qtyProduced"
              xAxis={{ label: { autoRotate: true } }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={t('Drying Time Trends')} bordered>
            <Line
              data={lineData}
              xField="date"
              yField="dryingTime"
              xAxis={{ type: 'time' }}
              yAxis={{ title: { text: t('Drying Time (days)') } }}
            />
          </Card>
        </Col>
      </Row>
    </AppRoot>
  )
}

export default DashboardPage
