import { container } from "tsyringe";
import FinaleMapper from "./FinaleMapper";

describe("FinaleMapper", () => {
  let mapper: FinaleMapper;

  beforeEach(() => {
    mapper = container.resolve(FinaleMapper);
  });

  describe("getInstrumentMapping", () => {
    it("should throw not implemented error", () => {
      expect(() => {
        mapper.getInstrumentMapping();
      }).toThrow();
    });
  });

  describe("getPartMapping", () => {
    it("should throw not implemented error", () => {
      expect(() => {
        mapper.getPartMapping();
      }).toThrow();
    });
  });
});
