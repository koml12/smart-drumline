import Instrument, { Note } from "./Instrument";

import D0 from "../audio/samples/misc/metronome_2.mp3";

class Metronome implements Instrument {
  static CLICK = "M";

  getSampleMapping(): Partial<Record<Note, string>> {
    return {
      D0,
    };
  }
  getNoteMapping(): Record<string, Note> {
    return {
      [Metronome.CLICK]: "D0",
    };
  }
}

export default Metronome;
