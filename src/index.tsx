import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'
import { PhantomWalletAdapter, SolflareWalletAdapter, WalletConnectWalletAdapter, WalletConnectWalletAdapterConfig } from '@solana/wallet-adapter-wallets'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { GambaPlatformProvider, ReferralProvider, TokenMetaProvider } from 'gamba-react-ui-v2'
import { GambaProvider, SendTransactionProvider } from 'gamba-react-v2'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { DEFAULT_POOL, PLATFORM_CREATOR_ADDRESS, PLATFORM_CREATOR_FEE, PLATFORM_JACKPOT_FEE, PLATFORM_REFERRAL_FEE, RPC_ENDPOINT, TOKEN_METADATA, TOKEN_METADATA_FETCHER } from './constants'
import './styles.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

// Configuration for WalletConnectWalletAdapter
const walletConnectConfig: WalletConnectWalletAdapterConfig = {
  network: WalletAdapterNetwork.Mainnet, 
  options: { 
    relayUrl: 'https://relay.walletconnect.org', 
  }
};

function Root() {
  const wallets = React.useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new WalletConnectWalletAdapter(walletConnectConfig),
    ],
    [],
  )

  return (
    <BrowserRouter>
      <ConnectionProvider
        endpoint={RPC_ENDPOINT}
        config={{ commitment: 'processed' }}
      >
        <WalletProvider autoConnect wallets={wallets}>
          <WalletModalProvider>
            <TokenMetaProvider
              tokens={TOKEN_METADATA}
              fetcher={TOKEN_METADATA_FETCHER}
            >
              <SendTransactionProvider priorityFee={200_201}>
                <GambaProvider>
                  <GambaPlatformProvider
                    creator={PLATFORM_CREATOR_ADDRESS}
                    defaultCreatorFee={PLATFORM_CREATOR_FEE}
                    defaultJackpotFee={PLATFORM_JACKPOT_FEE}
                    defaultPool={DEFAULT_POOL}
                  >
                    <ReferralProvider
                      prefix="code"
                      fee={PLATFORM_REFERRAL_FEE}
                    >
                      <App />
                    </ReferralProvider>
                  </GambaPlatformProvider>
                </GambaProvider>
              </SendTransactionProvider>
            </TokenMetaProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </BrowserRouter>
  )
}

root.render(<Root />)
