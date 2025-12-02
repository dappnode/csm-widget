import { CSM_SUPPORTED_CHAINS } from '@lidofinance/lido-csm-sdk';
import { CHAINS } from '@lidofinance/lido-ethereum-sdk';

export const CHAIN_NAMES = {
  [CHAINS.Mainnet]: 'Mainnet',
  [CHAINS.Hoodi]: 'Hoodi',
} as const;

export type ChainNames = (typeof CHAIN_NAMES)[keyof typeof CHAIN_NAMES];

export const CHAINS_COLORS: Record<CSM_SUPPORTED_CHAINS, string> = {
  [CHAINS.Mainnet]: '#29b6af',
  [CHAINS.Hoodi]: '#AA346A',
};

// DAPPNODE
export const FEE_RECIPIENT_BY_NETWORK: Record<CSM_SUPPORTED_CHAINS, string> = {
  [CHAINS.Mainnet]: '0x388C818CA8B9251b393131C08a736A67ccB19297',
  [CHAINS.Hoodi]: '0x9b108015fe433F173696Af3Aa0CF7CDb3E104258',
};

// DAPPNODE
export const REPORT_TIMESTAMPS_BY_NETWORK: Record<
  CSM_SUPPORTED_CHAINS,
  number
> = {
  [CHAINS.Mainnet]: 1732282199, // DAPPNODE, epoch 326714
  [CHAINS.Hoodi]: 1732282199, // TODO: Update with hoodi CSM deployment timestamp
};
