import React, { Component } from 'react'
import { Header, MapBoard, DropZone, AccountNav } from '../modules'
import actions from '../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Account extends Component {
    render(){
        return(
            <div>
                <Header />
                <AccountNav />
                <p>Hello, {this.props.currentUser.userName}</p>
                <DropZone />
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

export default withRouter(connect(stateToProps, dispatchToProps)(Account))
