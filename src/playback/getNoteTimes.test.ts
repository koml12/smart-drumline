import getNoteTimes from "./getNoteTimes";
import { ParsedNote } from "./ParsedNote";

describe("getNoteTimes", () => {
  it("should do stuff", () => {
    const bpm = 60;
    const notes: ParsedNote[] = [
      { note: "1", value: 2 },
      { note: "2", value: 2 },
      { note: "3", value: 2 },
    ];
    const times = getNoteTimes(notes, bpm);
    expect(times).toEqual([0.5, 0.5, 0.5]);
  });
});
