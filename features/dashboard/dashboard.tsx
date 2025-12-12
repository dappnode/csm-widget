import { FC } from 'react';
import { BondSection } from './bond';
import { KeysSection } from './keys';
import { RolesSection } from './roles';
import { SurveysCta } from './surveys-cta';
import { StatusSection } from 'dappnode/status/status-section';

export const Dashboard: FC = () => {
  return (
    <>
      <SurveysCta />
      {/* DAPPNODE */}
      <StatusSection />

      <KeysSection />
      <BondSection />
      <RolesSection />
    </>
  );
};
