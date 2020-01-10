import React from "react";
import { Form, Icon, Input, Button, Row, Col, Divider, Typography, message, Popconfirm } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { update } from "../FetchServer";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 100
    },
}));

export default withRouter(Form.create({ name: "Cambiar_Contrasena_form" })(function Cambiar_Contrasena(props) {

    const classes = useStyles();
    const [password, setPassword] = React.useState('');
    const [password1, setPassword1] = React.useState('');

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'password':
                setPassword(event.target.value);
                break;
            case 'password1':
                setPassword1(event.target.value);
                break;

            default:
                break;
        }
    };
    const handlesubmitConfirm = (evt) => {
        evt.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                if (values.password === values.password1) {
                    var data = {
                        itemId: localStorage.getItem('id'),
                        password: values.password
                    };
                    var result = await update(data);
                    //console.log(result)
                    if (result.data === 'ok') {
                        message.config({
                            top: 100
                        });
                        message.success('Se ha cambiado la contraseña.')
                        props.form.resetFields();
                    }
                } else {
                    message.config({
                        top: 100
                    });
                    message.warning('No concuerdan las contraseñas.')
                }
            }
        });
    };
    const { getFieldDecorator } = props.form;
    const { Title } = Typography;

    return (
        <Row>
            <Col span={9}></Col>
            <Col span={6}>
                <Form className={classes.root}>
                    <Title level={4} style={{ textAlign: 'left', color: '#757575' }}>Cambiar Contraseña</Title>
                    <Divider />
                    <Form.Item>
                        <Input
                            disabled
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={localStorage.getItem('usuario')}
                        />
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Por favor entre su contraseña!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Contraseña"
                                onChange={handleChange}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password1', {
                            rules: [{ required: true, message: 'Por favor confirme su contraseña!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Confirmar Contraseña"
                                onChange={handleChange}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Popconfirm
                            title="¿Seguro dessea cambiar su contraseña?"
                            onConfirm={handlesubmitConfirm}
                            okText="Aceptar"
                            cancelText="Cancelar"
                        >
                            <Button type="primary" style={{ float: 'right' }}>
                                Cambiar
                            </Button>
                        </Popconfirm>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={9}></Col>
        </Row>
    );
}))
