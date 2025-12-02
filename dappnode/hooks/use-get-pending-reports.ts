import { useEffect, useState } from 'react';
import useDappnodeUrls from './use-dappnode-urls';
import { useNodeOperator } from 'modules/web3';

export const useGetPendingReports = () => {
  const { backendUrl } = useDappnodeUrls();

  const [pendingReports, setPendingReports] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { nodeOperator } = useNodeOperator();

  useEffect(() => {
    const getPendingReports = async () => {
      setIsLoading(true);
      try {
        console.debug(`GETting pending reports from events indexer API`);
        const response = await fetch(
          `${backendUrl}/api/v0/events_indexer/pending_hashes?operatorId=${nodeOperator?.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPendingReports(data.length);
        setIsLoading(false);
      } catch (e) {
        console.error(
          `Error GETting pending reports from events indexer API: ${e}`,
        );
        setIsLoading(false);
      }
    };

    if (nodeOperator) {
      void getPendingReports();
    }
  }, [nodeOperator, backendUrl]);

  return { isLoading, pendingReports };
};
