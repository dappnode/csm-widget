export type Range = 'week' | 'month' | 'year' | 'ever';

export interface ValidatorStats {
  index: number;
  // ATTESTATIONS
  // attestations: { assigned: number; included: number };
  // proposals: number;
  efficiency: number;
}
