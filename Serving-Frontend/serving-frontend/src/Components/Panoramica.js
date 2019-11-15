import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Upload, Icon, message, Row, Col, Button } from "antd";
import { sendPanoXML } from "../FetchServer";

function getBase64(file, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
}

class Panoramica extends Component {
  state = {
    fileList: [],
    file: ''
  };

  handleCustom = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  handleOnChange = async info => {

    if (info["fileList"].length) {
      var auxFileList = []
      auxFileList.push(info["fileList"][info["fileList"].length - 1])
      info["fileList"] = auxFileList;
    }

    let status = info.file.status;
    if (status === "done") {
      let fileList = [...info.fileList];
      getBase64(info.file.originFileObj, async fileUrl => {
        let datos = {
          filelist: fileList,
          fileUrl: fileUrl
        };
        var aa = await sendPanoXML(datos);
        this.setState({ base64Pdf: aa['data'], pageNumber: 1 });
        console.log(aa)
      });
      message.success("El archivo ha sido cargado satisfactoriamente.");
    } else if (status === "error") {
      message.error(`El archivo no ha sido cargado satisfactoriamente..`);
    }
    this.setState({ fileList: [...info.fileList] });
    this.setState({ file: info.file });
    //console.log(this.state.file)
  };

  handleOnRemove = () => {
  };

  render() {
    const { Dragger } = Upload;
    const { fileList } = this.state;
    return (
      <div>
        <Row>
          <Col span={24}>
            <Dragger
              name="file"
              accept=".xml"
              onChange={this.handleOnChange}
              onRemove={this.handleOnRemove}
              fileList={fileList}
              customRequest={this.handleCustom}
              //disabled={fileList.length === 5}
              showUploadList={{ showPreviewIcon: false, showDownloadIcon: false, showRemoveIcon: true }}
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
