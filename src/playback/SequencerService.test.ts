import { container } from "tsyringe";
import { SequencerService } from ".";
import { SamplerService } from "../audio";
import { Drum } from "../instrument";
import { ParsedNote } from "./ParsedNote";

describe("SequencerService", () => {
  let sequencerService: SequencerService;
  const playNoteMock = jest.fn();

  beforeEach(() => {
    playNoteMock.mockClear();
    const mockSamplerService = {
      getAllSamplers: function () {
        return {
          BASS: {
            playNote: playNoteMock,
          },
          METRONOME: {
            playNote: playNoteMock,
          },
          SNARE: {
            playNote: playNoteMock,
          },
        };
      },
    };

    container.register<SamplerService>(SamplerService, {
      useValue: (mockSamplerService as unknown) as SamplerService,
    });
    sequencerService = container.resolve(SequencerService);
  });

  describe("play", () => {
    it("should play one time per note", async () => {
      const music = {
        BASS: [
          { note: "1", value: 1 },
          { note: "1", value: 1 },
          { note: "1", value: 1 },
        ],
      };
      const bpm = 60;

      await sequencerService.play(music, bpm);

      expect(playNoteMock).toHaveBeenCalledTimes(3);
    });

    it("should play instruments separately", async () => {
      const music = {
        BASS: [{ note: "1", value: 1 }],
        SNARE: [{ note: "H", value: 1 }],
      };
      const bpm = 60;

      await sequencerService.play(music, bpm);

      expect(playNoteMock).toHaveBeenCalledTimes(2);
    });

    it("should play metronome behind music if useMetronome is true", async () => {
      const music = {
        BASS: [
          { note: "1", value: 1 },
          { note: "1", value: 1 },
          { note: "1", value: 1 },
        ],
      };
      const bpm = 60;

      await sequencerService.play(music, bpm, true);

      expect(playNoteMock).toHaveBeenCalledTimes(7);
    });

    it("should not play anything if part does not exist", async () => {
      const music = {
        INVALID: [
          { note: "1", value: 1 },
          { note: "1", value: 1 },
          { note: "1", value: 1 },
        ],
      };
      const bpm = 60;

      await sequencerService.play(
        (music as unknown) as Partial<Record<Drum, ParsedNote[]>>,
        bpm
      );

      expect(playNoteMock).toHaveBeenCalledTimes(0);
    });
  });
});
