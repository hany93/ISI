import React, { useEffect } from "react";
import { Select, Button, Form, Modal, Row, Col, message } from "antd";
import { getAll, existObra, generateDocx } from "../FetchServer";
import CheckboxInicio from "./CheckboxInicio";
const { Option } = Select;

export default Form.create({ name: "Inicio_form" })(function Inicio(props) {

  const [list, setList] = React.useState([]);
  const [buttonVisible, setButtonVisible] = React.useState(false);

  const handleOnChange = async value => {
    if (value !== "Ninguno") {
      const a = {
        titulo: value
      };
      var result = await existObra(a)
      //console.log(result.data)
      props.setTitulo(value)
      props.setDisabledTabs(true)
      props.setButtonVerCarousel(result.data.carousel)
      props.setButtonVerPdf(result.data.pdf)
      //props.change(result.data.pdf);
    } else {
      props.setTitulo(value)
      props.setDisabledTabs(false)
      props.setButtonVerCarousel(false)
      props.setButtonVerPdf(false)
    }
  };

  const handleOnClickInicio = () => setButtonVisible(true);

  const handleOnClickCancelInicio = () => setButtonVisible(false);
  const handleOk = e => {
    setButtonVisible(false);
  };

  const generateDocx1 = async () => {
    await generateDocx();
    message.config({
      top: 100
    });
    message.success('Archivo creado en: Documentos/Templates/output.docx.')
  }

  useEffect(() => {
    async function asyncrona() {
      var aux = await getAll();
      setList(aux["data"]);
    }
    asyncrona()
  }, []);

  return (
    <div>
      <Row gutter={5}>
        <Col span={3}>
          <h2 style={{ color: '#1DA57A' }}>Seleccione la Obra:</h2>
        </Col>
        <Col span={11}>
          <Select defaultValue="Ninguno" onChange={handleOnChange} style={{ width: '100%' }}>
            <Option title="Ninguno" value="Ninguno">
              Ninguno
            </Option>
            {list.map((item, i) => {
              //console.log("item");
              const a = (
                <Option key={i} title={item.Obra} value={item.Obra}>
                  {item.Obra}
                </Option>
              );
              return a;
            })}
          </Select>
        </Col>
        <Col span={10}>
          <Button
            style={{ float: "left" }}
            title="Código del Carousel"
            type="primary"
            icon="upload"
            onClick={handleOnClickInicio}
          >
            Crear
              </Button>
          <Modal
            title="Seleccione los datos a enviar:"
            onOk={handleOk}
            visible={buttonVisible}
            onCancel={handleOnClickCancelInicio}
            width={400}
            okText="Aceptar"
            cancelText="Cancelar"
          >
            <CheckboxInicio />
          </Modal>
        </Col>
      </Row>
      <Row>
        <Button onClick={generateDocx1}>Generate</Button>
      </Row>
    </div>
  );
});
