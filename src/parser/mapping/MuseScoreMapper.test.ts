import { container } from "tsyringe";
import MuseScoreMapper from "./MuseScoreMapper";

describe("MuseScoreMapper", () => {
  let mapper: MuseScoreMapper;

  beforeEach(() => {
    mapper = container.resolve(MuseScoreMapper);
  });

  describe("getInstrumentMapping", () => {
    it("should return correct mapping", () => {
      expect(mapper.getInstrumentMapping()).toEqual({
        "MDL Snare Line": "SNARE",
        "MDL Bass Line 5": "BASS",
      });
    });
  });

  describe("getPartMapping", () => {
    it("should return correct mapping", () => {
      expect(mapper.getPartMapping()).toEqual({
        SNARE: {
          Hit: "H",
          "Ping Shot": "P",
        },
        BASS: {
          "Hit Drum 1": "1",
          "Hit Drum 2": "2",
          "Hit Drum 3": "3",
          "Hit Drum 4": "4",
          "Hit Drum 5": "5",
          "Hit Unison": "U",
        },
      });
    });
  });
});
