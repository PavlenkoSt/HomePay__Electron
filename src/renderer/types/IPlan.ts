export interface IPlan {
  id: number
  status: PlanStatusEnum
  title: string
  state: number
  goal: number
  date: {
    from: Date
    to: Date
  }
}

export interface IMonthPlan extends IPlan {}

export enum PlanStatusEnum {
  DONE = 'done',
  IN_PROGRESS = 'in_progress',
  FAILED = 'failed',
  WAITING = 'waiting',
}

export interface IPlanSettings {
  autoCreate: boolean
  sum: number | null
}
