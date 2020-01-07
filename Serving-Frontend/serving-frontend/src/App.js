import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom";
import Drawer from "./Components/drawer";

export default withRouter(function App(props) {

  useEffect(() => {
    function asyncrona() {
      if (!localStorage.getItem('token')) {
        return props.history.push('/');
      }
    }
    asyncrona()
  }, []);
  return (
    <div className="App">
      <Drawer user={localStorage.getItem('usuario')}/>
    </div>
  );
})
