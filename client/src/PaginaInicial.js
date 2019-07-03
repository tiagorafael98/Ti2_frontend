import React, { Component } from 'react'
import axios from 'axios'
import Image from './Image'
import ImagePopUp from './ImagePopUp';
import './PaginaInicial.css'

class PaginaInicial extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            isShowingImagePopUp: false,
            showCaseImage: {}, // este objeto vai conter todos os elementos da imagem q clicarmos
            SearchText:"",
            userNameTXT: "",
            passwordTXT: "",
            isAuthenticated: false
        }

        this.showImagePopUp = this.showImagePopUp.bind(this); // sempre q é feito handleClick, o "this" é referente ao "this" da pag inicial e não à Image
        this.closePopUp = this.closePopUp.bind(this);
        this.searchPost = this.searchPost.bind(this);
        this.handleChange = this.handleChange .bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    async componentDidMount() {
        let response = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts');

        let postsArray = response.data;

        this.setState({
            posts: postsArray
        })
    }

    async showImagePopUp(id) {
        let response = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + id);

        let obj = {
            image: "https://ipt-ti2-iptgram.azurewebsites.net/api/posts/" + id + "/image",
            user: response.data.user.name,
            date: response.data.postedAt,
            caption: response.data.caption,
            likes: response.data.likes
        };

        let commentsResponse = await axios.get("https://ipt-ti2-iptgram.azurewebsites.net/api/posts/" + id + "/comments"); // array dos comentarios (commentsResponse)

        obj.comments = commentsResponse.data;

        this.setState({
            showCaseImage: obj,
            isShowingImagePopUp: true
        })
    }

    closePopUp() { //este objeto é um estado q fecha o popup
        this.setState({
            isShowingImagePopUp: false
        })
    }

    async searchPost(evt) {
        evt.preventDefault();
        let response = await axios.get("https://ipt-ti2-iptgram.azurewebsites.net/api/posts/?query="+ this.state.SearchText);
        let postsArray = response.data;
        this.setState({
            posts: postsArray,
            SearchText: ""
        })
    }

    handleChange(evt){
        this.setState(
            {
                [evt.target.name]: evt.target.value
            }
        )
    }

    async login(evt){
        evt.preventDefault();
        let obj = {
            "userName": this.state.userNameTXT,
            "password": this.state.passwordTXT
          }
        let response = await axios.post("https://ipt-ti2-iptgram.azurewebsites.net/api/account/login", obj, {
            withCredentials: true,
            crossdomain: true,
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200) { // se estiver autenticado, apaga o q está escrito no user e pass e a autenticação é efetuada
            this.setState({
                userNameTXT: "",
                passwordTXT: "",
                isAuthenticated: true
            })
        }   
    }

    async logout(){
        let response = await axios.post("https://ipt-ti2-iptgram.azurewebsites.net/api/account/logout", null, {
            withCredentials: true,
            crossdomain: true,
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200) {
            this.setState({
                isAuthenticated: false
            })
        }
    }

    render() {
        return (
            <div className="PaginaInicial">
                <form onSubmit={this.searchPost} className="PaginaInicial-SearchForm">
                    <input placeholder="Search Post..." name="SearchText" onChange={this.handleChange} value={this.state.SearchText}/>
                    <button type="submit">🔍</button>
                </form>

                {
                    this.state.isAuthenticated
                    ?
                    <button onClick={this.logout}>logout</button>
                    :
                    <form className="PaginaInicial-loginForm" onSubmit={this.login}>
                    <input type = "text" onChange={this.handleChange} name="userNameTXT" value={this.state.userNameTXT}/>
                    <input type = "password" onChange={this.handleChange} name="passwordTXT" value={this.state.passwordTXT}/>
                    <button type = "submit">Entrar</button>
                </form>
                }
               
                {
                    this.state.posts.map(function (p) {
                        return ([
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
                        comments={this.state.showCaseImage.comments}
                        closePopUp={this.closePopUp}
                    />
                }
            </div>
        ); // aqui vamos meter todos os elementos que compoem a página inicial
    }
}
export default PaginaInicial;