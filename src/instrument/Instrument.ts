import * as Tone from "tone";

type Note = Tone.Unit.Note;

/**
 * Defines a mapping between Notes (i.e. A0, B4, F#5) to mp3 files
 */
interface Instrument {
  getNoteMapping(): Partial<Record<Note, string>>;
}

export default Instrument;
export type { Note };
