import React from 'react'
import { Card, Flex, Tag, Tooltip } from 'antd'
import { getFullImageUrl } from '../../utils/commonUtils'
import { useTranslation } from 'next-i18next'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'

const { Meta } = Card
const SeedCard = ({ seed, onViewDetails, onEdit, onDelete }) => {
  const { t } = useTranslation()
  const imageUrl = seed.imageUrl
    ? getFullImageUrl(seed.imageUrl)
    : '/images/image_not_found.png'

  return (
    <Card
      hoverable
      cover={
        <img src={imageUrl} alt={seed.genetic} className="seed-card-image" />
      }
      actions={[
        <FaEye onClick={onViewDetails} title={t('View Details')} />,
        <FaEdit onClick={onEdit} title={t('Edit')} />,
        <FaTrash onClick={onDelete} title={t('Delete')} />,
      ]}
      className="seed-card"
    >
      <Meta
        title={seed.genetic}
        description={
          <>
            <Tooltip title={`${t('Seed Bank')}: ${seed.seedBank}`}>
              <p className="seed-card-description">
                {t('Seed Bank')}: {seed.seedBank}
              </p>
            </Tooltip>
            <p className="seed-card-description">
              {t('Chemo Type')}: {seed.chemoType}
            </p>
            <Flex gap="4px 0" wrap>
              {seed.cannabinoids.map((cannabinoid, index) => (
                <Tag bordered={false} color={'green'} key={index}>
                  {cannabinoid}
                </Tag>
              ))}
            </Flex>
          </>
        }
      />
    </Card>
  )
}

export default SeedCard
