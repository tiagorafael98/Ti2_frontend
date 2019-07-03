import React, {Component} from 'react'
import './ImagePopUp.css'

class ImagePopUp extends Component{
    constructor(props){
        super(props);
        this.state={
            commentText: ""
        }
        this.closePopUp = this.closePopUp.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleCommentSubmission = this.handleCommentSubmission.bind(this);
    }
    closePopUp(){
        this.props.closePopUp();
    }
    handleCommentChange(evt){ //temos o evt para aceder o valor do input
       this.setState({
           commentText: evt.target.value
       })

    }
    handleCommentSubmission(evt) {
        console.log(this.state.commentText);
        evt.preventDefault();
        this.props.handleCommentSubmission(this.state.commentText, this.props.idPost);
        this.setState({
            commentText: ""
        })
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

                <form onSubmit={this.handleCommentSubmission}>
                    <input type="text" value={this.state.commentText} onChange={this.handleCommentChange} placeholder="Novo comentário"/>
                </form>
                <button onClick={this.closePopUp}>❌</button>
                
            </div>
        );
    }
}
export default ImagePopUp;