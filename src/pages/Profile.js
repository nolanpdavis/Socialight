import React, { Component } from 'react'
import { Header, MapBoard, ImageBoard } from '../modules'

export default class Profile extends Component {
    render(){
        return(
            <div>
                <Header />
                <h1>Profile Page</h1>
                <p>Account name</p>
                <MapBoard />
                <ImageBoard />
            </div>
        )
    }
}
