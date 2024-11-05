'use client'

import { useEffect, useState } from 'react'
import { StarknetIdNavigator } from "starknetid.js"
import { useProvider, useNetwork } from "@starknet-react/core"
import { constants } from "starknet"
import Image from "next/image"
import CircleAvatar from './CircleAvatar'

interface GameHeaderProps {
  address: string
  rightText?: string
  style?: React.CSSProperties
}

type StarkProfile = {
  name?: string
  profilePicture?: string
  discord?: string
  twitter?: string
  github?: string
  proofOfPersonhood?: boolean
}

export default function GameHeader({ address, rightText, style }: GameHeaderProps) {
  const { provider } = useProvider()
  const { chain } = useNetwork()
  const [profileData, setProfileData] = useState<StarkProfile>({})

  useEffect(() => {
    const fetchStarknetId = async () => {
      if (!provider || !chain || !address) return

      try {
        const starknetIdNavigator = new StarknetIdNavigator(
          provider,
          chain.id as constants.StarknetChainId
        )

        // Get starkname first
        const starkName = await starknetIdNavigator.getStarkName(address)
        
        if (starkName) {
          // Get complete profile data if starkname exists
          const profile = await starknetIdNavigator.getProfileData(starkName)
          
          // Get profile picture
          let profilePicture = "/placeholder.svg"
          try {
            profilePicture = await starknetIdNavigator.getProfilePicture(starkName)
          } catch (error) {
            console.warn("Failed to fetch profile picture:", error)
          }

          setProfileData({ 
            ...profile,
            name: starkName,
            profilePicture
          })
        }
      } catch (error) {
        console.error("Error fetching StarknetID data:", error)
      }
    }

    // Only fetch on mainnet
    if (chain?.name.toLowerCase().includes('mainnet')) {
      fetchStarknetId()
    }
  }, [provider, chain, address])

  // Truncate address to format: 0x1234...5678
  const truncateAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className="flex justify-between items-center p-4 bg-primary h-16">
      <div style={style} className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-foreground">
            {profileData.profilePicture ? (
              <Image
                src={profileData.profilePicture}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <CircleAvatar address={address} size={40} />
            )}
          </div>
          <span className="text-sm font-bold text-primary-foreground">
            {profileData.name || truncateAddress(address)}
          </span>
        </div>
        <div className="text-lg font-bold text-primary-foreground">
          {rightText}
        </div>
      </div>
    </header>
  )
} 