import { container } from "tsyringe";
import { Metronome } from ".";

describe("Metronome", () => {
  let metronome: Metronome;

  beforeEach(() => {
    metronome = container.resolve(Metronome);
  });

  describe("getSampleMapping", () => {
    it("should return 1 sample", () => {
      const sampleMapping = metronome.getSampleMapping();
      expect(Object.keys(sampleMapping)).toHaveLength(1);
    });
  });

  describe("getNoteMapping", () => {
    it("should contain mapping for metronome sound", () => {
      const noteMapping = metronome.getNoteMapping();
      expect(noteMapping[Metronome.CLICK]).toBeTruthy();
    });
  });
});
