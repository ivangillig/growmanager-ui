import React from 'react'
import { Card, Tag, Row, Col } from 'antd'
import { useTranslation } from 'next-i18next'
import { getFullImageUrl } from '../../utils/commonUtils'

const BasicSeedCard = ({ seed }) => {
  const { t } = useTranslation()
  const imageUrl = seed.imageUrl
    ? getFullImageUrl(seed.imageUrl)
    : '/images/image_not_found.png'

  return (
    <Card
      size="small"
      title={t('Genetic Information')}
      style={{ marginBottom: 16 }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <img src={imageUrl} alt={seed.genetic} style={{ width: '100%' }} />
        </Col>
        <Col span={16}>
          <p>
            {t('Genetic')}: {seed.genetic}
          </p>
          <p>
            {t('Seed Bank')}: {seed.seedBank}
          </p>
          <p>
            {t('Chemo Type')}: {seed.chemoType}
          </p>
          {seed.ratio && (
            <p>
              {t('Ratio')}: {seed.ratio}
            </p>
          )}
          {seed.dominance && (
            <p>
              {t('Dominance')}: {seed.dominance}
            </p>
          )}
          {seed.cannabinoids && (
            <div>
              {seed.cannabinoids.map((cannabinoid, index) => (
                <Tag color="green" key={index}>
                  {cannabinoid}
                </Tag>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Card>
  )
}

export default BasicSeedCard
