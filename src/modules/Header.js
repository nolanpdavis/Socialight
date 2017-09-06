import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render(){
        return(
            <div>
                <h1>Socialight</h1>
                {/*<Link to='/map'>Map</Link>
                <br />
                <Link to='/'>Images</Link>*/}
            </div>
        )
    }
}
