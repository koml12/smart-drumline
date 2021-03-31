import { Drum } from "../instrument";
import { ParsedNote } from "../playback/ParsedNote";

interface Parser {
  parse(xml: string): Partial<Record<Drum, ParsedNote[]>>;
}

export default Parser;
