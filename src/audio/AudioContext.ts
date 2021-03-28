import * as Tone from "tone";
import { injectable } from "tsyringe";

@injectable()
class AudioContext {
    isStarted: boolean;

    constructor() {
        this.isStarted = false;
    }

    async start() {
        if (!this.isStarted) {
            await Tone.start();
        }
    }
}

export default AudioContext;