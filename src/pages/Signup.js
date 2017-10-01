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
        if (this.state.visitor.userName.length <= 3) {
            alert('Username must be more than three characters')
            return
        }

        else if (this.state.visitor.email.length <= 3) {
            alert('Email must be more than three characters')
            return
        }
        else if (this.state.visitor.password.length <= 3) {
            alert('Password must be more than three characters')
            return
        }
        else {
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
                <h2>Sign Up</h2>
                <input className="inputBox" onChange={this.updateVisitor.bind(this)} type="text" id="userName" placeholder="Username" /><br />
                <input className="inputBox"onChange={this.updateVisitor.bind(this)} type="text" id="email" placeholder="Email" /><br />
                <input className="inputBox" onChange={this.updateVisitor.bind(this)} type="text" id="password" placeholder="Password" /><br />
                <button className="btn" onClick={this.register.bind(this)}>Join</button>
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
