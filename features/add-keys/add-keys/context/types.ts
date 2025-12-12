import {
  BondBalance,
  CurveParameters,
  NodeOperatorId,
  NodeOperatorInfo,
  ShareLimitInfo,
  TOKENS,
} from '@lidofinance/lido-csm-sdk';
import { DepositDataInputType } from 'shared/hook-form/deposit-data';

// DAPPNODE
export interface KeysFile {
  name: string;
  content: { pubkey: string };
}

export type AddKeysFormInputType = {
  token: TOKENS;
  bondAmount?: bigint;
  keystores?: KeysFile[]; //dappnode
  password?: string; //dappnode
} & DepositDataInputType;

export type AddKeysFormNetworkData = {
  ethBalance: bigint;
  stethBalance: bigint;
  wstethBalance: bigint;
  nodeOperatorId: NodeOperatorId;
  curveId: bigint;
  operatorInfo: NodeOperatorInfo;
  curveParameters: CurveParameters;
  bond: BondBalance;
  isPaused: boolean;
  maxStakeEth: bigint;
  shareLimit: ShareLimitInfo;
  // keysAvailable: KeysAvailable;
};
