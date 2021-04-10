import { Measure, parseScore, PartList, ScorePart } from "musicxml-interfaces";
import { container, injectable } from "tsyringe";
import { Drum } from "../instrument";
import { ParsedNote } from "../playback/ParsedNote";
import { InstrumentMapper, MappingService } from "./mapping";
import Parser from "./Parser";

@injectable()
class MusicXMLParser implements Parser {
  parse(xml: string): Partial<Record<Drum, ParsedNote[]>> {
    const mappingService = container.resolve(MappingService);

    const score = parseScore(xml);
    console.log(score);
    const software = score.identification.encoding?.softwares?.[0] ?? "";
    const mapper = mappingService.getMapper(software);

    const instrumentIdMap = this.getInstrumentIdMap(score.partList, mapper);
    console.log(instrumentIdMap);

    const partIdMap = this.getPartIdMap(score.partList, mapper);
    console.log(partIdMap);

    console.log(score.measures);

    return this.parseMeasures(score.measures, instrumentIdMap, partIdMap);
  }

  private parseMeasures(
    measures: Measure[],
    instrumentIdMap: Record<string, Drum>,
    partIdMap: Record<string, Record<string, string>>
  ): Partial<Record<Drum, ParsedNote[]>> {
    let result: Partial<Record<Drum, ParsedNote[]>> = {};
    // Initialize result
    for (let id in instrumentIdMap) {
      result[instrumentIdMap[id]] = [];
    }

    measures.forEach((measure) => {
      for (let id in measure.parts) {
        const drum = instrumentIdMap[id];
        const drumParts = partIdMap[drum];

        const notes: ParsedNote[] = measure.parts[id]
          .filter((part) => part._class === "Note" && part.unpitched)
          .map((part) => {
            // console.log(part);
            const noteId = part.instrument.id;
            const note = drumParts[noteId];
            const value = part.timeModification
              ? (((part.timeModification.actualNotes * 1.0) /
                  part.timeModification.normalNotes) *
                  part.noteType.duration) /
                4
              : part.noteType.duration / 4;
            return { note, value };
          });

        console.log(drum, notes);
        result[drum] = result[drum]?.concat(notes) ?? notes;
      }
    });

    console.log(result);
    return result;
  }

  private getInstrumentIdMap(
    partList: PartList,
    mapper: InstrumentMapper
  ): Record<string, Drum> {
    let result: Record<string, Drum> = {};
    const mapping = mapper.getInstrumentMapping();
    for (let i = 0; i < partList.length; i++) {
      const part = partList[i] as ScorePart;
      if (mapping[part.partName.partName]) {
        result[part.id] = mapping[part.partName.partName];
      }
    }
    return result;
  }

  private getPartIdMap(
    partList: PartList,
    mapper: InstrumentMapper
  ): Record<string, Record<string, string>> {
    const instrumentMapping = mapper.getInstrumentMapping();

    // TODO: figure out the typing here
    let result: Record<string, Record<string, string>> = {};

    // For each part
    for (let i = 0; i < partList.length; i++) {
      const part = partList[i] as ScorePart;

      // Translate to drum
      const drum = instrumentMapping[part.partName.partName];

      // Create a blank mapping
      let partMap: Record<string, string> = {};

      // Populate mapping
      const numScoreInstruments = part.scoreInstruments?.length ?? 0;
      const drumPartMapping = mapper.getPartMapping()[drum] ?? {};
      for (let j = 0; j < numScoreInstruments; j++) {
        const scoreInstrument = part.scoreInstruments?.[j];
        const scoreInstrumentName = scoreInstrument?.instrumentName ?? "";
        if (drumPartMapping[scoreInstrumentName]) {
          const scoreInstrumentId = scoreInstrument?.id ?? "";
          partMap[scoreInstrumentId] = drumPartMapping[scoreInstrumentName];
        }
      }

      // Put drum and mapping in result
      result[drum] = partMap;
    }

    return result;
  }
}

export default MusicXMLParser;
