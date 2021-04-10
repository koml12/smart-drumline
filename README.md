# Smart Drumline

- The goal of this project is to be a free replacement of Smart Music
  specifically designed for marching drumlines (snare, tenor, and bass drums).
- There is currently no UI yet; the focus is on parsing & playback as of now.
- The project is divided into a few different parts right now:
  - Parsers
  - Audio
  - Playback

## Parsers

-

## Audio

- This project uses ToneJS as the engine for audio playback, with a wrapper layer around it for convenience.
- The `audio` module contains general functions for working with ToneJS, as well as mappings to specific samplers for each supported instrument.
- For example, a snare drum has only one pitch, but a bass drum section has 5+ pitches. There need to be different mappings for each instrument then.
- One important note is that ToneJS loads sample files over the network. The `SamplerService` class caches our samplers so we don't have to worry about making a network call every time a note is played.

## Playback

- We use an internal JSON format to represent notes. This format is useful because we don't have to worry about MusicXML concerns such as measures/dynamics.
- A eighth note snare hit for playback is represented as `{ note: "H", value: 2, velocity: 0.5 }`.
  - The "H" denotes the type of note (defined in our snare drum sampler).
  - The `value` property is a positive decimal number that represents how many of the notes are in one beat of `N/4` time signatures. There are 2 eighth notes in one beat, so `value` is 2.
  - The `velocity` attribute is a decimal value in the range `[0, 1]` (inclusive) that represents the volume of the note.
- This mapping is very close to what ToneJS uses to play samples. The only difference is that we translate our `note` attributes to concrete pitches (i.e. C0, A3, G4) that are mapped to the samples that our samplers have defined for the respective sound. For example `"H"` could map to `C0`, which is mapped to the snare drum hit sample.
- Running some basic calculations lets us determine the length of each note in seconds, and we can trigger attacks of other notes after the duration of each note is up. We don't need to deal with note length in this case, since we are dealing with drums which are inherently "short pitched"
