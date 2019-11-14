import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tabs } from "antd";
import Inicio from "./Inicio";
import Panoramica from "./Panoramica";
import Carousel from "./Carousels";
import Documento from "./Documento";
import Visible from "react-visible";

class MyUpload extends Component {
  state = {
    Titulo: "",
    DisabledTabs: false
  };

  change = (titulo, disabledtabs) => {
    this.setState({ Titulo: titulo, DisabledTabs: disabledtabs });
  };

  render() {
    //console.log(this.props);
    const TabPane = Tabs.TabPane;
    const { Titulo, DisabledTabs } = this.state;
    return (
      <div className="clearfix">
        <Inicio change={this.change} />
        <Visible isVisible={DisabledTabs}>
          <Tabs size="large">
            <TabPane tab="Panorámica" key={1}>
              <Panoramica />
            </TabPane>
            <TabPane tab="Carousel" key={2}>
              <Carousel titulo={Titulo} />
            </TabPane>
            <TabPane tab="Documento" key={3}>
              <Documento />
            </TabPane>
          </Tabs>
        </Visible>
      </div>
    );
  }
}
export default withRouter(MyUpload);
