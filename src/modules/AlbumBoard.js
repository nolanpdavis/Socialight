import React, { Component } from 'react'
import actions from '../actions'
import { connect } from 'react-redux'
import { APIManager } from '../utils'
import {Router, Route, Redirect, Link, withRouter } from 'react-router-dom'
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';



class AlbumBoard extends Component {
    constructor(){
        super()
        this.state = {
            albums: []
        }
    }



    render(){

        const toPublicId = (image) => {
            return image.slice(62, image.length)
        }

        return(
            <div className="albumBoard">

            {(this.props.currentUser) ?
                this.props.currentUser.albums.map(function(album, i){
                    return <div key={i} className="thumbnailContainer">
                                <h2>{album.name}</h2>
                                <Link to={`/album/${album._id}`}>{album._id}</Link>
                                <p>{album.description}</p>
                                <div className="albumThumbnailContainer">
                                <CloudinaryContext cloudName="djswgrool" fetchFormat="auto">
                                        { (album.images.length < 3) ?
                                            <Image publicId={toPublicId(album.images[0].url)} responsive className="album2">
                                                <Transformation
                                                    width="200"
                                                    height="200"
                                                    crop="fill" />
                                            </Image>
                                            :
                                            <div>
                                                <Image publicId={toPublicId(album.images[0])} responsive className="album1">
                                                    <Transformation
                                                        width="200"
                                                        height="200"
                                                        crop="fill" />
                                                </Image>
                                                <Image publicId={toPublicId(album.images[1])} responsive className="album2">
                                                    <Transformation
                                                        width="200"
                                                        height="200"
                                                        crop="fill" />
                                                </Image>
                                                <Image publicId={toPublicId(album.images[2])} responsive className="album3">
                                                    <Transformation
                                                        width="200"
                                                        height="200"
                                                        crop="fill" />
                                                </Image>
                                            </div>

                                        }
                                    </CloudinaryContext>
                                </div>
                                <div className="X"></div>
                            </div>
                })
            :
                null}
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
