import { Button, Container, Link } from "@mui/material";
import { Box } from "@mui/system";

export default function Devloper() {
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
          <strong>Hello all</strong>
        </h2>

        <p>
          I am the man behind project ggStats. I work as a data engineer at a
          reputed firm. With that said, I also know full stack development. The
          end result is this website. Check out my gitHub for more information.
          If you encounter any bugs, go to the support section of this website
          and let me know about it, If I have time I will resolve it.
        </p>

        <p>
          Enjoy!!<br></br>
          <br></br>deathm1,<br></br>ggstats
        </p>

        <Link href="https://github.com/deathm1">Github</Link>
      </Box>
    </Container>
  );
}
