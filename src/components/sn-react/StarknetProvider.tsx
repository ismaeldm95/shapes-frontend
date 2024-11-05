"use client";
import React from "react";
 
import { sepolia, mainnet, devnet, Chain } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  voyager,
  jsonRpcProvider,
} from "@starknet-react/core";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";

const getChains = (): Chain[] => {
  const network = process.env.NEXT_PUBLIC_STARKNET_NETWORK || 'sepolia';
  
  switch (network) {
    case 'devnet':
      return [devnet];
    case 'mainnet':
      return [mainnet];
    case 'sepolia':
      return [sepolia];
    default:
      return [sepolia]; // Default fallback
  }
};

const getProvider = () => {
  const rpcUrl = process.env.NEXT_PUBLIC_STARKNET_RPC_URL;
  if (rpcUrl) {
    return jsonRpcProvider({ rpc: () => ({ nodeUrl: rpcUrl }) });
  }
  return publicProvider();
};
 
export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const connectors = [
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" }}),
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" }}),
    new WebWalletConnector({ url: process.env.NEXT_PUBLIC_WEB_WALLET_URL })
  ];
 
  return (
    <StarknetConfig
      chains={getChains()}
      provider={getProvider()}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}