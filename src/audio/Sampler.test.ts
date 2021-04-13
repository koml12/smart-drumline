import { Instrument } from "../instrument";
import * as Tone from "tone";
import { Sampler } from ".";

describe("Sampler", () => {
  describe("playNote", () => {
    it("should play the corresponding notes passed in", () => {
      const notes = ["A", "B", "C"];
      const mockTriggerAttackRelease = jest.fn();
      const mockSampler = {
        triggerAttackRelease: mockTriggerAttackRelease,
      };

      const mockInstrument = {
        getNoteMapping: () => {
          return { A: "A4", B: "B4", C: "C4" };
        },
      };

      const sampler = new Sampler(
        (mockSampler as unknown) as Tone.Sampler,
        (mockInstrument as unknown) as Instrument
      );
      sampler.playNote(notes, 0);

      expect(mockTriggerAttackRelease).toHaveBeenCalledTimes(1);
    });
  });
});
