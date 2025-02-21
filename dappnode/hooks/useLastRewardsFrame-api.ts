import { useLidoSWR } from '@lido-sdk/react';
import { STRATEGY_CONSTANT } from 'consts/swr-strategies';
import { fetchWithRetry } from 'dappnode/utils/fetchWithRetry'; // DAPPNODE
import useDappnodeUrls from 'dappnode/hooks/use-dappnode-urls'; // DAPPNODE

// DAPPNODE
interface Event {
  RefSlot: number;
  Hash: number[];
  Raw: {
    address: string;
    topics: string[];
    data: string;
    blockNumber: string;
    transactionHash: string;
    transactionIndex: string;
    blockHash: string;
    logIndex: string;
    removed: boolean;
  };
}

export const useLastRewrdsTx = (config = STRATEGY_CONSTANT) => {
  const { backendUrl } = useDappnodeUrls();

  return useLidoSWR(
    ['fee-oracle-report-tx'],
    async () => {
      const url = `${backendUrl}/api/v0/events_indexer/processing_started`;
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetchWithRetry(url, options, 5000);
      if (!response.ok) {
        throw new Error('Failed to fetch processing started events');
      }
      const events: Event[] = await response.json();
      const txs = events
        .sort(
          (a, b) =>
            parseInt(a.Raw.blockNumber, 16) - parseInt(b.Raw.blockNumber, 16),
        )
        .map((event) => {
          return event.Raw.transactionHash;
        });
      return txs[txs.length - 1];
    },
    config,
  );
};
