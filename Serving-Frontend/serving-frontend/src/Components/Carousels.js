import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import locale from "antd/lib/date-picker/locale/es_ES";
import "moment/locale/es";
import {
  Upload,
  Row,
  Modal,
  Input,
  Col,
  Button,
  DatePicker,
  Form,
  Icon,
  Message
} from "antd";
import { editFile } from "../FetchServer";
//import { Date } from "core-js";
import styles from "../assets/components/carouselStyle";

const useStyles = makeStyles(styles);
const uploadButton = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Seleccione las imágenes</div>
  </div>
);

export default Form.create({ name: "Carousels_form" })(function Carousels(props) {
  const classes = useStyles();
  const [fileList, setFileList] = React.useState([]);
  //const [titObra, setTitObra] = React.useState("");
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewImageName, setPreviewImageName] = React.useState("");

  // const fecha = () => {
  //   return new Date().now();
  // };

  const handleSubmit = async e => {
    Message.config({ top: 80 });
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      var a = values["file"];
      //setTitObra(props.titulo);
      if (!err) {
        if (a.fileList && a.fileList.length > 0) {
          const values1 = {
            titulo: props.titulo,
            date: values["date"].format("LL")
          };
          var datos = {
            datosform: values1,
            filelist: fileList
          };
          await editFile(datos); //modifica el iundex.html y copia las fotos hacia Documento/images
          // let t = {
          //   TitObra: this.state.TitObra
          // };
          // await leer(t);
          props.form.resetFields();
          setFileList([]);
          props.setButtonVerCarousel(true);
          Message.success("Proceso realizado satisfactoriamente.");
        } else {
          Message.error("Debe selecionar las imagenes.");
        }
      } else {
        Message.error("Debe introducir los datos.");
      }
    });
  };

  const handlePreview = file => {
    setPreviewImage(file.url || file.thumbUrl)
    setPreviewVisible(true)
    setPreviewImageName(file.nombrefoto ? file.nombrefoto + ".jpg" : file.name)
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleCustom = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePressEnter = e => {
    e.preventDefault();
    var array = fileList;
    for (let a = 0; a < array.length; a++) {
      var nomb = array[a].nombrefoto
        ? array[a].nombrefoto + ".jpg"
        : array[a].name;
      if (nomb === previewImageName) {
        var aux = array[a];
        aux["nombrefoto"] = e.target.value;
        setPreviewImageName(e.target.value + ".jpg");
      }
    }
  };
  const { getFieldDecorator } = props.form;

  return (
    <div>
      <Row>
        <Col span={24}>
          <Form onSubmit={handleSubmit} className="login-form">
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
                  onPreview={handlePreview}
                  onChange={handleChange}
                  customRequest={handleCustom}
                  showUploadList={{ showPreviewIcon: true, showDownloadIcon: false, showRemoveIcon: true }}
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
            onCancel={handleCancel}
          >
            <h2>{previewImageName}</h2>
            <hr />
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
            <br />
            <hr />
            <Input
              type="text"
              placeholder={previewImageName}
              allowClear
              onPressEnter={handlePressEnter}
            />
          </Modal>
        </Col>
      </Row>
    </div>
  );
})
