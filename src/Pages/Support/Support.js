import { Container, Link } from "@mui/material";
import { Box } from "@mui/system";

export default function Support() {
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
        <h1>
          <strong>Support</strong>
        </h1>
        <p>
          To report any problems / bugs in the application go to gitHub and post
          in the issues section or drop an email at koshurtechno@gmail.com.
        </p>

        <p>
          Thanks<br></br>ggstats
        </p>

        <Link href="https://github.com/deathm1">Github</Link>
      </Box>
    </Container>
  );
}
