import { container } from "tsyringe";
import { BassDrum } from ".";

describe("BassDrum", () => {
  let bassDrum: BassDrum;

  beforeEach(() => {
    bassDrum = container.resolve(BassDrum);
  });

  describe("getSampleMapping", () => {
    it("should return 6 samples", () => {
      const sampleMapping = bassDrum.getSampleMapping();
      expect(Object.keys(sampleMapping)).toHaveLength(6);
    });
  });

  describe("getNoteMapping", () => {
    it("should contain mappings for drums 1-5 and unison hits", () => {
      const noteMapping = bassDrum.getNoteMapping();
      expect(noteMapping["1"]).toBeTruthy();
      expect(noteMapping["2"]).toBeTruthy();
      expect(noteMapping["3"]).toBeTruthy();
      expect(noteMapping["4"]).toBeTruthy();
      expect(noteMapping["5"]).toBeTruthy();
      expect(noteMapping["U"]).toBeTruthy();
    });
  });
});
