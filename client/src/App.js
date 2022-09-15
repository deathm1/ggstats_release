import { useState, useEffect } from "react";
import MasterInterface from "./Components/MasterInterface/MasterInterface";

function App() {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  });

  const setResponsiveness = () => {
    if (window.innerWidth <= 900) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  return <MasterInterface is_mobile={isMobile} />;
}

export default App;
