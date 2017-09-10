import React, { Component } from 'react'
import actions from '../actions'
import { connect } from 'react-redux'
import { APIManager } from '../utils'
import {Router, Route, Redirect, Link, withRouter } from 'react-router-dom'


class AccountNav extends Component {

    componentWillMount(){
        // check the current user
        APIManager.get('/account/currentuser', null, (err, response) => {
            if (err) {
                alert(err)
                console.log(err)
                console.log(JSON.stringify(err))
                return
            }

            if (response.profile == null)
                return

            this.props.currentUserReceived(response.profile)
        })
    }

    onLogout(event){
        event.preventDefault()
        APIManager.get('/account/logout', null, (err, response) => {
            if (err){
                let msg = err.message || err
                alert(msg)
                console.log(msg)
                console.log(JSON.stringify(msg))
                return
            }
            this.props.currentUserReceived(null)
            this.props.history.push('/')
        })
    }

    render(){
        return(
            <div>
                {
                    (this.props.currentUser == null) ?
                        <div>
                            <Link to='/login'>Log In</Link>
                            <br />
                            <Link to='/signup'>Sign Up</Link>
                        </div>
                        :
                        <div>
                            <Link to='/'>Home</Link>
                            <br />
                            <Link to='/albums'>Albums</Link>
                            <br />
                            <Link to='/' onClick={this.onLogout.bind(this)}>Log out</Link>
                        </div>

                }
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

export default withRouter(connect(stateToProps, dispatchToProps)(AccountNav))
