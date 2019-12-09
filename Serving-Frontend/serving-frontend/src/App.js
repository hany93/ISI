import React from 'react';
import { withRouter } from "react-router-dom";
import Drawer from "./Components/drawer";

function App() {
  return (
    <div className="App">
      <Drawer />
    </div>
  );
}

export default withRouter(App);
