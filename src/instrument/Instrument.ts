import * as Tone from "tone";

type Note = Tone.Unit.Note;

enum Drum {
  SNARE,
  BASS,
}

/**
 * Defines a mapping between Notes (i.e. A0, B4, F#5) to mp3 files
 */
interface Instrument {
  getSampleMapping(): Partial<Record<Note, string>>;

  getNoteMapping(): Record<string, Note>;
}

export default Instrument;
export type { Note };
export { Drum };
