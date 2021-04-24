import { container } from "tsyringe";
import { AudioContext } from ".";

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

    it("should do nothing if audio context is already started", async () => {
      audioContext.isStarted = true;
      await audioContext.start();
      expect(audioContext.isStarted).toBeTruthy();
    });
  });
});
