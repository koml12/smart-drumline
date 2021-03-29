import { container, injectable } from "tsyringe";
import { SamplerService } from "../audio";
import { Drum, Metronome } from "../instrument";
import getNoteTimes from "./getNoteTimes";
import { ParsedNote } from "./ParsedNote";

@injectable()
class SequencerService {
  samplerService: SamplerService;
  constructor() {
    this.samplerService = container.resolve(SamplerService);
  }

  async play(
    music: Partial<Record<Drum, ParsedNote[]>>,
    bpm: number,
    useMetronome = false
  ) {
    const samplers = this.samplerService.getAllSamplers();

    const now = samplers.BASS?.sampler.now() ?? 0;

    let maxDuration = 0;

    for (let drum in music) {
      const sampler = samplers[drum as Drum];
      const part = music[drum as Drum] ?? [];
      const times = getNoteTimes(part, bpm);

      let accumulated = 0;
      for (let i = 0; i < part.length; i++) {
        sampler?.playNote(
          part[i].note.split(","),
          now + accumulated,
          part[i].velocity
        );
        accumulated += times[i];
      }
      if (accumulated > maxDuration) {
        maxDuration = accumulated;
      }
    }

    if (useMetronome) {
      const sampler = samplers.METRONOME;
      const secondsPerBeat = 60.0 / bpm;
      let beats = 0;
      while (beats * secondsPerBeat <= maxDuration) {
        sampler?.playNote([Metronome.CLICK], now + beats * secondsPerBeat);
        beats++;
      }
    }
  }
}

export default SequencerService;
