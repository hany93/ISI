import React from 'react';
import { withRouter } from "react-router-dom";
import Drawer from "./Components/Drawer/drawer";

function App() {
  return (
    <div className="App">
      <Drawer />
    </div>
  );
}

export default withRouter(App);
