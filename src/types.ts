interface Timecodes {
  start: number;
  end: number;
  value: string;
}

interface ParsedSubtitle {
  timestamp: Timecodes;
  text: string;
}
