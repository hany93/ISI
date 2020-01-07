import React from "react";
import locale from "antd/lib/date-picker/locale/es_ES";
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

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
    card: {
      maxWidth: 345,
    }
  },
}));

export default function Informacion(props) {

  const classes = useStyles();

  const [dataInfoBasic, setDataInfoBasic] = React.useState({ nombre: '', apellidos: '', ci: '', direccion: '', municipio: 'Mariel', provincia: 'Artemisa' });

  const handleSubmit = e => {
    e.preventDefault();
    props.handleSaveDataInfo(dataInfoBasic);
  };

  const handleBienechuria = () => {
    props.handleNuevaActaBien();
  }

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'nombre':
        setDataInfoBasic({ ...dataInfoBasic, nombre: event.target.value })
        break;
      case 'apellidos':
        setDataInfoBasic({ ...dataInfoBasic, apellidos: event.target.value })
        break;
      case 'ci':
        setDataInfoBasic({ ...dataInfoBasic, ci: event.target.value })
        break;
      case 'direccion':
        setDataInfoBasic({ ...dataInfoBasic, direccion: event.target.value })
        break;
      case 'municipio':
        setDataInfoBasic({ ...dataInfoBasic, municipio: event.target.value })
        break;
      case 'provincia':
        setDataInfoBasic({ ...dataInfoBasic, provincia: event.target.value })
        break;

      default:
        break;
    }
  };
  
  return (
    <div>
      <form className={classes.root} action="/" method="POST" onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <h2>Información Básica</h2>
            <div>
              <TextField id="standard-basic" name='nombre' label="Nombre" value={dataInfoBasic.nombre} onChange={handleChange} style={{ width: '50%' }} />
              {props.afectado === 'Persona' ? <TextField id="standard-basic" name='apellidos' label="Apellidos" value={dataInfoBasic.apellidos} onChange={handleChange} style={{ width: '50%' }} /> : ''}
            </div>
            <div>
              {props.afectado === 'Persona' ? <TextField id="standard-basic" name='ci' label="CI" value={dataInfoBasic.ci} onChange={handleChange} style={{ width: '50%' }} /> : ''}
              <TextField id="standard-basic" name='direccion' label="Dirección" value={dataInfoBasic.direccion} onChange={handleChange} style={{ width: '50%' }} />
            </div>
            <div>
              <InputLabel id="Municipio" style={{ marginLeft: 6, marginTop: 15 }}>Municipio</InputLabel>
              <Select
                style={{ width: '50%', marginLeft: 6 }}
                labelId="Municipio"
                name='municipio'
                id="demo-simple-select-filled"
                value={dataInfoBasic.municipio}
                onChange={handleChange}
              >
                <MenuItem value={dataInfoBasic.municipio}>Mariel</MenuItem>
              </Select>
              <InputLabel id="Provincia" style={{ marginLeft: 6, marginTop: 15 }}>Provincia</InputLabel>
              <Select
                style={{ width: '50%', marginLeft: 6 }}
                labelId="Provincia"
                name='provincia'
                id="demo-simple-select-filled"
                value={dataInfoBasic.provincia}
                onChange={handleChange}
              >
                <MenuItem value={dataInfoBasic.provincia}>Artemisa</MenuItem>
              </Select>
            </div>
          </CardContent>
          <CardActions style={{ float: 'right', marginRight: 20, marginBottom: 10 }}>
            <Button variant="contained" color="primary" onClick={handleBienechuria}>
              Nueva Acta Bienechuria
            </Button>
            <Button variant="contained" color="primary">
              Nueva Acta Agrícola
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
