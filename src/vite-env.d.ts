/// <reference types="vite/client" />

type langType = "hi" | "ja" | "es" | "fr";

type WordType = {
  word: string;
  meaning: string;
  option: string[];
};

interface StateType {
  loading: boolean;
  result: string[];
  words: WordType[];
  error?: string;
}

type FetchedDataType = {
  translations: { text: string }[];// array of object  with a 'text' property.
};
