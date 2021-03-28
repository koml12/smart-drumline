import Instrument, { Note } from "./Instrument";

import G0 from "../audio/samples/bass/1_hit_1.mp3";
import E0 from "../audio/samples/bass/2_hit_1.mp3";
import C0 from "../audio/samples/bass/3_hit_1.mp3";
import A0 from "../audio/samples/bass/4_hit_1.mp3";
import F0 from "../audio/samples/bass/5_hit_1.mp3";
import B0 from "../audio/samples/bass/6_hit_1.mp3";
import { injectable } from "tsyringe";

@injectable()
class BassDrum implements Instrument {
  getSampleMapping(): Partial<Record<Note, string>> {
    return {
      G0,
      E0,
      C0,
      A0,
      F0,
      B0,
    };
  }

  getNoteMapping(): Record<string, Note> {
    return {
      "1": "G0",
      "2": "E0",
      "3": "C0",
      "4": "A0",
      "5": "F0",
      U: "B0",
    };
  }
}

export default BassDrum;
