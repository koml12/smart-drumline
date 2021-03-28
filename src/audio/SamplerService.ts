import { container, injectable } from "tsyringe";
import * as Tone from "tone";
import Sampler from "./Sampler";
import { BassDrum, Drum, Instrument } from "../instrument";

@injectable()
class SamplerService {
  samplers: Partial<Record<Drum, Sampler>> = {};

  getSampler(drum: Drum): Promise<Sampler | undefined> {
    if (this.samplers[drum]) {
      return Promise.resolve(this.samplers[drum]);
    }

    let instrument: Instrument;
    if (drum === Drum.BASS) {
      instrument = container.resolve(BassDrum);
    } else {
      instrument = container.resolve(BassDrum);
    }

    return new Promise((resolve) => {
      const sampler = new Tone.Sampler(instrument.getNoteMapping(), () => {
        sampler.debug = true;
        this.samplers[drum] = new Sampler(sampler.toDestination());
        resolve(this.samplers[drum]);
      });
    });
  }
}

export default SamplerService;
