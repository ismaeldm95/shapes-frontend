"use client";
import React from "react";
 
import { sepolia, mainnet, devnet, Chain } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  voyager,
  jsonRpcProvider,
  Connector,
} from "@starknet-react/core";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";
import { ArgentMobileConnector } from "starknetkit/argentMobile";

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
    new WebWalletConnector({ url: process.env.NEXT_PUBLIC_WEB_WALLET_URL }),
    ArgentMobileConnector.init({
      options: {
        dappName: "Shapes",
        projectId: process.env.NEXT_PUBLIC_ARGENT_MOBILE_PROJECT_ID,
        url: "https://shapes.xyz"
      }
    })
  ];
 
  const starknetConnectors = connectors as unknown as Connector[]

  return (
    <StarknetConfig
      chains={getChains()}
      provider={getProvider()}
      connectors={starknetConnectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}