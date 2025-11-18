import { CHAINS } from '@lidofinance/lido-ethereum-sdk';
import getConfig from 'next/config';

interface DappnodeUrls {
  brainUrl: string;
  brainKeysUrl: string;
  brainLaunchpadUrl: string;
  signerUrl: string;
  sentinelUrl: string;
  stakersUiUrl: string;
  backendUrl: string;
  ECApiUrl: string;
  CCApiUrl: string;
  CCVersionApiUrl: string;
  CCStatusApiUrl: string;
  keysStatusUrl: string;
  installerTabUrl: string;
  MEVApiUrl: string;
  MEVPackageConfig: string;
}

const useDappnodeUrls = () => {
  // Rely on runtime config to get the chainId and avoid nullish values when wallet is not connected from chainId
  const { publicRuntimeConfig } = getConfig();

  const urlsByChain: Partial<Record<CHAINS, DappnodeUrls>> = {
    [CHAINS.Mainnet]: {
      brainUrl: 'http://brain.web3signer.dappnode',
      brainKeysUrl: '/api/brain-keys-mainnet',
      brainLaunchpadUrl: '/api/brain-launchpad-mainnet',
      signerUrl: 'http://web3signer.web3signer.dappnode',
      sentinelUrl: 'https://t.me/CSMSentinel_bot',
      stakersUiUrl: 'http://my.dappnode/stakers/ethereum',
      backendUrl: 'http://lido-events.lido-csm-mainnet.dappnode:8080',
      ECApiUrl:
        publicRuntimeConfig.rpcUrls_1 ||
        'http://execution.mainnet.dncore.dappnode:8545',
      CCApiUrl: 'http://beacon-chain.mainnet.dncore.dappnode:3500',
      CCVersionApiUrl: '/api/consensus-version-mainnet',
      CCStatusApiUrl: '/api/consensus-status-mainnet',
      keysStatusUrl: '/api/keys-status-mainnet',
      installerTabUrl:
        'http://my.dappnode/installer/dnp/lido-csm-hoodi.dnp.dappnode.eth',
      MEVApiUrl: '/api/mev-status-mainnet',
      MEVPackageConfig:
        'http://my.dappnode/packages/my/mev-boost.dnp.dappnode.eth/config',
    },
    [CHAINS.Hoodi]: {
      brainUrl: 'http://brain.web3signer-hoodi.dappnode',
      brainKeysUrl: '/api/brain-keys-hoodi',
      brainLaunchpadUrl: '/api/brain-launchpad-hoodi',
      signerUrl: 'http://web3signer.web3signer-hoodi.dappnode',
      sentinelUrl: 'https://t.me/CSMSentinelHoodi_bot',
      stakersUiUrl: 'http://my.dappnode/stakers/hoodi',
      backendUrl: 'http://lido-events.lido-csm-hoodi.dappnode:8080',
      ECApiUrl:
        publicRuntimeConfig.rpcUrls_560048 ||
        'http://execution.hoodi.dncore.dappnode:8545',
      CCApiUrl: 'http://beacon-chain.hoodi.dncore.dappnode:3500',
      CCVersionApiUrl: '/api/consensus-version-hoodi',
      CCStatusApiUrl: '/api/consensus-status-hoodi',
      keysStatusUrl: '/api/keys-status-hoodi',
      installerTabUrl:
        'http://my.dappnode/installer/dnp/lido-csm-hoodi.dnp.dappnode.eth',
      MEVApiUrl: '/api/mev-status-hoodi',
      MEVPackageConfig:
        'http://my.dappnode/packages/my/mev-boost-hoodi.dnp.dappnode.eth/config',
    },
  };

  const brainUrl =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]?.brainUrl || '';
  const brainKeysUrl =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]?.brainKeysUrl || '';
  const brainLaunchpadUrl =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]
      ?.brainLaunchpadUrl || '';
  const signerUrl =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]?.signerUrl || '';
  const sentinelUrl =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]?.sentinelUrl || '';
  const stakersUiUrl =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]?.stakersUiUrl || '';
  const backendUrl =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]?.backendUrl || '';
  const ECApiUrl =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]?.ECApiUrl || '';
  const CCApiUrl =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]?.CCApiUrl || '';
  const CCVersionApiUrl =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]?.CCVersionApiUrl ||
    '';
  const CCStatusApiUrl =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]?.CCStatusApiUrl ||
    '';
  const keysStatusUrl =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]?.keysStatusUrl ||
    '';
  const installerTabUrl = (isMainnet: boolean) =>
    urlsByChain[isMainnet ? 1 : 17000]?.installerTabUrl;
  const MEVApiUrl =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]?.MEVApiUrl || '';
  const MEVPackageConfig =
    urlsByChain[publicRuntimeConfig.defaultChain as CHAINS]?.MEVPackageConfig ||
    '';

  return {
    brainUrl,
    brainKeysUrl,
    brainLaunchpadUrl,
    signerUrl,
    sentinelUrl,
    stakersUiUrl,
    backendUrl,
    ECApiUrl,
    CCApiUrl,
    CCVersionApiUrl,
    CCStatusApiUrl,
    keysStatusUrl,
    installerTabUrl,
    MEVApiUrl,
    MEVPackageConfig,
  };
};

export default useDappnodeUrls;
