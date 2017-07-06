import React, { Component } from 'react'
import { Header, MapBoard, AccountNav } from '../modules'

export default class Map extends Component {
    render(){
        return(
            <div>
                <Header />
                <AccountNav />
                <MapBoard />
            </div>
        )
    }
}
