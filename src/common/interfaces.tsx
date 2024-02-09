export interface WorkHistoryInterface {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
}

export interface ExtendedWorkHistoryInterface extends WorkHistoryInterface {
  duration: number;
}

export interface CandidateInterface {
  firstName: string;
  lastName: string;
  location: string;
  workHistory: WorkHistoryInterface[];
}
