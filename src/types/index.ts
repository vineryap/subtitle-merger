export interface Timecodes {
  start: number;
  end: number;
  value: string;
}

export interface ParsedSubtitle {
  timestamp: Timecodes;
  text: string;
}
