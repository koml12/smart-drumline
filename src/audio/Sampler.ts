import * as Tone from "tone";
import { injectable } from "tsyringe";

@injectable()
class Sampler {
  sampler: Tone.Sampler;

  constructor(sampler: Tone.Sampler) {
    this.sampler = sampler;
  }

  playNote(note: string): void {
    this.sampler.triggerAttackRelease(note, "32n");
  }
}

export default Sampler;
