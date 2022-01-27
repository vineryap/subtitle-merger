import { Subtitle } from "./Subtitle";
import { ParsedSubtitle } from "./types";
import {
  parseText,
  isIntervalslOverlap,
  sortSubtitleSection,
  joinSubtitleSections,
} from "./utils";

export function merge(subtitleTextOne: string, SubtitleTextTwo: string) {
  if (subtitleTextOne && SubtitleTextTwo) {
    const fileOneSections = parseText(subtitleTextOne);
    const fileTwoSections = parseText(SubtitleTextTwo);

    if (fileOneSections && fileTwoSections) {
      let mergedSections: ParsedSubtitle[] = [];
      const appendedIndex: number[] = [];

      for (let index = 0; index < fileOneSections.length; index++) {
        let isFileOneOverlap = false;
        const fileOneSection = fileOneSections[index];

        for (let i = 0; i < fileTwoSections.length; i++) {
          const fileTwoSection = fileTwoSections[i];

          if (
            isIntervalslOverlap(
              fileOneSection.timestamp,
              fileTwoSection.timestamp
            )
          ) {
            const text =
              fileOneSection.text.replace("\n\n", "\n") + fileTwoSection.text;
            mergedSections.push({
              timestamp: fileOneSection.timestamp,
              text,
            });
            appendedIndex.push(i);
            isFileOneOverlap = true;
            break;
          }
        }
        if (!isFileOneOverlap) {
          isFileOneOverlap = false;
          mergedSections.push(fileOneSection);
        }
      }

      mergedSections = sortSubtitleSection(
        mergedSections.concat(
          fileTwoSections.filter((_s, i) => !appendedIndex.includes(i))
        )
      );
      return new Subtitle(joinSubtitleSections(mergedSections));
    }
  }
  return null;
}
