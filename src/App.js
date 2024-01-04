import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Landing from "./pages/Landing/Landing";
import Search from "./pages/Search/Search";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={
            <div>
              <Landing />
            </div>
          }
        /> */}
        <Route
          path="/"
          element={
            <div>
              <Search />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
