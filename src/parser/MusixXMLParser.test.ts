import { container } from "tsyringe";
import MusicXMLParser from "./MusicXMLParser";

describe("MusicXMLParser", () => {
  describe("parse", () => {
    it("should return empty object", () => {
      const parser = container.resolve(MusicXMLParser);
      expect(parser.parse("")).toEqual({});
    });
  });
});
