import Instrument, { Note } from "./Instrument";

import C0 from "../audio/samples/snare/hit_1.mp3";
import D0 from "../audio/samples/snare/ping_shot_1.mp3";

class SnareDrum implements Instrument {
  getSampleMapping(): Partial<Record<Note, string>> {
    return {
      C0,
      D0,
    };
  }
  getNoteMapping(): Record<string, Note> {
    return {
      H: "C0",
      P: "D0",
    };
  }
}

export default SnareDrum;
