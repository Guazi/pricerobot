import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Modal from 'react-modal';
import { GoogleLogin } from 'react-google-login';

import SearchFilters from './SearchFilters';


Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const responseGoogleSuccess = response => {
  console.log('Google success %s', response);
};

const responseGoogleFailure = response => {
  console.log('Google failure %s', response);
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);

    this.startLogin = this.startLogin.bind(this);
    this.startRegister = this.startRegister.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
  }

  startLogin() {
    console.log('starting login');
    this.setState({ modalIsOpen: false });
    this.setState({ loginModalIsOpen: true });
  }

  startRegister() {
    console.log('starting register');
  }

  handleSubmitLogin(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    console.log('heres data', data)
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  closeLoginModal() {
    this.setState({ loginModalIsOpen: false });
  }

  toggleVisibility = () => {
    const visible = !this.state.visible;
    this.setState({
      visible
    });
  };

  render() {
    return (
      <nav className={`navbar-main ${this.state.visible ? 'active' : ''}`}>
        <Link to="/">
          <div className="title">PriceBot</div>
        </Link>
        {/* <MuiThemeProvider>
          <div className="flex justify-center align-center">
            <RaisedButton onClick={this.openModal} primary={true} label="Login" />
          </div>
        </MuiThemeProvider> */}
        {/* <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
          <h2>
            Login to My Account
            <button onClick={this.closeModal}>X</button>
          </h2>
          <GoogleLogin
            clientId="868655030420-htji3q455ofa3bfl02nr8jlaidhrdajd.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
          />
          <div>
            <button onClick={this.startLogin}>Login</button>
            <button onClick={this.startRegister}>Register</button>
          </div>
        </Modal>
        <Modal isOpen={this.state.loginModalIsOpen} onRequestClose={this.closeModal} style={customStyles} contentLabel="Login">
          <div> Login <button onClick={this.closeLoginModal}>X</button></div>

          <form onSubmit={this.handleSubmitLogin}>
            <label>
              Name:
              <input type="text" name="Username" />
            </label>
            <label>
              Password
              <input type="text" name="Password" />
            </label>
            <div>
            <input type="submit" value="Submit" />
            </div>
          </form>
        </Modal> */}
        <Switch>
          <Route exact path="/search">
            <div className="btn toggle-btn" onClick={this.toggleVisibility}>
              Toggle Filters
            </div>
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/search">
            <SearchFilters {...this.props} visible={this.state.visible} displayFilters={true} />
          </Route>
          {/* <Route exact path="/item/:id">
            <SearchFilters {...this.props} visible={this.state.visible} displayFilters={false} />
          </Route> */}
        </Switch>
      </nav>
    );
  }
}

export default Header;
