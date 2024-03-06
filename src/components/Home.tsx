import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const languages = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
];

const Home = () => {

  const navigate = useNavigate();

  const languageSelectHandler = (language: string): void => {
    navigate(`/learn?language=${language}`);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" p={"2rem"} textAlign={"center"}>
        Welcome, Begin your Journey of Learning. Choose a Language to Start!
      </Typography>
      <Stack
        direction={"row"}
        spacing={{ xs: 1, md: 4 }}
        justifyContent="space-evenly"
      >
        {languages.map((i) => (
          <Button
            onClick={() => languageSelectHandler(i.code)}
            key={i.code}
            variant="contained"
          >
            {i.name}
          </Button>
        ))}
      </Stack>
    </Container>
  );
};

export default Home;
