import React, {Component} from 'react'
import axios from 'axios';

class Image extends Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this); //quando clica na imagem, envia o id da imagem para a pagina inicial
    }
    handleClick(){
        this.props.showPopUp(this.props.id); // vamos enviar o id da imagem q clicamos
    }

    render(){
        return(
             <div className="Image">
                 <img src={"https://ipt-ti2-iptgram.azurewebsites.net/api/posts/"+ this.props.id +"/image"} onClick={this.handleClick}/>
             </div>
        );
    }
}

export default Image;