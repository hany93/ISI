import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Upload, Icon, message, Row, Col, Button } from "antd";
import { editFilePdf } from "../FetchServer";

function getBase64(file, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
}

class Panoramica extends Component {
  state = {
    fileList: []
  };

  handleCustom = ({ onSuccess }) => {
    console.log("?")
    console.log({ onSuccess })

    setTimeout(() => {
      onSuccess("ok");
    }, 0);

    console.log(setTimeout(() => {
      onSuccess("ok");
    }, 0))

  };

  handleOnChange = async info => {
    let status = info.file.status;
    if (status === "done") {
      let fileList = [...info.fileList];
      getBase64(info.file.originFileObj, async fileUrl => {
        let datos = {
          filelist: fileList,
          fileUrl: fileUrl
        };
        //var aa = await editFilePdf(datos);
        //this.setState({ base64Pdf: aa['data'], pageNumber: 1 });
      });
      message.success("El archivo ha sido cargado satisfactoriamente.");
    } else if (status === "error") {
      message.error(`El archivo no ha sido cargado satisfactoriamente..`);
    }
    this.setState({ fileList: [...info.fileList] });
  };

  handleOnRemove = () => { };

  render() {
    const Dragger = Upload.Dragger;
    const { fileList } = this.state;
    return (
      <div>
        <Row>
          <Col span={24}>
            <Dragger
              name= "file"
              accept= "application/pdf"
              onChange= {this.handleOnChange}
              onRemove= {this.handleOnRemove}
              fileList={fileList}
              customRequest={this.handleCustom}
              disabled={fileList.length === 1}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click o Arrastrar el archivo a esta área
              </p>
              <p className="ant-upload-hint">
                Puede seleccionar un solo archivo.
              </p>
            </Dragger>
            <hr />
          </Col>
        </Row>
      </div>
    );
  }
}
export default withRouter(Panoramica);
