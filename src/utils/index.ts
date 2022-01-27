import { Timestamp, subtitleObject } from "../types";

const timestampRegex = /(?:(\d{1,}):)?(\d{2}):(\d{2})[,.](\d{3})/;

export function parseTimestampToMs(timestamp: string): number {
  const match = timestamp.match(new RegExp(`^${timestampRegex.source}$`));

  if (!match) throw new Error('Invalid format: "' + timestamp + '"');

  const hours = match[1] ? parseInt(match[1], 10) * 3600000 : 0;
  const minutes = parseInt(match[2], 10) * 60000;
  const seconds = parseInt(match[3], 10) * 1000;
  const milliseconds = parseInt(match[4], 10);

  return hours + minutes + seconds + milliseconds;
}

export function isIntervalslOverlap(
  timestampOne: Timestamp,
  timestampTwo: Timestamp
): boolean {
  return (
    (timestampTwo.start < timestampOne.end &&
      timestampTwo.end > timestampOne.start) ||
    (timestampOne.start < timestampTwo.end &&
      timestampOne.end > timestampTwo.start)
  );
}

export function parseText(text: string | undefined) {
  if (text) {
    const timestampLineRegex = new RegExp(
      timestampRegex.source + " --> " + timestampRegex.source,
      "m"
    );
    const isLastCharNewline = text[text?.length - 1] === "\n";

    if (!isLastCharNewline) text = text?.concat("\n\n");

    const sections = text?.match(
      new RegExp(timestampLineRegex.source + "\n(.*?)\n\n", "gs")
    );

    const parsed: subtitleObject[] | undefined = sections?.map((section) => {
      const timestamp = (
        section.match(timestampLineRegex) as RegExpMatchArray
      )[0];
      const timestamps = timestamp.split(" --> ");
      const text = section.replace(
        new RegExp(timestampLineRegex.source + "\n"),
        ""
      );

      return {
        timestamp: {
          start: parseTimestampToMs(timestamps[0]),
          end: parseTimestampToMs(timestamps[1]),
          value: timestamp,
        },
        text,
      };
    });

    return parsed;
  }
  return null;
}

export function sortSubtitleSection(sections: subtitleObject[]) {
  return sections.sort((a, b) => {
    if (a.timestamp.start < b.timestamp.start) {
      return -1;
    }
    if (a.timestamp.start > b.timestamp.start) {
      return 1;
    }
    return 0;
  });
}

export function joinSubtitleSections(sections: subtitleObject[]) {
  let subtitle = "";
  for (let index = 0; index < sections.length; index++) {
    const { timestamp, text } = sections[index];
    subtitle += `${index + 1}\n${timestamp.value}\n${text}`;
  }
  return subtitle;
}
