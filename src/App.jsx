import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import ActivityDetail from "./pages/ActivityDetail.jsx";
import ActivityFeed from "./pages/ActivityFeed.jsx";

import ArchivedCalls from "./pages/ArchivedCalls.jsx";

const App = () => {
  return (
    <div className="container">
      <Header />
      <BrowserRouter>
          <Route path="/" exact>
            <ActivityFeed />
          </Route>
          <Route path="/details">
            <ActivityDetail />
          </Route>
          <Route path="/archived">
            <ArchivedCalls />
          </Route>
        </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
