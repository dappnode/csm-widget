import { Dispatch, FC, SetStateAction, useState } from 'react';
import { BondStep } from './steps/BondStep';
import { NodeStep } from './steps/NodeStep';
import { NotificationsStep } from './steps/NotificationsStep';
import { KeysWithdrawalStep } from './steps/KeysWithdrawalStep';

export const Steps: FC = () => {
  const StepsTitles: Record<number, string> = {
    1: 'Have Tokens for Bond',
    2: 'Set Up your node',
    3: 'Set up Notifications',
    4: 'Generate Keys',
  };

  const [step, setStep] = useState<number>(1);

  return step === 1 ? (
    <BondStep step={step} title={StepsTitles[step]} setStep={setStep} />
  ) : step === 2 ? (
    <NodeStep step={step} title={StepsTitles[step]} setStep={setStep} />
  ) : step === 3 ? (
    <NotificationsStep
      step={step}
      title={StepsTitles[step]}
      setStep={setStep}
    />
  ) : step === 4 ? (
    <KeysWithdrawalStep
      step={step}
      title={StepsTitles[step]}
      setStep={setStep}
    />
  ) : (
    'Error: Please, reload the page!'
  );
};

export interface StepsProps {
  step: number;
  title: string;
  setStep: Dispatch<SetStateAction<number>>;
}
