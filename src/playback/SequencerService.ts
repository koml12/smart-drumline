import { container, injectable } from "tsyringe";
import { SamplerService } from "../audio";
import { Drum } from "../instrument";
import getNoteTimes from "./getNoteTimes";
import { ParsedNote } from "./ParsedNote";

@injectable()
class SequencerService {
  samplerService: SamplerService;
  constructor() {
    this.samplerService = container.resolve(SamplerService);
  }

  async play(music: ParsedNote[], bpm: number, drum: Drum) {
    const sampler = await this.samplerService.getSampler(drum);

    const times = getNoteTimes(music, bpm);

    const now = sampler?.sampler.now() ? sampler?.sampler.now() : 0;
    let accumulated = 0;
    for (let i = 0; i < music.length; i++) {
      sampler?.playNote(music[i].note, now + accumulated, music[i].velocity);
      accumulated += times[i];
    }
  }
}

export default SequencerService;
