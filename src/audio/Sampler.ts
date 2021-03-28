import * as Tone from "tone";
import { injectable } from "tsyringe";

@injectable()
class Sampler {

    sampler: Tone.Synth;

    constructor() {
        this.sampler = new Tone.Synth().toDestination();
    }

    playNote(note: string) {
        this.sampler.triggerAttackRelease(note, "32n"); 
    }

}

export default Sampler;