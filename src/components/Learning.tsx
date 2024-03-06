import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAudio, translateWords } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getWordSuccess,
  getWordsFail,
  getWordsRequest,
} from "../redux/slices";
import Loader from "./Loader";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const params = useSearchParams()[0].get("language") as langType; // type assertion used  // yaha [0] ka matlab hai ki hum iss hook ka 0th index access kar rhe hai jo ki uska params store karta hai and .get method ki madad se hum usme bheje gaye parameter ko access karenge jo ki language ke variable me ayega // type assertion isliye use kiye taki jo v parameter aye wo uss langType ke jaisa hi ho
  // console.log(params);
  const dispatch = useDispatch();
  const { loading, error, words } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const [audioSrc, setAudioSrc] = useState<string>("");
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(params || "hi")
      .then((arr) => {
        dispatch(getWordSuccess(arr));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getWordsFail(err));
      });

    if (error) {
      alert(error);
      dispatch(clearState());
    }
  }, []);

  

  // const speakHandler = (): void => {
  //   // the below thing is only for english language not for all language so we will use and an Api for text to speech output
  //   // const  speech= new SpeechSynthesisUtterance;
  //   // let word = words[count].meaning;
  //   // speech.text = word;
  //   // speech.voice = speechSynthesis.getVoices()[6];
  //   // speechSynthesis.speak(speech);
  // };

  const playAudioHandler = async () => {
    const player: HTMLAudioElement = audioRef.current!;

    if (player) {
      player.play();
    } else {
      const data = await fetchAudio(words[count]?.meaning, params);

      setAudioSrc(data);
    }
  };

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
    setAudioSrc("")
  };

  if (loading) return <Loader />;

  return (
    <Container maxWidth={"sm"} sx={{ padding: "1rem" }}>
      {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>}

      <Button
        onClick={
          count === 0 ? () => navigate("/") : () => setCount((prev) => prev - 1)
        }
      >
        <ArrowBack />
      </Button>
      <Typography m={"2rem 0"}>Learning Made Easy</Typography>
      <Stack direction={"row"} spacing={"1rem"}>
        <Typography variant="h4">
          {count + 1} - {words[count]?.word}
        </Typography>
        <Typography color={"#ffa726"} variant="h4">
          : {words[count]?.meaning}
        </Typography>
        <Button sx={{ borderRadius: "50%" }} onClick={playAudioHandler}>
          <VolumeUp />
        </Button>
      </Stack>
      <Button
        fullWidth
        variant="contained"
        sx={{ margin: "3rem 0" }}
        onClick={
          count === words.length - 1 ? () => navigate("/quize") : nextHandler
        }
      >
        {count === words.length - 1 ? "Test" : "Next"}
      </Button>
    </Container>
  );
};

export default Learning;
