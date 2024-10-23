import { PublicKey } from '@solana/web3.js'
import { FAKE_TOKEN_MINT, PoolToken, TokenMeta, makeHeliusTokenFetcher } from 'gamba-react-ui-v2'

// Get RPC from the .env file or default to the public RPC.
export const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT ?? 'https://api.mainnet-beta.solana.com'

// Solana address that will receive fees when somebody plays on this platform
export const PLATFORM_CREATOR_ADDRESS = new PublicKey(
  'AjhV5Su8V5NLsnfqkYvUTGSRMPkj9pQ33HTohFAU8R43',
)

// Gamba explorer URL - Appears in RecentPlays
export const EXPLORER_URL = 'https://explorer.gamba.so'

// Platform URL - Appears in ShareModal
export const PLATFORM_SHARABLE_URL = 'play.gamba.so'

// Creator fee (in %)
export const PLATFORM_CREATOR_FEE = 0.01 // 1% !!max 5%!!

// Jackpot fee (in %)
export const PLATFORM_JACKPOT_FEE = 0.001 // 0.1%

// Referral fee (in %)
export const PLATFORM_REFERRAL_FEE = 0.0025 // 0.25%

/** If the user should be able to revoke an invite after they've accepted an invite */
export const PLATFORM_ALLOW_REFERRER_REMOVAL = true

// Just a helper function
const lp = (tokenMint: PublicKey | string, poolAuthority?: PublicKey | string): PoolToken => ({
  token: new PublicKey(tokenMint),
  authority: poolAuthority !== undefined ? new PublicKey(poolAuthority) : undefined,
})

/**
 * List of pools supported by this platform
 * Make sure the token you want to list has a corresponding pool on https://explorer.gamba.so/pools
 * For private pools, add the creator of the Liquidity Pool as a second argument
 */
export const POOLS = [
  // JMoney:
  lp('HZNnmhAY6xfq2iKRyBTEvTVeoTYJzpkK8mfnfG8Ppump'),
  // SOL:
  lp('So11111111111111111111111111111111111111112'),
  // Bonk:
  lp('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'),
   // USDC:
  lp('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
  // Fake token:
  lp(FAKE_TOKEN_MINT),
]

// The default token to be selected
export const DEFAULT_POOL = POOLS[0]

/**
 * List of token metadata for the supported tokens
 * Alternatively, we can provide a fetcher method to automatically fetch metadata. See TOKEN_METADATA_FETCHER below.
 */
export const TOKEN_METADATA: (Partial<TokenMeta> & {mint: PublicKey})[] = [
  {
    mint: FAKE_TOKEN_MINT,
    name: '試玩幣',
    symbol: '試玩幣',
    image: '/fakemoney.png',
    baseWager: 1e12,
    decimals: 9,
    usdPrice: 0,
  },
  {
    mint: new PublicKey('HZNnmhAY6xfq2iKRyBTEvTVeoTYJzpkK8mfnfG8Ppump'),
    name: 'Joss Money',
    symbol: 'JMoney',
    image: 'https://i.ibb.co/vQN8D0w/icon-512.png',
    baseWager: 1e8,
    decimals: 6,
    usdPrice: 0,
  },
  {
    mint: new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'),
    name: 'Bonk',
    symbol: 'Bonk',
    image: 'https://i.ibb.co/MpLfhFQ/23095.png',
    baseWager: 1e8,
    decimals: 6,
    usdPrice: 0,
  },
]

/** HTML to display to user that they need to accept in order to continue */
export const TOS_HTML = `
  <p><b>1. 年齡要求：</b>加密或幣遊玩必須至少18歲，未滿18歲請玩免費的試玩幣。</p>
  <p><b>2. 法律遵守：</b>本平台僅提供玩家遊玩，不提供任何出金法幣管道</p>
  <p><b>3. 風險認知：</b>遊戲涉及風險；沒有保證的獲勝。</p>
  <p><b>4. 無保證：</b>遊戲按「智能合約」提供機率計算</p>
  <p><b>5. 責任限制：</b>投資理財有賺有賠，請自行承擔風險</p>
  <p><b>6. 許可聲明免責：</b>非經營性賭場；僅用於模擬增加JMoney的娛樂實用性。</p>
  <p><b>7. 智能合約：</b>遊戲公正且透明地進行。</p>
  <p><b>8. 數據隱私：</b>任何數據皆以Web3與當地法律團隊不會持有任何個資</p>
  <p><b>9. 有任何問題：</b>可以洽詢金紙JMoney社團</p>
`

/**
 * A method for automatically fetching Token Metadata.
 * Here we create a fetcher that uses Helius metadata API, if an API key exists as an environment variable.
 */
export const TOKEN_METADATA_FETCHER = (
  () => {
    if (import.meta.env.VITE_HELIUS_API_KEY) {
      return makeHeliusTokenFetcher(
        import.meta.env.VITE_HELIUS_API_KEY,
        { dollarBaseWager: 1 },
      )
    }
  }
)()
