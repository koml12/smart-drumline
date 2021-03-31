import { Drum } from "../../instrument";
import InstrumentMapper from "./InstrumentMapper";

class MuseScoreMapper implements InstrumentMapper {
  getInstrumentMapping(): Record<string, Drum> {
    throw new Error("Method not implemented.");
  }
  getPartMapping(): Record<string, string> {
    throw new Error("Method not implemented.");
  }
}

export default MuseScoreMapper;
