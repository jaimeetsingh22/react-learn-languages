import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveResult } from "../redux/slices";

const Quize = () => {
  const [result, setResult] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { words } = useSelector((state: { root: StateType }) => state.root);

  useEffect(() => {
    if(count + 1 > words.length) navigate("/result");
    dispatch(saveResult(result))
  }, [result])
  

  const nextHandler = (): void => {
    setResult((prev) => [...prev, ans]);
    setCount((prev) => prev + 1);
    setAns("");
  };

  return (
    <Container maxWidth="sm" sx={{ padding: "1rem" }}>
      <Typography m={"2rem 0"}>Quize</Typography>
      <Typography variant="h3">
        {count + 1} - {words[count]?.meaning}
      </Typography>
      <FormControl>
        <FormLabel sx={{ mt: "2rem", mb: "1rem" }}>Meaning</FormLabel>
        <RadioGroup
          value={ans}
          onChange={(e: any) => {
            setAns(e.target.value);
          }}
        >
          {words[count]?.option.map((item: string, index: number) => (
            <FormControlLabel
              value={item}
              control={<Radio />}
              label={item}
              key={item}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        fullWidth
        onClick={nextHandler}
        disabled={ans === ""}
      >
        {count === words.length - 1 ? "Submit" : "Next"}
      </Button>
    </Container>
  );
};

export default Quize;
