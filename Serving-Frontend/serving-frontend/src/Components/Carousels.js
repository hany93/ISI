import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import locale from "antd/lib/date-picker/locale/es_ES";
import "moment/locale/es";
import {
  Input,
  Upload,
  Modal,
  Row,
  Col,
  Button,
  DatePicker,
  Form,
  Icon,
  Message
} from "antd";
import { leer, editFile } from "../FetchServer";
import { Date } from "core-js";

class Carousels extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewImageName: "",
    fileList: [],
    arrayFotos: [],
    codCarousel: `<div> </div>`,
    html: "",
    buttonVisible: false,
    icon: "eye",
    TitObra: ""
  };

  fecha = () => {
    return new Date().now();
  };

  handleOnClick = () =>
    this.setState({ icon: "eye-invisible", buttonVisible: true });

  handleOnClickCancel = () =>
    this.setState({ buttonVisible: false, icon: "eye" });

  handleSubmit = async e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      var a = values["file"];
      this.setState({
        TitObra: this.props.titulo
      });
      if (!err) {
        if (a.fileList && a.fileList.length > 0) {
          const values1 = {
            titulo: this.props.titulo,
            date: values["date"].format("LL")
          };
          var datos = {
            datosform: values1,
            filelist: this.state.fileList
          };
          var array = await editFile(datos); //modifica el iundex.html y copia las fotos hacia Documento/images
          let t = {
            TitObra: this.state.TitObra
          };
          var aux = await leer(t);
          this.setState({
            html: aux["data"],
            codCarousel: array["data"]["textC"],
            arrayFotos: array["data"]["datosC"]
          });
          Message.config({top:80});
          Message.success("Proceso realizado satisfactoriamente.");
        } else {
          Message.config({top:80});
          Message.error("Debe selecionar las imagenes.");
        }
      }else {
        Message.config({top:80});
        Message.error("Debe introducir los datos.");
      }
    });
    this.props.form.resetFields();
    this.setState({ fileList: [] });
  };

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
      previewImageName: file.nombrefoto ? file.nombrefoto + ".jpg" : file.name
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  handleCustom = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePressEnter = e => {
    e.preventDefault();
    var array = this.state.fileList;
    for (let a = 0; a < array.length; a++) {
      var nomb = array[a].nombrefoto
        ? array[a].nombrefoto + ".jpg"
        : array[a].name;
      if (nomb === this.state.previewImageName) {
        var aux = array[a];
        aux["nombrefoto"] = e.target.value;
        this.setState({ previewImageName: e.target.value + ".jpg" });
      }
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Seleccione las imágenes</div>
      </div>
    );
    const {
      previewVisible,
      previewImage,
      previewImageName,
      fileList,
      html,
      codCarousel,
      arrayFotos,
      buttonVisible,
      icon
    } = this.state;
    const { TextArea } = Input;
    return (
      <Row>
        <Col span={24}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="Fecha">
              {getFieldDecorator("date", {
                rules: [
                  { required: true, message: "Por favor entre la fecha." }
                ]
              })(<DatePicker locale={locale} format="LL" />)}
            </Form.Item>
            <Form.Item label="Imágenes">
              {getFieldDecorator("file", {
                rules: [
                  {
                    required: true,
                    message: "Por favor entre la(s) imagen(es)."
                  }
                ]
              })(
                <Upload
                  name="file"
                  accept="image/jpeg"
                  multiple={true}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  customRequest={this.handleCustom}
                >
                  {uploadButton}
                </Upload>
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Aceptar
              </Button>
            </Form.Item>
          </Form>
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <h3>{previewImageName}</h3>
            <hr />
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
            <br />
            <hr />
            <Input
              type="text"
              placeholder={previewImageName}
              allowClear
              onPressEnter={this.handlePressEnter}
            />
          </Modal>
        </Col>
      </Row>
    );
  }
}

const WrappedCarouselsForm = Form.create({ name: "Carousels_form" })(Carousels);

export default withRouter(WrappedCarouselsForm);
