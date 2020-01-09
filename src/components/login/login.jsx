import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
    onLogin=()=>{
        debugger
        this.props.history.push('/comp1');
    }

    render() {
        return (
            <div className='wrapper'>
                <label>Username: </label> <input type="text" /> <br />
                <label>Password: </label> <input type="password" /> <br />
                <button type="button" onClick={() => this.onLogin()}>Submit</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authenticatedState.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    onLogin: () => dispatch({ type: 'LOGIN' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
