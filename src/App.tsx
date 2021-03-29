import React, { useEffect, useRef } from "react";
import { container } from "tsyringe";
import { AudioContext, SamplerService } from "./audio";
import { SequencerService } from "./playback";
import split from "./examples/HB17";

function App() {
  let sequencerService: SequencerService = useRef(
    container.resolve(SequencerService)
  ).current;

  useEffect(() => {
    const setUpAudio = async () => {
      const audioContext = container.resolve(AudioContext);
      await audioContext.start();
    };
    const setUpSamplers = async () => {
      const samplerService = container.resolve(SamplerService);
      samplerService.initializeSamplers();
    };
    setUpAudio();
    setUpSamplers();
  }, []);

  const handleClick = async () => {
    await sequencerService.play(split, 172, "BASS", true);
  };

  return (
    <div className="App">
      <p>Hello world</p>
      <button onClick={async () => await handleClick()}>Play something!</button>
    </div>
  );
}

export default App;
