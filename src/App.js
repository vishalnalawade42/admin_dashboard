import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Home } from "./components/home/";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
