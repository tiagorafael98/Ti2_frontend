import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./App1.css";
import axios from "axios";
class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      userNameTXT: "",
      passwordTXT: "",
      isAuthenticated: false
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    let response = await axios.get(
      "https://ipt-ti2-iptgram.azurewebsites.net/api/posts"
    );

    let postsArray = response.data;

    this.setState({
      posts: postsArray
    });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  async login(evt) {
    evt.preventDefault();

    let obj = {
      userName: this.state.userNameTXT,

      password: this.state.passwordTXT
    };

    let response = await axios.post(
      "https://ipt-ti2-iptgram.azurewebsites.net/api/account/login",
      obj,
      {
        withCredentials: true,

        crossdomain: true,

        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.status === 200) {
      // se estiver autenticado, apaga o q está escrito no user e pass e a autenticação é efetuada

      this.setState({
        userNameTXT: "",

        passwordTXT: "",

        isAuthenticated: true
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  async logout() {
    let response = await axios.post(
      "https://ipt-ti2-iptgram.azurewebsites.net/api/account/logout",
      null,
      {
        withCredentials: true,

        crossdomain: true,

        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status === 200) {
      this.setState({
        isAuthenticated: false
      });
    }
  }
  render() {
    return (
      <div className="FormCenter">
        {this.state.isAuthenticated ? (
          <button onClick={this.logout}>logout</button>
        ) : (
          <form className="FormField " onSubmit={this.handleSubmit}>
            <FormGroup className="FormField">
              <FormLabel className="FormField__Label" htmlFor="name">
                Username
              </FormLabel>
              <FormControl
                type="username"
                id="username"
                value={this.state.username}
                className="FormField__Input"
                placeholder="Insira o username"
                name="username"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="FormField">
              <FormLabel className="FormField__Label" htmlFor="email">
                password
              </FormLabel>
              <FormControl
                type="password"
                value={this.state.password}
                id="password"
                className="FormField__Input"
                placeholder="Insira a sua password"
                name="password"
                onChange={this.handleChange}
              />
            </FormGroup>
            <div id="divBtn" className="FormField">
              <button
                id="idBtn"
                type="submit"
                className="FormField__Button mr-20"
              >
                Iniciar Sessão
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default SignInForm;
