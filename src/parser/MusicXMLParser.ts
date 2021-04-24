import { injectable } from "tsyringe";
import { Drum } from "../instrument";
import { ParsedNote } from "../playback/ParsedNote";
import Parser from "./Parser";

@injectable()
class MusicXMLParser implements Parser {
  parse(xml: string): Partial<Record<Drum, ParsedNote[]>> {
    return {};
  }
}

export default MusicXMLParser;
