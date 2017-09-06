import React, { Component } from 'react'
import { Header, ImageBoard, AccountNav, AlbumBoard } from '../modules'
import {Router, Route, Redirect, Link, withRouter } from 'react-router-dom'

export default class Images extends Component {


    render(){
        return(
            <div>
                <Header />
                <AccountNav history={history}/>
                <AlbumBoard/>
                <Link to='/newalbum'>Create New Album</Link>
            </div>
        )
    }
}
