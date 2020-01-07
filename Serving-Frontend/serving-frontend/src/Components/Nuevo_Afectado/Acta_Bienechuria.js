import React from "react";
import "moment/locale/es";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Divider } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import { forwardRef } from 'react';
//icons
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(1),
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200
        },
        card: {
            maxWidth: 345
        }
    },
}));
export default function Acta_Bienechuria(props) {
    const classes = useStyles();
    const [dataActabien, setDataActabien] = React.useState({ no_acta: '', datos_generales: '', fecha_lev_aereo: new Date(), fecha_lev_catastral: new Date(), resolucion: '', norma_legal: '' });

    const handleSubmit = async e => {
        e.preventDefault();
        //console.log(dataActabien.no_acta)
        props.handleSaveDataBien(dataActabien)
    };

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'no_acta':
                setDataActabien({ ...dataActabien, no_acta: event.target.value })
                break;
            case 'datos_generales':
                setDataActabien({ ...dataActabien, datos_generales: event.target.value })
                break;
            case 'resolucion':
                setDataActabien({ ...dataActabien, resolucion: event.target.value })
                break;
            case 'norma_legal':
                setDataActabien({ ...dataActabien, norma_legal: event.target.value })
                break;

            default:
                break;
        }
    };
    const handleDateChange1 = date => {
        setDataActabien({ ...dataActabien, fecha_lev_aereo: date })
    };
    const handleDateChange2 = date => {
        setDataActabien({ ...dataActabien, fecha_lev_catastral: date })
    };
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
        CheckBoxOutlinedIcon: forwardRef((props, ref) => <CheckBoxOutlinedIcon {...props} ref={ref} />),
        CheckBoxOutlineBlankOutlinedIcon: forwardRef((props, ref) => <CheckBoxOutlineBlankOutlinedIcon {...props} ref={ref} />)
    };

    return (
        <div>
            {/* <form action="/" method="POST" onSubmit={handleSubmit}>
                <TextField id="standard-basic" name='no_acta' label="Standard" value={dataActabien.no_acta} onChange={handleChange} />
                <Button variant="contained" color="primary" type='submit'>
                    Salvar
                </Button>
            </form> */}
            <form className={classes.root} action="/" method="POST" onSubmit={handleSubmit} style={{ marginTop: 20 }}>
                <Card className={classes.card}>
                    <CardContent>
                        <h2>Acta No. {props.numero + 1}</h2>
                        <div>
                            <TextField id="standard-basic" name='no_acta' label="Número Acta" value={dataActabien.no_acta} onChange={handleChange} style={{ width: '50%' }} />
                            <TextField id="standard-basic" name='datos_generales' label="Datos Generales" value={dataActabien.datos_generales} onChange={handleChange} style={{ width: '50%' }} />
                        </div>
                        <div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    style={{ width: '50%' }}
                                    name='fecha_lev_aereo'
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label={<p style={{ fontSize: '20px' }}>Fecha Levantamiento Aéreo</p>}
                                    value={dataActabien.fecha_lev_aereo}
                                    onChange={handleDateChange1}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    style={{ width: '50%' }}
                                    name='fecha_lev_catastral'
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label={<p style={{ fontSize: '20px' }}>Fecha Levantamiento Catastral</p>}
                                    value={dataActabien.fecha_lev_catastral}
                                    onChange={handleDateChange2}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div>
                            <TextField id="standard-basic" name='resolucion' label="Resolución" value={dataActabien.resolucion} onChange={handleChange} style={{ width: '50%' }} />
                            <TextField id="standard-basic" name='norma_legal' label="Norma Legal" value={dataActabien.norma_legal} onChange={handleChange} style={{ width: '50%' }} />
                        </div>
                        <div>
                            <br />
                            <Divider />
                            <br />
                        </div>
                        <div>
                            <h2>Elementos Constructivos</h2>
                        </div>
                        <div>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <InputLabel id="Elemento" style={{ marginLeft: 6, marginTop: 15 }}>Elemento</InputLabel>
                                    <Select
                                        style={{ width: '50%', marginLeft: 6 }}
                                        labelId="Elemento"
                                        name='municipio'
                                        id="demo-simple-select-filled"
                                        value={dataActabien.elemento}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={dataActabien.elemento}>elementos</MenuItem>
                                    </Select>
                                    <TextField id="standard-basic" name='area' label="Área" value={dataActabien.area} onChange={handleChange} style={{ width: '50%' }} />
                                    <Button variant="contained" color="primary" style={{ width: '50%' }} >
                                        Agregar
                                        </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <MaterialTable
                                                style={{ paddingLeft: '15px', paddingRight: '15px' }}
                                                icons={tableIcons}
                                                title="Elementos Agregados"
                                                columns={[
                                                    { title: 'Elemento', field: 'elemento', lookup: { 34: 'aa', 63: 'aaa' }, },
                                                    { title: 'Área', field: 'area' }
                                                ]}
                                                data={[{
                                                    elemento: '34',
                                                    area: 'Baran'
                                                }]}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        new Promise(resolve => {
                                                            setTimeout(() => {
                                                                resolve();
                                                                // setState(prevState => {
                                                                //     const data = [...prevState.data];
                                                                //     data.push(newData);
                                                                //     return { ...prevState, data };
                                                                // });
                                                            }, 600);
                                                        }),
                                                    onRowDelete: oldData =>
                                                        new Promise(resolve => {
                                                            setTimeout(() => {
                                                                resolve();
                                                                // setState(prevState => {
                                                                //     const data = [...prevState.data];
                                                                //     data.splice(data.indexOf(oldData), 1);
                                                                //     return { ...prevState, data };
                                                                // });
                                                            }, 600);
                                                        }),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <br />
                                            <MaterialTable
                                                style={{ paddingLeft: '15px', paddingRight: '15px' }}
                                                icons={tableIcons}
                                                title="Tipo Pared"
                                                columns={[
                                                    { title: 'Elemento', field: 'elemento' },
                                                    { title: 'Área', field: 'area' }
                                                ]}
                                                data={[{
                                                    elemento: '34',
                                                    area: 'Baran'
                                                }]}
                                                actions={[
                                                    {
                                                        icon: CheckBoxOutlineBlankOutlinedIcon,
                                                        tooltip: 'Seleccionar',
                                                        onClick: (event, rowData) => alert("You saved " + rowData.elemento)
                                                    }
                                                ]}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <br />
                                            <MaterialTable
                                                style={{ paddingLeft: '15px', paddingRight: '15px' }}
                                                icons={tableIcons}
                                                title="Tipo Cubierta"
                                                columns={[
                                                    { title: 'Elemento', field: 'elemento' },
                                                    { title: 'Área', field: 'area' }
                                                ]}
                                                data={[{
                                                    elemento: '34',
                                                    area: 'Baran'
                                                }]}
                                                actions={[
                                                    {
                                                        icon: CheckBoxOutlineBlankOutlinedIcon,
                                                        tooltip: 'Seleccionar',
                                                        onClick: (event, rowData) => alert("You saved " + rowData.elemento)
                                                    }
                                                ]}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <br />
                                            <MaterialTable
                                                style={{ paddingLeft: '15px', paddingRight: '15px' }}
                                                icons={tableIcons}
                                                title="Características Constructivas"
                                                columns={[
                                                    { title: 'Elemento', field: 'elemento'},
                                                    { title: 'Área', field: 'area' }
                                                ]}
                                                data={[{
                                                    elemento: '34',
                                                    area: 'Baran'
                                                }]}
                                                actions={[
                                                    {
                                                        icon: CheckBoxOutlineBlankOutlinedIcon,
                                                        tooltip: 'Seleccionar',
                                                        onClick: (event, rowData) => alert("You saved " + rowData.elemento)
                                                    }
                                                ]}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </CardContent>
                    <CardActions style={{ float: 'right', marginRight: 20, marginBottom: 10 }}>
                        <Button variant="contained" color="primary">
                            Eliminar
                        </Button>
                        <Button variant="contained" color="primary">
                            Editar
                        </Button>
                        <Button variant="contained" color="primary" type='submit'>
                            Salvar
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </div>
    );
}
