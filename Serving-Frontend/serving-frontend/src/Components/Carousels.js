import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import locale from "antd/lib/date-picker/locale/es_ES";
import "moment/locale/es";
import { Carousel } from 'antd';
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
          Message.success("Proceso realizado satisfactoriamente.");
        } else {
          Message.error("Debe selecionar las imagenes.");
        }
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
        <Col span={15} push={9}>
          <Row>
            <Col span={15} push={8}>
              <Button
                style={{ float: "right" }}
                title="Código del Carousel"
                shape="circle"
                icon={icon}
                onClick={this.handleOnClick}
              />
              <Modal
                visible={buttonVisible}
                footer={null}
                onCancel={this.handleOnClickCancel}
                width={800}
              >
                <h3>Código del Carousel</h3>
                <hr />
                <TextArea
                  value={html}
                  autosize={{ minRows: 15, maxRows: 25 }}
                  size="large"
                  disabled
                />
              </Modal>
            </Col>
            <Col span={8} pull={15}>
              <h2>Carousel</h2>
            </Col>
          </Row>
          <Row>
            <hr />
          </Row>
          <Row>
            <Carousel autoplay>
              {arrayFotos.map(function (item, i) {
                return <div key={i}><img src={item.thumbUrl} /></div>;
              })}
            </Carousel>
            {/* <div
              id="myCarousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                {arrayFotos.length === 1 ? (
                  <li
                    data-target="#myCarousel"
                    data-slide-to={0}
                    key={0}
                    className="active"
                  />
                ) : (
                    arrayFotos.map(function (item, i) {
                      if (i === 0) {
                        return (
                          <li
                            data-target="#myCarousel"
                            data-slide-to={i}
                            key={i}
                            className="active"
                          />
                        );
                      } else {
                        return (
                          <li
                            data-target="#myCarousel"
                            data-slide-to={i}
                            key={i}
                          />
                        );
                      }
                    })
                  )}
              </ol>
              <div
                className="carousel-inner"
                role="listbox"
                dangerouslySetInnerHTML={{ __html: codCarousel }}
              />
              {arrayFotos.length > 1 ? (
                <div>
                  <a
                    className="left carousel-control"
                    href="#myCarousel"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="glyphicon glyphicon-chevron-left"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Anterior</span>
                  </a>
                  <a
                    className="right carousel-control"
                    href="#myCarousel"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="glyphicon glyphicon-chevron-right"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Siguiente</span>
                  </a>
                </div>
              ) : (
                  <div />
                )}
            </div> */}
          </Row>
        </Col>
        <Col span={8} pull={15}>
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
