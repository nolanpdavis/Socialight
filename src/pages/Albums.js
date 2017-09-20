import React, { Component } from 'react'
import { Header, ImageBoard, AccountNav, AlbumBoard } from '../modules'
import {Router, Route, Redirect, Link, withRouter } from 'react-router-dom'

export default class Albums extends Component {


    render(){
        return(
            <div>
                <Header />
                <Link to='/newalbum' className="newAlbumLink">Create New Album</Link>
                <AlbumBoard/>
            </div>
        )
    }
}
