export type RiskStatus = 'open' | 'in_review' | 'approved' | 'rejected';

export interface Risk {
  id: number | string;
  title: string;
  status: RiskStatus;
  ownerId?: number;
}
