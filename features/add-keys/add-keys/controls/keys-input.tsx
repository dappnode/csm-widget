import { UPLOAD_DEPOSIT_DATA_LINK } from 'consts/external-links';
import { MATOMO_CLICK_EVENTS_TYPES } from 'consts/matomo-click-events';
import { FormTitle, MatomoLink } from 'shared/components';
import { DepositDataHookForm } from 'shared/hook-form/controls';
// DAPPNODE
import useCheckImportedDepositKeys from 'dappnode/hooks/use-check-deposit-keys';
import { KeysBrainUpload } from 'dappnode/import-keys/keys-input-form';
import { useFormContext } from 'react-hook-form';
import { AddKeysFormInputType } from '../context';

export const KeysInput = () => {
  // DAPPNODE
  const { watch } = useFormContext<AddKeysFormInputType>();
  const depositDataValue = watch('depositData');
  const { missingKeys } = useCheckImportedDepositKeys(depositDataValue);

  return (
    <>
      <FormTitle
        extra={
          <MatomoLink
            href={UPLOAD_DEPOSIT_DATA_LINK}
            matomoEvent={MATOMO_CLICK_EVENTS_TYPES.depositDataLearnMore}
          >
            Learn more
          </MatomoLink>
        }
      >
        Upload deposit data
      </FormTitle>

      <DepositDataHookForm />
      {missingKeys.length > 0 && (
        <KeysBrainUpload missingKeys={missingKeys} error={false} />
      )}
    </>
  );
};
