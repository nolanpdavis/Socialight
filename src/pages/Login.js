import React, { Component } from 'react'
import actions from '../actions'
import { connect } from 'react-redux'
import { APIManager } from '../utils'
import {Router, Route, Redirect } from 'react-router-dom'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            visitor: {
                userName: '',
                password: ''
            }
        }
    }

    login(event, credentials){
        event.preventDefault()

        APIManager.post('/account/login', this.state.visitor, (err, response) => {
            if(err){
                let msg = err.message || err
                console.log(msg)
                alert(msg)
                return
            }

            this.props.currentUserReceived(response.profile)
            this.props.history.push('/')
        })
    }

    updateVisitor(event){
        let updated = Object.assign({}, this.state.visitor)
        updated[event.target.id] = event.target.value
        this.setState({
            visitor: updated
        })
    }

    render(){
        return(
            <div>
                <h2>Log In</h2>
                <input className="inputBox" onChange={this.updateVisitor.bind(this)} type="text" id="userName" placeholder="Username" /><br />
                <input className="inputBox" onChange={this.updateVisitor.bind(this)} type="text" id="password" placeholder="Password" /><br />
                <button className="btn" onClick={this.login.bind(this)}>Log in</button>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        currentUser: state.account.currentUser
    }
}

const dispatchToProps = (dispatch) => {
    return {
        profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
        currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
    }
}

export default connect(stateToProps, dispatchToProps)(Login)
