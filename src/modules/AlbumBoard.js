import React, { Component } from 'react'
import actions from '../actions'
import { connect } from 'react-redux'
import { APIManager } from '../utils'


class AlbumBoard extends Component {
    render(){
        return(
            <div>
                <h1>Album Component!</h1>
                {this.props.currentUser.albums.map(function(album, i){
                    return <div key={i}>
                            <h2>{album.name}</h2>
                            <p>{album.description}</p>
                            <img src={album.images[0]}/>
                            <div className="X"></div>
                         </div>
                })}
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        currentUser: state.account.currentUser
    }
}

export default connect(stateToProps)(AlbumBoard)
