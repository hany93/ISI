import React from 'react';
import { withRouter } from "react-router-dom";
import MyUpload from "./Components/MyUpload.js";

function App() {
  return (
    <div className="App">
      <MyUpload />
    </div>
  );
}

export default withRouter(App);
