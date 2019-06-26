import React, {Component} from 'react'

class ImagePopUp extends Component{
    render(){
        return(
            <div className="ImagePopUp">
                <img src={this.props.image}/>
                <h1>{this.props.user}</h1>
                <h1>{this.props.date}</h1>
                <h1>{this.props.caption}</h1>
                <h1>{this.props.likes}</h1>
            </div>
        );
    }
}
export default ImagePopUp;