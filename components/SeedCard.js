import React from 'react'
import { Card } from 'antd'
import { getFullImageUrl } from '../utils/commonUtils'

const SeedCard = ({ seed }) => {
  const imageUrl = seed.imageUrl
    ? getFullImageUrl(seed.imageUrl)
    : '/images/image_not_found.png'

  return (
    <Card>
      <img src={imageUrl} alt={seed.genetic} className="seed-card-image" />
      <Card title={seed.genetic}>
        <p>Seed Bank: {seed.seedBank}</p>
        <p>Chemo Type: {seed.chemoType}</p>
      </Card>
    </Card>
  )
}

export default SeedCard
