import { Drum } from "../../instrument";
import InstrumentMapper from "./InstrumentMapper";

class MuseScoreMapper implements InstrumentMapper {
  getInstrumentMapping(): Record<string, Drum> {
    return {
      "MDL Snare Line": "SNARE",
      "MDL Bass Line 5": "BASS",
    };
  }

  getPartMapping(): Partial<Record<Drum, Record<string, string>>> {
    return {
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
    };
  }
}

export default MuseScoreMapper;
