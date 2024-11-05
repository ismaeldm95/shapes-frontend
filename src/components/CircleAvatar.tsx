'use client'

type CircleAvatarProps = {
  address: string
  size?: number
}

const gradientColors = ['#59AFE2', '#6AC288', '#998EC4', '#C5DB46', '#DO8AB8', '#F26269', '#F89D34', '#FEE51C']

const getColors = (address: string): string[] => {
  // Remove '0x' prefix if present and split into chunks of 7 characters
  const cleanAddress = address.replace('0x', '')
  const seedArr = cleanAddress.match(/.{1,7}/g)?.splice(0, 5) || []
  const colors: string[] = []

  seedArr.forEach((seed) => {
    let hash = 0
    for (let i = 0; i < seed.length; i += 1) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash)
      hash = hash & hash
    }
    
    // Use the hash to select a color from our predefined array
    const colorIndex = Math.abs(hash) % gradientColors.length
    colors.push(gradientColors[colorIndex])
  })

  return colors
}

export default function CircleAvatar({ address, size = 40 }: CircleAvatarProps) {
  const colors = getColors(address)
  
  const containerStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    position: 'relative' as const,
    backgroundColor: '#ffffff',
    overflow: 'hidden'
  }

  const circles = [
    { cx: '66%', cy: '77%', r: '45%' },
    { cx: '29%', cy: '97%', r: '35%' },
    { cx: '99%', cy: '86%', r: '40%' },
    { cx: '50%', cy: '50%', r: '50%' }
  ]

  return (
    <div style={containerStyle}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {circles.map((circle, index) => (
          <circle
            key={index}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill={colors[index]}
            fillOpacity="0.4"
          />
        ))}
      </svg>
    </div>
  )
} 