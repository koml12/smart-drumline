import React, { useEffect, useRef } from "react";
import { container } from "tsyringe";
import { AudioContext } from "./audio";
import { Drum } from "./instrument";
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
    setUpAudio();
  }, []);

  const handleClick = async () => {
    await sequencerService.play(split, 172, Drum.BASS);
  };

  return (
    <div className="App">
      <p>Hello world</p>
      <button onClick={async () => await handleClick()}>Play something!</button>
    </div>
  );
}

export default App;
