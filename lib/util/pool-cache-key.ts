import { Protocol } from '@taraswap/router-sdk'
import { ChainId } from '@taraswap/sdk-core'

export const S3_POOL_CACHE_KEY = (baseKey: string, chain: ChainId, protocol: Protocol) =>
  `${baseKey}-${chain}-${protocol}`
