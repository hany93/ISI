import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Select, Button, Form, Modal } from "antd";
import { getAll } from "../FetchServer";
import { GlobalStyleSelect } from "./Styles";
import CheckboxInicio from "./CheckboxInicio";
const { Option } = Select;

class Inicio extends Component {
  state = {
    List: [],
    buttonVisible: false
  };

  async componentDidMount() {
    var aux = await getAll();
    console.log(aux["data"]);
    this.setState({
      List: aux["data"]
    });
  }

  handleOnChange = value => {
    if (value !== "Ninguno") {
      this.props.change(value, true);
    } else {
      this.props.change(value, false);
    }
  };

  handleOnClickInicio = () => this.setState({ buttonVisible: true });

  handleOnClickCancelInicio = () => this.setState({ buttonVisible: false });
  handleOk = e => {
    console.log(e);
    this.setState({ buttonVisible: false });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { List, buttonVisible } = this.state;

    return (
      <Form layout="inline" className="login-form">
        <Form.Item label="Seleccione la Obra">
          {getFieldDecorator("titulo", {
            rules: [
              {
                required: true,
                message: "Por favor entre el Título de la Obra."
              }
            ]
          })(
            <GlobalStyleSelect>
              <Select defaultValue="Ninguno" onChange={this.handleOnChange} style={{ width: '100%' }}>
                <Option title="Ninguno" value="Ninguno">
                  Ninguno
                </Option>
                {List.map(function(item, i) {
                  //console.log("item");
                  const a = (
                    <Option key={i} title={item.Obra} value={item.Obra}>
                      {item.Obra}
                    </Option>
                  );
                  return a;
                })}
              </Select>
            </GlobalStyleSelect>
          )}
        </Form.Item>
        <Form.Item>
          <Button
            style={{ float: "right" }}
            title="Código del Carousel"
            type="primary"
            icon="upload"
            onClick={this.handleOnClickInicio}
          >
            Crear
          </Button>
          <Modal
            title="Seleccione los datos a enviar:"
            onOk={this.handleOk}
            visible={buttonVisible}
            onCancel={this.handleOnClickCancelInicio}
            width={400}
            okText="Aceptar"
            cancelText="Cancelar"
          >
            <CheckboxInicio />
          </Modal>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedInicioForm = Form.create({ name: "Inicio_form" })(Inicio);

export default withRouter(WrappedInicioForm);
