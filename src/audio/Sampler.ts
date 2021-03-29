import * as Tone from "tone";
import { injectable } from "tsyringe";
import { Instrument } from "../instrument";

@injectable()
class Sampler {
  sampler: Tone.Sampler;
  instrument: Instrument;

  constructor(sampler: Tone.Sampler, instrument: Instrument) {
    this.sampler = sampler;
    this.instrument = instrument;
  }

  playNote(
    notes: string[],
    time: Tone.Unit.Time,
    velocity?: Tone.Unit.NormalRange
  ): void {
    this.sampler.triggerAttackRelease(
      notes.map((note) => this.instrument.getNoteMapping()[note]),
      "32n",
      time,
      velocity
    );
  }
}

export default Sampler;
