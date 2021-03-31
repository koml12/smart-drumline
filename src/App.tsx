import React, { useEffect, useRef } from "react";
import { container } from "tsyringe";
import { AudioContext, SamplerService } from "./audio";
import { SequencerService } from "./playback";
import hiLow from "./examples/HiLow";
import hb from "./examples/HB17";
import adSnare from "./examples/AD/snare";
import adBass from "./examples/AD/bass";
import xml from "./examples/Test_Score.musicxml";
import MusicXMLParser from "./parser/MusicXMLParser";
import axios from "axios";

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

  const handleADClick = async () => {
    await sequencerService.play({ SNARE: adSnare, BASS: adBass }, 184, true);
  };

  const parseXML = async () => {
    const xmlParser = container.resolve(MusicXMLParser);
    const response = await axios.get(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
    await sequencerService.play(xmlParser.parse(response.data), 160, true);
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
      <button onClick={async () => await handleADClick()}>Play AD</button>
      <button onClick={async () => await parseXML()}>Play XML file</button>
    </div>
  );
}

export default App;
