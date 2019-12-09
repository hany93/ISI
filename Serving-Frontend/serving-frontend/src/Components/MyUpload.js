import React from "react";
import { Tabs } from "antd";
import Inicio from "./Inicio";
import Panoramica from "./Panoramica";
import Carousel from "./Carousels";
import Documento from "./Documento";
import Visible from "react-visible";
import { verCarousel } from "../FetchServer";
import VisibilityIcon from '@material-ui/icons/Visibility';
import PanoramaHorizontalIcon from '@material-ui/icons/PanoramaHorizontal';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import DescriptionIcon from '@material-ui/icons/Description';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Button } from "react-materialize";

const TabPane = Tabs.TabPane;

export default function MyUpload() {
  const [titulo, setTitulo] = React.useState("");
  const [disabledTabs, setDisabledTabs] = React.useState(false);
  const [buttonVerPdf, setButtonVerPdf] = React.useState(false);
  const [buttonVerCarousel, setButtonVerCarousel] = React.useState(false);

  const handleClickVer = () => {
    //console.log(titulo)
    const a = {
      titulo: titulo
    };
    verCarousel(a);
  };

  // useEffect(() => {
  //   console.log(titulo)
  // }, [titulo]);

  const buttons = () => {
    return (<div>
      <Visible isVisible={buttonVerCarousel}>
        <Button
          className="red"
          floating
          icon={<PanoramaHorizontalIcon fontSize='default' style={{ color: '#fff', marginTop: 10 }} />}
          node="button"
        />
      </Visible>
      <Visible isVisible={buttonVerCarousel}>
        <Button
          className="green"
          floating
          onClick={handleClickVer}
          style={{ marginLeft: '8px' }}
          icon={<ViewCarouselIcon fontSize='default' style={{ color: '#fff', marginTop: 10 }} />}
          node="button"
        />
      </Visible>
      <Visible isVisible={buttonVerPdf}>
        <Button
          className="blue"
          floating
          style={{ marginLeft: '8px' }}
          icon={<DescriptionIcon fontSize='default' style={{ color: '#fff', marginTop: 10 }} />}
          node="button"
        />
      </Visible>
    </div>)
  }
  return (
    <div className="clearfix">
      <Inicio setTitulo={setTitulo} setDisabledTabs={setDisabledTabs} setButtonVerCarousel={setButtonVerCarousel} setButtonVerPdf={setButtonVerPdf} />
      <Visible isVisible={disabledTabs}>
        <Tabs size="large">
          <TabPane tab="Panorámica" key={1}>
            <Panoramica />
          </TabPane>
          <TabPane tab="Carousel" key={2}>
            <Carousel titulo={titulo} setButtonVerCarousel={setButtonVerCarousel} />
          </TabPane>
          <TabPane tab="Documento" key={3}>
            <Documento />
          </TabPane>
        </Tabs>
      </Visible>
      <Visible isVisible={buttonVerCarousel || buttonVerPdf}>
        <Button
          type="primary"
          fab={{
            direction: 'left'
          }}
          waves='light'
          floating
          large
          node="button"
          icon={<VisibilityIcon fontSize='large' style={{ color: '#fff', marginTop: 10 }} />}
        >
          {buttons()}
        </Button>
      </Visible>
      {/* <div className="fixed-action-btn horizontal">
        <a className="btn-floating btn-large green darken-1">
          <i className="large material-icons">mode_edit</i>
        </a>
        <ul>
          <li><a className="btn-floating  purple lighten-3"><i className="material-icons">format_align_left</i></a></li>
          <li><a className="btn-floating pink lighten-1"><i className="material-icons">format_align_right</i></a></li>
          <li><a className="btn-floating deep-purple lighten-1"><i className="material-icons">format_align_center</i></a></li>
          <li><a className="btn-floating blue lighten-1"><i className="material-icons">format_align_justify</i></a></li>
        </ul>
      </div> */}
      {/*<Button type="primary" shape="circle" icon="eye"  style={{ position: 'absolute', bottom: 0, right: 0, margin: 30, width: 50, height: 50 }} />*/}
    </div>
  );
}
