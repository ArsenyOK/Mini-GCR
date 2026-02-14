export type TaskStatus = 'open' | 'in_progress' | 'done';

export interface Task {
  id: number;
  riskId: number;
  title: string;
  status: TaskStatus;
  assigneeId?: number;
}
