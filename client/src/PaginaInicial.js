import React, {Component} from 'react'
import axios from 'axios'
import Image from './Image'
import ImagePopUp from './ImagePopUp';

class PaginaInicial extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: [],
            isShowingImagePopUp: false,
            showCaseImage: {} // este objeto vai conter todos os elementos da imagem q clicarmos
        }

        this.showImagePopUp = this.showImagePopUp.bind(this); // sempre q é feito handleClick, o "this" é referente ao "this" da pag inicial e não à Image
    }
    async componentDidMount(){
        let response = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts'); 
        
        let postsArray = response.data;

        this.setState({
            posts: postsArray
        })
    }

    async showImagePopUp(id){
        let response = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + id);
        
        let obj= {
            image: "https://ipt-ti2-iptgram.azurewebsites.net/api/posts/" + id + "/image",
            user: response.data.user.name,
            date: response.data.postedAt,
            caption: response.data.caption,
            likes: response.data.likes
        };
        
        this.setState({
            showCaseImage: obj,
            isShowingImagePopUp: true
        })
    }

    render (){
        return (
            <div className="PaginaInicial">
                {
                    this.state.posts.map(function(p) {
                        return([
                            <h1>{p.caption}</h1>,
                            <Image id={p.id} showPopUp={this.showImagePopUp} />, //estamos a dar à iamgem a propriedade showPopUp q vai dar a funçao showImagePopUp
                            <h2>{p.user.name}</h2>,
                            <h3>{p.postedAt.substring(0, p.postedAt.indexOf("T"))}</h3>,
                            <h3>{p.likes}</h3>,
                            <h3>{p.comments}</h3>
                        ]);
                    }.bind(this)) // a função com atributo p vai percorrer cada um daqueles posts
                                  // dentro do return, temos um array em q cada elemento tem a foto e a caption
                }
                {
                    //  só com o imagepopup, ele renderiza
                    // com estas 2 condições, só renderiza se ambas forem verdadeiras
                   this.state.isShowingImagePopUp && 
                   <ImagePopUp image={this.state.showCaseImage.image}
                                user={this.state.showCaseImage.user}
                                date={this.state.showCaseImage.date}
                                caption={this.state.showCaseImage.caption}
                                likes={this.state.showCaseImage.likes}
                   />                                        
                }
            </div>
        ); // aqui vamos meter todos os elementos que compoem a página inicial
    }
}
export default PaginaInicial;