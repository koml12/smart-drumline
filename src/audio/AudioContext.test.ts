import { container } from "tsyringe";
import AudioContext from "./AudioContext";

describe("AudioContext", () => {
  let audioContext: AudioContext;

  beforeEach(() => {
    audioContext = container.resolve(AudioContext);
  });

  it("should initialize as not started", () => {
    expect(audioContext.isStarted).toBeFalsy();
  });

  describe("start", () => {
    it("should start up audio context", async () => {
      await audioContext.start();
      expect(audioContext.isStarted).toBeTruthy();
    });
  });
});
