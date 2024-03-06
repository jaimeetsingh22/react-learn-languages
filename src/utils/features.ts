import axios from "axios";
import _ from "lodash";
import { generate } from "random-words";

const generateMcq = (
  meaning: {
    Text: string;
  }[],
  index: number
): string[] => {
  const correctAns: string = meaning[index].Text;
  const allMeaningExceptCorrect = meaning.filter((m) => m.Text !== correctAns);
  const incorrectOptions: string[] = _.sampleSize(
    allMeaningExceptCorrect,
    3
  ).map((i) => i.Text); // ye loadash i.e _.sampleSize ki madad se hum array me se random words le sakte hai and unko suffle karke return kar sakte hai
  const mcqOptions = _.shuffle([...incorrectOptions, correctAns]);

  return mcqOptions;
};
export const translateWords = async (
  params: langType
): Promise<WordType[] | undefined> => {
  try {
    const words = generate(8);
    const wordsArray = Array.isArray(words) ? words : [words];
    const word = wordsArray.map((i) => ({
      Text: i,
    }));
    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate", // url
      word,
      {
        params: {
          "to[0]": params, // language to be translate
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "d1d7c29402msh1f1411f573403edp1ddd0djsnc6e53e57d3b2",
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );

    const recieve: FetchedDataType[] = response.data;

    // console.log(recieve);

    const arr: WordType[] | undefined = recieve.map((i, index) => {
      const options: string[] = generateMcq(word, index);

      return {
        word: word[index].Text,
        meaning: i.translations[0].text,
        option: options,
      };
    });

    return arr;
  } catch (error) {
    console.log(error);

    // throw new Error('error on fetching');
  }
};

export const countMatchingElements = (
  arr1: string[],
  arr2: string[]
): number => {
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must have the same length");
  }
  let matchedCount = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      // jo v element milega to match ka value badha denge
      matchedCount++;
    }
  }

  return matchedCount;
};

export const fetchAudio = async (
  text: string,
  language: langType
): Promise<string> => {

  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true",
  });

  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "fr") encodedParams.set("hl", "fr-fr");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else encodedParams.set("hl", "hi-in");

  const { data } = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: {
        key:'196c1ab5f0b64573a88c9be6f34e3e1b'
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key":'d1d7c29402msh1f1411f573403edp1ddd0djsnc6e53e57d3b2',
        "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
      },
    }
  );

  return data;
};
