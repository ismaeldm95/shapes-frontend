"use client";
import { useAccount, useConnect } from "@starknet-react/core";
import { StarknetkitConnector, useStarknetkitConnectModal } from "starknetkit";
// import { Button } from "@/components/ui/button";

function WalletConnected() {
  // const { address } = useAccount();
  // const { disconnect } = useDisconnect();

  // const shortenedAddress = useMemo(() => {
  //   if (!address) return "";
  //   return `${address.slice(0, 6)}...${address.slice(-4)}`;
  // }, [address]);

  return (
    <div className="flex items-center space-x-4">
      {/* <span className="text-primary">{shortenedAddress}</span>
      <Button 
        onClick={() => disconnect()}
        variant="outline"
        className="text-primary hover:text-primary-foreground"
      >
        Disconnect
      </Button> */}
    </div>
  );
}

function ConnectWallet() {
  const { connectors, connect } = useConnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as StarknetkitConnector[]
  })
   
  async function connectWallet() {
    const { connector } = await starknetkitConnectModal()
    if (!connector) {
      return
    }
    await connect({ connector })
  }

  return (
    <button
    onClick={connectWallet}
    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg 
      hover:bg-primary/90 transition-colors font-medium"
  >
    Connect Wallet
  </button>
  );
}

export default function ConnectWalletButton() {
  const { address } = useAccount();

  return address ? <WalletConnected /> : <ConnectWallet />;
}
