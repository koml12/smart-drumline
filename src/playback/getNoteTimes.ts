import { ParsedNote } from "./ParsedNote";

export default function getNoteTimes(
  music: ParsedNote[],
  bpm: number
): number[] {
  const beatsPerSecond = 60.0 / bpm;
  return music.map((note) => beatsPerSecond / note.value);
}
