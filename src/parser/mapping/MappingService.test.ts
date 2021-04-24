import { container } from "tsyringe";
import FinaleMapper from "./FinaleMapper";
import MappingService from "./MappingService";
import MuseScoreMapper from "./MuseScoreMapper";
import SibeliusMapper from "./SibeliusMapper";

describe("MappingService", () => {
  let mappingService: MappingService;

  beforeEach(() => {
    mappingService = container.resolve(MappingService);
  });

  it("should initialize with mappings", () => {
    expect(
      mappingService.instrumentMappings[MappingService.MUSESCORE]
    ).toBeInstanceOf(MuseScoreMapper);

    expect(
      mappingService.instrumentMappings[MappingService.FINALE]
    ).toBeInstanceOf(FinaleMapper);

    expect(
      mappingService.instrumentMappings[MappingService.SIBELIUS]
    ).toBeInstanceOf(SibeliusMapper);
  });

  describe("getMapper", () => {
    it("should return MuseScoreMapper if string starts with 'MuseScore'", () => {
      const software = "MuseScoreSoftware";
      expect(mappingService.getMapper(software)).toBeInstanceOf(
        MuseScoreMapper
      );
    });

    it("should return FinaleMapper if string starts with 'Finale'", () => {
      const software = "FinaleSoftware";
      expect(mappingService.getMapper(software)).toBeInstanceOf(FinaleMapper);
    });

    it("should return SibeliusMapper if string starts with 'Sibelius'", () => {
      const software = "SibeliusSoftware";
      expect(mappingService.getMapper(software)).toBeInstanceOf(SibeliusMapper);
    });

    it("should return MuseScoreMapper by default", () => {
      const software = "UnrecognizedSoftware";
      expect(mappingService.getMapper(software)).toBeInstanceOf(
        MuseScoreMapper
      );
    });
  });
});
