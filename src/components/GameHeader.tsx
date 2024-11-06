'use client'

import { useEffect, useState } from 'react'
import { StarknetIdNavigator } from "starknetid.js"
import { useProvider, useNetwork } from "@starknet-react/core"
import { constants } from "starknet"
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
          constants.StarknetChainId.SN_MAIN
        )

        const starkProfile = await starknetIdNavigator.getProfileData(address, false)
        
        if (starkProfile) {
          setProfileData(starkProfile)
        }
      } catch (error) {
        console.error("Error fetching StarknetID data:", error)
      }
    }

    // Only fetch on mainnet
    if (!chain?.testnet) {
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
              // Urls from starknetID can be very different, NextJS Image component doesn't work with non preknown urls
              // eslint-disable-next-line @next/next/no-img-element 
              <img
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