import { useState, useCallback } from 'react';
import useDappnodeUrls from './use-dappnode-urls';
import { FEE_RECIPIENT_BY_NETWORK } from 'consts/chains';
import { useDappStatus } from 'modules/web3';

const useBrainLaunchpadApi = () => {
  const { brainLaunchpadUrl } = useDappnodeUrls();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const { chainId } = useDappStatus();

  const lidoFeeRecipient = FEE_RECIPIENT_BY_NETWORK[chainId] ?? '';

  const submitKeystores = useCallback(
    async ({
      keystores,
      password,
    }: {
      keystores: object[];
      password: string;
    }) => {
      setIsLoading(true);
      setIsSuccess(false);
      setError(undefined);

      // Push same pass and tag for every entry in keystores
      const passwords: string[] = [];
      const tags: string[] = [];
      const feeRecipients: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const keystore of keystores) {
        passwords.push(password);
        tags.push('lido');
        feeRecipients.push(lidoFeeRecipient);
      }

      const stringifiedKeystores = keystores.map((keystore) =>
        JSON.stringify(keystore),
      );

      const keystoresData = {
        keystores: stringifiedKeystores,
        passwords,
        tags,
        feeRecipients,
      };

      try {
        const response = await fetch(`${brainLaunchpadUrl}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify(keystoresData),
        });

        if (response.ok) setIsSuccess(true);
      } catch (error) {
        console.error(error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [brainLaunchpadUrl, lidoFeeRecipient],
  );

  return { submitKeystores, isLoading, isSuccess, error };
};

export default useBrainLaunchpadApi;
