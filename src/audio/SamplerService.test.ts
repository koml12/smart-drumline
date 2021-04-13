import { container } from "tsyringe";
import * as Tone from "tone";
import { Sampler, SamplerService } from ".";

describe("SamplerService", () => {
  let samplerService: SamplerService;
  let mockToneSampler = {};

  beforeEach(() => {
    SamplerService.prototype.createSampler = (instrument, drum) =>
      Promise.resolve(
        new Sampler((mockToneSampler as unknown) as Tone.Sampler, instrument)
      );
    samplerService = container.resolve(SamplerService);
  });

  describe("getAllSamplers", () => {
    it("should return empty on initialization", () => {
      const samplers = samplerService.getAllSamplers();
      expect(Object.keys(samplers)).toHaveLength(0);
    });
  });

  describe("initializeSamplers", () => {
    it("should do stuff", async () => {
      await samplerService.initializeSamplers();
      const samplers = samplerService.getAllSamplers();
      expect(Object.keys(samplers).length).toBeGreaterThan(0);
    });
  });
});
