import { parseScore } from "musicxml-interfaces";
import { container, injectable } from "tsyringe";
import { Drum } from "../instrument";
import { ParsedNote } from "../playback/ParsedNote";
import { MappingService } from "./mapping";
import Parser from "./Parser";

@injectable()
class MusicXMLParser implements Parser {
  parse(xml: string): Partial<Record<Drum, ParsedNote[]>> {
    const mappingService = container.resolve(MappingService);

    const score = parseScore(xml);
    const software = score.identification.encoding?.softwares?.[0] ?? "";
    const mapper = mappingService.getMapper(software);
    console.log(software);
    console.log(mapper);
    console.log(score);
    return {};
  }
}

export default MusicXMLParser;
