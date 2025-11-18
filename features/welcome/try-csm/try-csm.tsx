import { Button, Text } from '@lidofinance/lido-ui';
import { getConfig } from 'config';
import { FC } from 'react';
import { StyledBlock, StyledStack } from './styles';
// DAPPNODE
import useDappnodeUrls from 'dappnode/hooks/use-dappnode-urls';
import { CHAINS } from '@lidofinance/lido-ethereum-sdk';

const { defaultChain } = getConfig();

export const TryCSM: FC = () => {
  const isMainnet = defaultChain === CHAINS.Mainnet;
  // DAPPNODE
  const { installerTabUrl } = useDappnodeUrls();

  if (isMainnet)
    return (
      <StyledBlock>
        <StyledStack>
          <Text weight={700} size="lg">
            Try CSM on Hoodi
          </Text>
          {/* DAPPNODE */}
          <a
            target="_blank"
            rel="noreferrer"
            href={installerTabUrl(isMainnet) || ''}
          >
            <Button size="xs" variant="outlined">
              Join CSM Testnet
            </Button>
          </a>
        </StyledStack>
        <Text color="secondary" size="xs">
          CSM uses Hoodi as a testnet playground for those who want to try the
          module in action in a test environment.
        </Text>
      </StyledBlock>
    );

  return (
    <StyledBlock>
      <StyledStack>
        <Text weight={700} size="lg">
          Try CSM on Mainnet
        </Text>
        {/* DAPPNODE */}
        <a
          target="_blank"
          rel="noreferrer"
          href={installerTabUrl(isMainnet) || ''}
        >
          <Button size="xs" variant="outlined">
            Join CSM Mainnet
          </Button>
        </a>
      </StyledStack>
    </StyledBlock>
  );
};
