import { Container } from "@mui/material";
import { Box } from "@mui/system";

export default function About() {
  return (
    <Container>
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 3,

          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>
          <strong>About</strong>
        </h2>

        <p>
          ggStats is a game statistics tool which built by love in India. It
          presents statistics for play duration, most used characters and maps,
          trophies earned, W/L ratio and much mores. It’s a free service to all
          players. ggStats was created with one thought in mind: "There's gotta
          be easier way". One should not waste anymore time entering Games API
          key or importing own data. ggStats is the simplest way to reveal your
          stats - all you need to do is log in with your player name and we get
          game statistics back in seconds.
        </p>

        <p>
          Action packed, deep gameplay and fantastic finishes! We're the gaming
          statistics fanatics that are addicted to crunching numbers. We like to
          provide gamers with an easy way of viewing statistics for their games
          so they can tweet them to keep track of progress with their friends.
        </p>
      </Box>
    </Container>
  );
}
