import { container, singleton } from "tsyringe";
import * as Tone from "tone";
import Sampler from "./Sampler";
import { BassDrum, Drum, Instrument } from "../instrument";

@singleton()
class SamplerService {
  samplers: Partial<Record<Drum, Sampler>> = {};

  async initializeSamplers() {
    await this.getSampler("BASS");
  }

  async getSampler(drum: Drum): Promise<Sampler | undefined> {
    if (this.samplers[drum]) {
      console.log("cached sampler");
      return Promise.resolve(this.samplers[drum]);
    }

    console.log("creating new sampler");

    let instrument: Instrument;
    if (drum === "BASS") {
      instrument = container.resolve(BassDrum);
    } else {
      instrument = container.resolve(BassDrum);
    }

    return new Promise((resolve) => {
      const sampler = new Tone.Sampler(instrument.getSampleMapping(), () => {
        this.samplers[drum] = new Sampler(sampler.toDestination(), instrument);
        resolve(this.samplers[drum]);
      });
    });
  }
}

export default SamplerService;
