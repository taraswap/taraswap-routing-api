import {
  constructSameBatchParamsMap,
  constructSameBlockNumberConfigsMap,
  constructSameGasErrorFailureOverridesMap,
  constructSameRetryOptionsMap,
  constructSameSuccessRateFailureOverridesMap,
  DEFAULT_BATCH_PARAMS,
  DEFAULT_BLOCK_NUMBER_CONFIGS,
  DEFAULT_GAS_ERROR_FAILURE_OVERRIDES,
  DEFAULT_RETRY_OPTIONS,
  DEFAULT_SUCCESS_RATE_FAILURE_OVERRIDES,
} from '@taraswap/smart-order-router/build/main/util/onchainQuoteProviderConfigs'
import { CHAIN_TO_ADDRESSES_MAP, ChainId } from '@taraswap/sdk-core'
import AsyncRetry from 'async-retry'
import { AddressMap, BatchParams, BlockNumberConfig, FailureOverrides } from '@taraswap/smart-order-router'
import { Protocol } from '@taraswap/router-sdk'

export const RETRY_OPTIONS: { [chainId: number]: AsyncRetry.Options | undefined } = {
  ...constructSameRetryOptionsMap(DEFAULT_RETRY_OPTIONS),
}

export const OPTIMISTIC_CACHED_ROUTES_BATCH_PARAMS: { [protocol: string]: { [chainId: number]: BatchParams } } = {
  [Protocol.V3]: {
    ...constructSameBatchParamsMap(DEFAULT_BATCH_PARAMS),
    [ChainId.TARAXA]: {
      multicallChunk: 1320,
      gasLimitPerCall: 300_000,
      quoteMinSuccessRate: 0.1,
    },
  },
  [Protocol.MIXED]: {
    ...constructSameBatchParamsMap(DEFAULT_BATCH_PARAMS),
    [ChainId.TARAXA]: {
      multicallChunk: 1320,
      gasLimitPerCall: 300_000,
      quoteMinSuccessRate: 0.1,
    },
  },
}

export const NON_OPTIMISTIC_CACHED_ROUTES_BATCH_PARAMS: { [protocol: string]: { [chainId: number]: BatchParams } } = {
  [Protocol.V3]: {
    ...constructSameBatchParamsMap(DEFAULT_BATCH_PARAMS),
    [ChainId.TARAXA]: {
      multicallChunk: 660,
      gasLimitPerCall: 200_000,
      quoteMinSuccessRate: 0.1,
    },
  },
  [Protocol.MIXED]: {
    ...constructSameBatchParamsMap(DEFAULT_BATCH_PARAMS),
    [ChainId.TARAXA]: {
      multicallChunk: 660,
      gasLimitPerCall: 200_000,
      quoteMinSuccessRate: 0.1,
    },
  },
}

export const GAS_ERROR_FAILURE_OVERRIDES: { [chainId: number]: FailureOverrides } = {
  ...constructSameGasErrorFailureOverridesMap(DEFAULT_GAS_ERROR_FAILURE_OVERRIDES),
  [ChainId.TARAXA]: {
    gasLimitOverride: 3_000_000,
    multicallChunk: 45,
  },
}

export const SUCCESS_RATE_FAILURE_OVERRIDES: { [chainId: number]: FailureOverrides } = {
  ...constructSameSuccessRateFailureOverridesMap(DEFAULT_SUCCESS_RATE_FAILURE_OVERRIDES),
  [ChainId.TARAXA]: {
    gasLimitOverride: 3_000_000,
    multicallChunk: 45,
  },
}

export const BLOCK_NUMBER_CONFIGS: { [chainId: number]: BlockNumberConfig } = {
  ...constructSameBlockNumberConfigsMap(DEFAULT_BLOCK_NUMBER_CONFIGS),
  [ChainId.TARAXA]: {
    baseBlockOffset: -25,
    rollback: {
      enabled: true,
      attemptsBeforeRollback: 1,
      rollbackBlockOffset: -20,
    },
  },
}

// block -1 means it's never deployed
export const NEW_QUOTER_DEPLOY_BLOCK: { [chainId in ChainId]: number } = {
  [ChainId.MAINNET]: 19662663,
  [ChainId.GOERLI]: -1,
  [ChainId.SEPOLIA]: 5677582,
  [ChainId.OPTIMISM]: 118909709,
  [ChainId.OPTIMISM_GOERLI]: -1,
  [ChainId.OPTIMISM_SEPOLIA]: -1,
  // Arbitrum is special, it's using L1-ish block number (see https://docs.arbitrum.io/build-decentralized-apps/arbitrum-vs-ethereum/block-numbers-and-time)
  [ChainId.ARBITRUM_ONE]: 19680034,
  [ChainId.ARBITRUM_GOERLI]: -1,
  [ChainId.ARBITRUM_SEPOLIA]: -1,
  [ChainId.POLYGON]: 55938282,
  [ChainId.POLYGON_MUMBAI]: 48054046,
  [ChainId.CELO]: 25166959,
  [ChainId.CELO_ALFAJORES]: -1,
  [ChainId.GNOSIS]: -1,
  [ChainId.MOONBEAM]: -1,
  [ChainId.BNB]: 37990148,
  [ChainId.AVALANCHE]: 44406304,
  [ChainId.BASE]: 13311537,
  [ChainId.BASE_GOERLI]: -1,
  [ChainId.ZORA]: -1,
  [ChainId.ZORA_SEPOLIA]: -1,
  [ChainId.ROOTSTOCK]: -1,
  [ChainId.BLAST]: 2370179,
  [ChainId.ZKSYNC]: 35982078,
  [ChainId.TARAXA_TESTNET]: 571923,
  [ChainId.TARAXA]: 10674895,
}

// 0 threshold means it's not deployed yet
export const LIKELY_OUT_OF_GAS_THRESHOLD: { [chainId in ChainId]: number } = {
  [ChainId.MAINNET]: 17540 * 2, // 17540 is the single tick.cross cost on mainnet. We multiply by 2 to be safe.
  [ChainId.GOERLI]: 0,
  [ChainId.SEPOLIA]: 17540 * 2, // 17540 is the single tick.cross cost on sepolia. We multiply by 2 to be safe.
  [ChainId.OPTIMISM]: 17540 * 2, // 17540 is the single tick.cross cost on optimism. We multiply by 2 to be safe.
  [ChainId.OPTIMISM_GOERLI]: 0,
  [ChainId.OPTIMISM_SEPOLIA]: 0,
  [ChainId.ARBITRUM_ONE]: 17540 * 2, // 17540 is the single tick.cross cost on arbitrum. We multiply by 2 to be safe.
  [ChainId.ARBITRUM_GOERLI]: 0,
  [ChainId.ARBITRUM_SEPOLIA]: 0,
  [ChainId.POLYGON]: 17540 * 2, // 17540 is the single tick.cross cost on polygon. We multiply by 2 to be safe.
  [ChainId.POLYGON_MUMBAI]: 17540 * 2, // 17540 is the single tick.cross cost on polygon-mumbai. We multiply by 2 to be safe.
  [ChainId.CELO]: 17540 * 2, // 17540 is the single tick.cross cost on celo. We multiply by 2 to be safe.
  [ChainId.CELO_ALFAJORES]: 0,
  [ChainId.GNOSIS]: 0,
  [ChainId.MOONBEAM]: 0,
  [ChainId.BNB]: 17540 * 2, // 17540 is the single tick.cross cost on bnb. We multiply by 2 to be safe
  [ChainId.AVALANCHE]: 17540 * 2, // 17540 is the single tick.cross cost on avax. We multiply by 2 to be safe
  [ChainId.BASE]: 17540 * 2, // 17540 is the single tick.cross cost on base. We multiply by 2 to be safe
  [ChainId.BASE_GOERLI]: 0,
  [ChainId.ZORA]: 0,
  [ChainId.ZORA_SEPOLIA]: 0,
  [ChainId.ROOTSTOCK]: 0,
  [ChainId.BLAST]: 17540 * 2, // 17540 is the single tick.cross cost on blast. We multiply by 2 to be safe,
  [ChainId.ZKSYNC]: 17540 * 2, // 17540 is the single tick.cross cost on zkSync. We multiply by 2 to be safe
  [ChainId.TARAXA_TESTNET]: 17540 * 2, // 17540 is the single tick.cross cost on zkSync. We multiply by 2 to be safe
  [ChainId.TARAXA]: 17540 * 3, // 17540 is the single tick.cross cost on zkSync. We multiply by 2 to be safe
}

// TODO: Move this new addresses to SOR
export const NEW_MIXED_ROUTE_QUOTER_V1_ADDRESSES: AddressMap = {
  [ChainId.MAINNET]: CHAIN_TO_ADDRESSES_MAP[ChainId.MAINNET].mixedRouteQuoterV1Address,
  [ChainId.GOERLI]: CHAIN_TO_ADDRESSES_MAP[ChainId.GOERLI].mixedRouteQuoterV1Address,
  [ChainId.BASE]: '0xe544efae946f0008ae9a8d64493efa7886b73776',
}
