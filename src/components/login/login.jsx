import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
        };
    }

    handleInputChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value
        });

    handleSubmit = () => {
        const { userName, password } = this.state;
        if (userName === 'user' && password === 'user') {
            this.props.onLogin(userName);
            this.props.history.push('/comp1');
        }
    }

    render() {
        return (
            <div className='wrapper'>
                <label>Username: </label> <input type="text" onChange={this.handleInputChange} name='userName' /> <br />
                <label>Password: </label> <input type="password" onChange={this.handleInputChange} name='password' /> <br />
                <button type="button" onClick={() => this.handleSubmit()}>Submit</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authenticatedState.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    onLogin: (data) => dispatch({ type: 'LOGIN', payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
