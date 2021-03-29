import { container, singleton } from "tsyringe";
import * as Tone from "tone";
import Sampler from "./Sampler";
import {
  BassDrum,
  Drum,
  Instrument,
  Metronome,
  SnareDrum,
} from "../instrument";

@singleton()
class SamplerService {
  samplers: Partial<Record<Drum, Sampler>> = {};

  getAllSamplers() {
    return this.samplers;
  }

  async initializeSamplers() {
    await this.getSampler("BASS");
    await this.getSampler("METRONOME");
    await this.getSampler("SNARE");
  }

  async getSampler(drum: Drum): Promise<Sampler | undefined> {
    if (this.samplers[drum]) {
      console.log("cached sampler");
      return Promise.resolve(this.samplers[drum]);
    }

    console.log("creating new sampler");

    let instrument: Instrument;
    if (drum === "SNARE") {
      instrument = container.resolve(SnareDrum);
    } else if (drum === "BASS") {
      instrument = container.resolve(BassDrum);
    } else if (drum === "METRONOME") {
      instrument = container.resolve(Metronome);
    } else {
      instrument = container.resolve(Metronome);
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
