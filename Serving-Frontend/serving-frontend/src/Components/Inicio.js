import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Select, Button, Form, Modal, Row, Col } from "antd";
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
    this.setState({ buttonVisible: false });
  };

  render() {
    const { List, buttonVisible } = this.state;
    return (
      <Row gutter={5}>
        <Col span={3}>
          <h2 style={{color:'#1DA57A'}}>Seleccione la Obra:</h2>
        </Col>
        <Col span={11}>
          <Select defaultValue="Ninguno" onChange={this.handleOnChange} style={{ width: '100%' }}>
            <Option title="Ninguno" value="Ninguno">
              Ninguno
                    </Option>
            {List.map(function (item, i) {
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
        </Col>
      </Row>
    );
  }
}

const WrappedInicioForm = Form.create({ name: "Inicio_form" })(Inicio);

export default withRouter(WrappedInicioForm);
