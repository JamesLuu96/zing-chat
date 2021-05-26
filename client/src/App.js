import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tab from "./components/Tab.js";
function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route path="/" exact component={Tab} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
