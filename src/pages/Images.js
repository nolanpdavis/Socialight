import React, { Component } from 'react'
import { Header, ImageBoard, AccountNav } from '../modules'

export default class Images extends Component {


    render(){
        return(
            <div>
                <Header />
                <AccountNav history={history}/>
                <ImageBoard />
            </div>
        )
    }
}
