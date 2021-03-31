import { injectable } from "tsyringe";
import FinaleMapper from "./FinaleMapper";
import InstrumentMapper from "./InstrumentMapper";
import MuseScoreMapper from "./MuseScoreMapper";
import SibeliusMapper from "./SibeliusMapper";

@injectable()
class MappingService {
  static MUSESCORE = "MuseScore";
  static FINALE = "Finale";
  static SIBELIUS = "Sibelius";

  instrumentMappings = {
    [MappingService.MUSESCORE]: new MuseScoreMapper(),
    [MappingService.FINALE]: new FinaleMapper(),
    [MappingService.SIBELIUS]: new SibeliusMapper(),
  };

  getMapper(software: string): InstrumentMapper {
    if (software.startsWith("MuseScore")) {
      return this.instrumentMappings[MappingService.MUSESCORE];
    }
    if (software.startsWith("Finale")) {
      return this.instrumentMappings[MappingService.FINALE];
    }
    if (software.startsWith("Sibelius")) {
      return this.instrumentMappings[MappingService.SIBELIUS];
    }
    return this.instrumentMappings[MappingService.MUSESCORE];
  }
}

export default MappingService;
