import { container } from "tsyringe";
import { SnareDrum } from ".";

describe("SnareDrum", () => {
  let snareDrum: SnareDrum;

  beforeEach(() => {
    snareDrum = container.resolve(SnareDrum);
  });

  describe("getSampleMapping", () => {
    it("should return 2 samples", () => {
      const sampleMapping = snareDrum.getSampleMapping();
      expect(Object.keys(sampleMapping)).toHaveLength(2);
    });
  });

  describe("getNoteMapping", () => {
    it("should contain mappings for hit and ping shot", () => {
      const noteMapping = snareDrum.getNoteMapping();
      expect(noteMapping["H"]).toBeTruthy();
      expect(noteMapping["P"]).toBeTruthy();
    });
  });
});
