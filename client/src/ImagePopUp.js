import React, {Component} from 'react'
import './ImagePopUp.css'

class ImagePopUp extends Component{
    constructor(props){
        super(props);
        this.closePopUp = this.closePopUp.bind(this);
    }
    closePopUp(){
        this.props.closePopUp();
    }
    render(){
        return(
            <div className="ImagePopUp">
                <img src={this.props.image}/>
                <h1>{this.props.user}</h1>
                <h1>{this.props.date}</h1>
                <h1>{this.props.caption}</h1>
                <h1>{this.props.likes}</h1>

                {
                    this.props.comments.map(function(c) {
                        return([
                            <h4>{c.text}</h4>,
                            <h4>{c.user.name}</h4>,
                            <h4>{c.postedAt}</h4>
                        ]);
                    }.bind(this))
                }
                <button onClick={this.closePopUp}>❌</button>
                
            </div>
        );
    }
}
export default ImagePopUp;