import { useState } from 'react';
import useDappnodeUrls from './use-dappnode-urls';
import { useActiveNodeOperator } from 'providers/node-operator-provider';

const useGetExitRequests = () => {
  const { backendUrl } = useDappnodeUrls();
  const [exitRequests, setExitRequests] = useState<ExitRequests>();

  const nodeOperator = useActiveNodeOperator();

  interface ExitRequest {
    event: {
      [key: string]: any;
    };
    [key: string]: any;
    validator_pubkey_hex: string;
  }
  type ExitRequests = Record<string, ExitRequest>;

  const getExitRequests = async () => {
    try {
      console.debug(`GETting validators exit requests from indexer API`);
      const response = await fetch(
        `${backendUrl}/api/v0/events_indexer/exit_requests?operatorId=${nodeOperator?.id}`,
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

      const data: ExitRequests = await response.json();

      // Statuses to include if have not started/ended the exit process
      const includedStatuses = ['active_ongoing', 'active_slashed'];

      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([, exitRequest]) =>
          includedStatuses.includes(exitRequest.status),
        ),
      );

      setExitRequests(filteredData);
    } catch (e) {
      console.error(
        `Error GETting validators exit requests from indexer API: ${e}`,
      );
    }
  };

  return { exitRequests, getExitRequests };
};

export default useGetExitRequests;
