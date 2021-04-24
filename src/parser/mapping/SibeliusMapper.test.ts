import { container } from "tsyringe";
import SibeliusMapper from "./SibeliusMapper";

describe("FinaleMapper", () => {
  let mapper: FinaleMapper;

  beforeEach(() => {
    mapper = container.resolve(SibeliusMapper);
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
