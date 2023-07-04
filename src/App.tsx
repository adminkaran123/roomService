import { useState } from "react";
import ThemeConfig from "./theme";
import Router from "./routes";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeConfig>
      <Router />
    </ThemeConfig>
  );
}

export default App;
