/*
 * Overall steps:
 * On startup, initialize constant mappings from display names -> parts
 * When parsing:
 *     Infer which mappings to use based on score metadata
 *     Construct mapping from instrument IDs to instruments
 *     Construct mapping from part IDs to parts
 *     Using the mappings, iterate through measures to construct ParsedNote[] representations of the music
 *
 */

import { Drum } from "../../instrument";

interface InstrumentMapper {
  getInstrumentMapping(): Record<string, Drum>;

  getPartMapping(): Record<string, string>;
}

export default InstrumentMapper;
