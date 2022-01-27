export interface Timestamp {
  start: number;
  end: number;
  value: string;
}

export interface subtitleObject {
  timestamp: Timestamp;
  text: string;
}
