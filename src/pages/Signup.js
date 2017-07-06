import React, { Component } from 'react'
import actions from '../actions'
import { connect } from 'react-redux'
import { APIManager } from '../utils'
import {Router, Route, Redirect } from 'react-router-dom'

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            visitor: {
                userName: '',
                email: '',
                password: ''
            }
        }
    }

    register(event, visitor){
        event.preventDefault()
        APIManager.post('/account/register', this.state.visitor, (err, response) => {
            if (err){
                let msg = err.message || err
                alert(msg)
                return
            }
            this.props.profileCreated(response.profile)
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
                <h1>Sign Up</h1>
                <input onChange={this.updateVisitor.bind(this)} type="text" id="userName" placeholder="Username" /><br />
                <input onChange={this.updateVisitor.bind(this)} type="text" id="email" placeholder="Email" /><br />
                <input onChange={this.updateVisitor.bind(this)} type="text" id="password" placeholder="Password" /><br />
                <button onClick={this.register.bind(this)}>Join</button>
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

export default connect(stateToProps, dispatchToProps)(Signup)
