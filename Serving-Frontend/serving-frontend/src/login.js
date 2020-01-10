import React, { useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col, Divider, Typography, message } from 'antd';
//import { makeStyles } from '@material-ui/core/styles';
import './login.css';
import Isi from './assets/images/reactlogo.png';
import { userLog, getById } from "./FetchServer";
import { withRouter } from "react-router-dom";

// const useStyles = makeStyles(theme => ({
//     root: {
//         '& .MuiTextField-root': {
//             margin: theme.spacing(1),
//             width: 200,
//         }
//     },
// }));

export default withRouter(Form.create({ name: "Login_form" })(function Login(props) {

    //const classes = useStyles();

    //const [dataInfoBasic, setDataInfoBasic] = React.useState({ nombre: '', apellidos: '', ci: '', direccion: '', municipio: 'Mariel', provincia: 'Artemisa' });

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     props.handleSaveDataInfo(dataInfoBasic);
    // };
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    //const [error, setError] = React.useState('');

    // const dismissError = () => {
    //     setError('');
    // };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.form.validateFields(async (err, values) => {
            //console.log(values)
            if (!err) {
                //console.log('Received values of form: ', values);
                var data = {
                    usuario: values.username,
                    contrasenna: values.password
                };
                var token = await userLog(data);
                //console.log(token)
                if (token.data === 'nook') {
                    message.config({
                        top: 100
                    });
                    message.error('Usuario o contraseña incorrectos');
                } else {
                    localStorage.setItem('token', JSON.stringify(token.data));
                    localStorage.setItem('usuario', values.username);
                    var data = {
                        usuario: values.username,
                        contrasenna: values.password
                    };
                    var id = await getById(data)
                    //console.log(id.data.id)
                    localStorage.setItem('id', id.data.id);
                    props.history.push('/Inicio');
                }
            }
        });
        // if (!username) {
        //     return setError('Username is required');
        // }

        // if (!password) {
        //     return setError('Password is required');
        // }

        // return setError('');
    };

    // const handleUserChange = (evt) => {
    //     setUsername(evt.target.value);
    // };

    // const handlePassChange = (evt) => {
    //     setPassword(evt.target.value);
    // };
    const handleChange = (event) => {
        switch (event.target.name) {
            case 'username':
                setUsername(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        function asyncrona() {
            if (localStorage.getItem('token')) {
                return props.history.push('/Inicio');
            }
        }
        asyncrona()
    }, []);

    const { getFieldDecorator } = props.form;
    const { Title } = Typography;

    return (
        <Row>
            <Col span={9}></Col>
            <Col span={6}>
                <Form onSubmit={handleSubmit} className="login-form">
                    <Title level={4} style={{ textAlign: 'center' }}><img src={Isi} alt='Icono'/></Title>
                    <Divider />
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Por favor entre su usuario!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Usuario"
                                onChange={handleChange}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Por favor entre su contraseña!' }],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Contraseña"
                                onChange={handleChange}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(<Checkbox>Recordar</Checkbox>)}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Entrar
                        </Button>
                    </Form.Item>
                    {/* <form className={classes.root} action="/" method="POST" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {
                    error &&
                    <p data-test="error" onClick={dismissError} className={classes.pError} >
                         <IconButton aria-label="delete" className={classes.margin} size="small" onClick={dismissError}>
                            <CancelRoundedIcon fontSize="inherit" />
                        </IconButton> 
                        <Button type="danger" shape="circle" icon="close" size='small' className={classes.buttonError} />
                        {error}
                    </p>
                }
                <label>UserName</label>
                <input type="text" data-test="username" name='username' value={username} onChange={handleChange} />

                <label>Password</label>
                <input type="password" data-test="password" name='password' value={password} onChange={handleChange} />

                <input type="submit" value="Log In" data-test="submit" />
                 <div>
                    <TextField id="standard-basic" name='nombre' label="Nombre" value={dataInfoBasic.nombre} onChange={handleChange} style={{ width: '50%' }} />
                </div>
                <div>
                    <TextField id="standard-basic" name='direccion' label="Dirección" value={dataInfoBasic.direccion} onChange={handleChange} style={{ width: '50%' }} />
                </div>
                <Button variant="contained" color="primary" type='submit'>
                    Login
                </Button> 
            </form> */}
                </Form>
            </Col>
            <Col span={9}></Col>
        </Row>
    );
}))
