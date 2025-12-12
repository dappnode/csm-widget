import { CHAINS } from '@lidofinance/lido-ethereum-sdk';
import getConfig from 'next/config';
import { useEffect, useMemo, useState } from 'react';
import useDappnodeUrls from './use-dappnode-urls';

export const useECSanityCheck = () => {
  const [isInstalled, setIsInstalled] = useState<boolean>(true); // Use default true to avoid frontend flickering with IsInstalled component
  const [isSynced, setIsSynced] = useState<boolean>(true); // Use default true to avoid frontend flickering with IsSynced component
  const [hasLogs, setHasLogs] = useState<boolean>(true); // Use default true to avoid frontend flickering with HasLogs component
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { ECApiUrl } = useDappnodeUrls();
  const { publicRuntimeConfig } = getConfig();

  const contractTx = useMemo(
    () => ({
      [CHAINS.Mainnet]: `0xf5330dbcf09885ed145c4435e356b5d8a10054751bb8009d3a2605d476ac173f`,
      [CHAINS.Hoodi]: `0xebc45a0fa30a3f9badbcc4448ea22cef1a5d18b97825802a70df31cecb59127d`,
    }),
    [],
  );

  useEffect(() => {
    const getSyncStatus = async () => {
      try {
        setIsLoading(true);
        const syncResponse = await fetch(`${ECApiUrl}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_syncing',
            params: [],
            id: 0,
          }),
        });
        if (!syncResponse.ok) {
          publicRuntimeConfig.defaultChain;
          throw new Error(`HTTP error! Status: ${syncResponse.status}`);
        }

        const syncData = await syncResponse.json();

        setIsInstalled(true);
        setIsSynced(syncData.result ? false : true);
        setIsLoading(false);
      } catch (e) {
        console.error(`Error getting EC data: ${e}`);
        setIsInstalled(false);
        setIsLoading(false);
      }
    };

    void getSyncStatus();
  }, [ECApiUrl, publicRuntimeConfig.defaultChain]);

  useEffect(() => {
    const getTxStatus = async () => {
      try {
        setIsLoading(true);

        const txResponse = await fetch(`${ECApiUrl}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_getTransactionReceipt',
            params: [
              contractTx[
                publicRuntimeConfig.defaultChain as keyof typeof contractTx
              ],
            ],
            id: 0,
          }),
        });

        if (!txResponse.ok) {
          throw new Error(`HTTP error! Status: ${txResponse.status}`);
        }

        const txData = await txResponse.json();

        setHasLogs(txData.result ? true : false);
        setIsLoading(false);
      } catch (e) {
        console.error(`Error getting EC data: ${e}`);
        setIsLoading(false);
      }
    };

    void getTxStatus();
  }, [ECApiUrl, contractTx, isSynced, publicRuntimeConfig.defaultChain]);

  return { isSynced, isInstalled, hasLogs, isLoading };
};
