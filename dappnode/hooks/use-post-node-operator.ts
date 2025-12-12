import { useEffect } from 'react';
import { NodeOperator } from '@lidofinance/lido-csm-sdk';
import useDappnodeUrls from './use-dappnode-urls';

export const usePostNodeOperator = (operator: NodeOperator | undefined) => {
  const { backendUrl } = useDappnodeUrls();

  useEffect(() => {
    if (!operator) return;

    const sendOperatorUpdate = async () => {
      try {
        await fetch(`${backendUrl}/api/v0/events_indexer/operatorId`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ operatorId: Number(operator.id).toString() }),
        });
      } catch (err) {
        console.error('Failed to POST operatorId:', err);
      }
    };

    void sendOperatorUpdate();
  }, [backendUrl, operator]);
};
