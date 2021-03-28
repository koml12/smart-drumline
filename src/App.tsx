import React, { useEffect } from 'react';
import { container } from 'tsyringe';
import { AudioContext, Sampler } from './audio';

function App() {
  const sampler = container.resolve(Sampler);

  useEffect(() => {
    const setUpAudio = async () => {
      const audioContext = container.resolve(AudioContext);
      await audioContext.start();
    }
    setUpAudio();
  }, []);

  const handleClick = () => {
    sampler.playNote("C4");
  }

  return (
    <div className="App">
      <p>Hello world</p>
      <button onClick={handleClick}>Play something!</button>
    </div>
  );
}

export default App;
