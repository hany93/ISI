import React from "react";
import Informacion from './Informacion';
import Acta_Bienechuria from './Acta_Bienechuria';
import Button from '@material-ui/core/Button';

class Nuevo_Afectado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actaBienechuria: [],
            infoBasica: {},
            actaAgricola: []
        };
        this.handleNuevaActaBien = this.handleNuevaActaBien.bind(this)
        this.handleSaveDataBien = this.handleSaveDataBien.bind(this)
        this.handleSaveDataInfo = this.handleSaveDataInfo.bind(this)
    }

    handleSaveDataBien = (data) => {        
        var aux = this.state.actaBienechuria;
        //aux[]
        aux.push(data);
        this.setState({ actaBienechuria: aux });
        //console.log(this.state.actaBienechuria)
    }

    handleSaveDataInfo = (data) => {
        this.setState({ infoBasica: data });
    }

    handleNuevaActaBien = () => {
        var data = {};
        var aux = this.state.actaBienechuria;
        aux.push(data);
        this.setState({ actaBienechuria: aux });
        //console.log(this.state.actaBienechuria)
    }

    render() {
        //console.log(this.state.infoBasica)
        return (
            <div>
                <Informacion afectado={this.props.afectado} handleNuevaActaBien={this.handleNuevaActaBien} handleSaveDataInfo={this.handleSaveDataInfo} />
                {this.state.actaBienechuria ? this.state.actaBienechuria.map((item, i) => {
                    return <Acta_Bienechuria key={i} handleSaveDataBien={this.handleSaveDataBien} numero={i}/>
                }) : ''}
            </div>
        )
    }
}
export default Nuevo_Afectado;
// export default function Nuevo_Afectado(props) {

//     const [infoBasica, setInfoBasica] = React.useState({});
//     const [actaBienechuria, setActaBienechuria] = React.useState([{},{}]);
//     const [actaAgricola, setActaAgricola] = React.useState([]);

//     const handleSaveDataBien = (data) => {
//         var aux = actaBienechuria;
//         aux.push(data);
//         setActaBienechuria(aux);
//     }
//     const handleSaveDataInfo = (data) => {
//         setInfoBasica(data);
//     }
//     const handleNuevaActaBien=()=>{
//         var data={};      
//         var aux = actaBienechuria;
//         aux.push(data);
//         setActaBienechuria(aux);
//         //console.log(actaBienechuria)
//     }

//     React.useEffect(() => {
//         console.log(actaBienechuria)
//       }, []);

//     return (
//         <div>
//             <Informacion afectado={props.afectado} handleSaveDataInfo={handleSaveDataInfo} handleNuevaActaBien={handleNuevaActaBien}/>
//             {actaBienechuria.map((item, i) => {
//                 return <Acta_Bienechuria handleSaveDataBien={handleSaveDataBien}/>
//             })}
//             <Button variant="contained" color="primary" onClick={handleNuevaActaBien}>
//               Salvar
//             </Button>
//         </div>
//     );
// }
