import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { container } from "tsyringe";
import App from "./App";
import { SamplerService } from "./audio";
import MusicXMLParser from "./parser/MusicXMLParser";
import { SequencerService } from "./playback";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("App", () => {
  const playMock = jest.fn();

  beforeEach(() => {
    container.register<SamplerService>(SamplerService, {
      useValue: ({
        initializeSamplers: () => null,
      } as unknown) as SamplerService,
    });

    container.register<SequencerService>(SequencerService, {
      useValue: ({ play: playMock } as unknown) as SequencerService,
    });

    container.register<MusicXMLParser>(MusicXMLParser, {
      useValue: ({
        parse: () => {
          return {};
        },
      } as unknown) as MusicXMLParser,
    });

    mockedAxios.get.mockResolvedValue({ data: {} });
  });

  it("should render App", () => {
    render(<App />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("should play hi low on click", async () => {
    const text = "Play HiLow Intro";
    const { getByText } = render(<App />);

    const button = getByText(text);
    button.click();

    await waitFor(() => expect(playMock).toHaveBeenCalledTimes(1));
  });

  it("should play hb17 on click", async () => {
    const text = "Play HB '17 Bass Feature";
    const { getByText } = render(<App />);

    const button = getByText(text);
    button.click();

    await waitFor(() => expect(playMock).toHaveBeenCalledTimes(1));
  });

  it("should play ad on click", async () => {
    const text = "Play AD";
    const { getByText } = render(<App />);

    const button = getByText(text);
    button.click();

    await waitFor(() => expect(playMock).toHaveBeenCalledTimes(1));
  });

  it("should play xml on click", async () => {
    const text = "Play XML file";
    const { getByText } = render(<App />);

    const button = getByText(text);
    button.click();

    await waitFor(() => expect(playMock).toHaveBeenCalledTimes(1));
  });
});
