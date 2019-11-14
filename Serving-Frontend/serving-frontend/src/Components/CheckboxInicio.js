import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Panorámica", "Carousel", "Documento"];
const defaultCheckedList = ["Panorámica"];

class CheckboxInicio extends Component {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false
  };

  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  };

  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };

  render() {
    return (
      <div>
        <div style={{ borderBottom: "1px solid #E9E9E9" }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Seleccionar todo
          </Checkbox>
        </div>
        <br />
        <br />
        <br />
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
export default withRouter(CheckboxInicio);
