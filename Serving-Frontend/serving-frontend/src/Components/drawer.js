import React from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from "classnames";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MyUpload from './MyUpload';
import Cambiar_Contrasena from './Cambiar_Contrasena';
import logo from "../assets/images/reactlogo.png";
import SvgIcon from '@material-ui/core/SvgIcon';
import Grid from "@material-ui/core/Grid";
import styles from "../assets/components/sidebarStyle";
import { withRouter } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { Menu, Dropdown, Breadcrumb, Icon } from 'antd';
const useStyles = makeStyles(styles);

export default withRouter(function MiniDrawer(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [vista, setVista] = React.useState(0);
    const [breadcrumb, setBreadcrumb] = React.useState(['Inicio']);

    const handleVistas = () => {
        switch (vista) {
            case 0:
                return <MyUpload />;
            case 1:
                return <Cambiar_Contrasena />;

            default:
                break;
        }
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleClickCambiarCont = (e) => {
        setVista(1);
        var exist = false;
        breadcrumb.map((name, index) => {
            if (name === 'Cambiar Contraseña') {
                exist = true;
            }
        })
        if (!exist) {
            var newer = breadcrumb;
            newer.push('Cambiar Contraseña');
            setBreadcrumb(newer);
        }
    };
    const handleClickCerrar = (e) => {
        //console.log(props)
        localStorage.removeItem('token');
        props.history.push('/');
    };
    const menu = (
        <Menu style={{ top: 20 }}>
            <Menu.Item key="1">
                <a href='#' title='Cambiar Contraseña' style={{ color: 'inherit' }} onClick={handleClickCambiarCont}><span className={classes.title} style={{ fontSize: '15px', display: 'flex', alignItems: 'center' }}><LockRoundedIcon style={{ marginRight: 5 }} /> Cambiar contraseña</span></a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2">
                <a href='#' title='LogOut' style={{ color: 'inherit' }} onClick={handleClickCerrar}><span className={classes.title} style={{ fontSize: '15px', display: 'flex', alignItems: 'center' }}><ExitToAppRoundedIcon style={{ marginRight: 5 }} /> Cerrar Sesión</span></a>
            </Menu.Item>
        </Menu>
    );
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                color="primary"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* <span className={classes.title} style={{ fontSize: '20px', display: 'flex', alignItems: 'center', marginLeft: 10 }}><HomeIcon /> {[...breadcrumb]}</span> */}
                    <Breadcrumb separator={<Icon type="double-right" style={{ color: '#FFF' }} />}>
                        {(breadcrumb.length === 1) ?
                            <Breadcrumb.Item><Icon type="home" theme='filled' style={{ fontSize: '18px', color: '#FFF' }} /> <span style={{ fontSize: '19px', color: '#FFF' }}>Inicio</span></Breadcrumb.Item> :
                            breadcrumb.map(function (name, index) {
                                return (index === 0) ?
                                    <Breadcrumb.Item href='/' key={index}><Icon type="home" theme='filled' style={{ fontSize: '18px', color: '#FFF' }} /> <span style={{ fontSize: '19px', color: '#FFF' }}>{name}</span></Breadcrumb.Item> :
                                    <Breadcrumb.Item  key={index}><span style={{ fontSize: '19px', color: '#FFF' }}>{name}</span></Breadcrumb.Item>;
                            })}
                    </Breadcrumb>
                    <Typography variant="h6" noWrap color="inherit" style={{ position: 'absolute', right: 0, marginRight: 30 }}>
                        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                            <a className="ant-dropdown-link" href="#" style={{ color: 'inherit' }}>
                                <span className={classes.title} style={{ fontSize: '20px', display: 'flex', alignItems: 'center', marginLeft: 10 }}><PersonIcon /> {props.user}</span>
                            </a>
                        </Dropdown>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <div className={classes.logo}>
                        <Link to="/" className={classNames(classes.logoLink)}>
                            <div className={classes.logoImage}>
                                <img src={logo} alt="logo" className={classes.img} />
                            </div>
                        </Link>
                    </div>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        {/* <Nuevo_Afectado afectado='Persona'/> */}
                        {handleVistas()}
                    </Grid>
                </Grid>
            </main>
        </div>
    );
})