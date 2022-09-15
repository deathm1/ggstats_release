import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography
      sx={{ textAlign: "center" }}
      variant="body2"
      color="text.secondary"
    >
      {"Copyright © "}
      <Link color="inherit" href="https://ggstats.in/">
        ggstats.in
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter(props) {
  return (
    <Box
      sx={{
        py: props.is_mobile ? 9 : 3,
        px: 2,
        mt: "auto",
      }}
    >
      <Container maxWidth="sm">
        <Typography sx={{ textAlign: "center" }}>
          Made with Love &#10084;&#65039; in India &#127470;&#127475; &#128170;
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}
