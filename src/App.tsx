import React, { useEffect, useRef } from "react";
import { container } from "tsyringe";
import { AudioContext, SamplerService } from "./audio";
import { SequencerService } from "./playback";
import hiLow from "./examples/HiLow";
import hb from "./examples/HB17";

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

  const handleHiLowClick = async () => {
    await sequencerService.play({ BASS: hiLow }, 124, true);
  };

  const handleHBClick = async () => {
    await sequencerService.play({ BASS: hb }, 172, true);
  };

  return (
    <div className="App">
      <p>Hello world</p>
      <button onClick={async () => await handleHiLowClick()}>
        Play HiLow Intro
      </button>
      <button onClick={async () => await handleHBClick()}>
        Play HB '17 Bass Feature
      </button>
    </div>
  );
}

export default App;
