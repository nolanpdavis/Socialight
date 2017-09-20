import React, { Component } from 'react'
import { Header, ImageBoard, AccountNav, AlbumBoard } from '../modules'
import {Router, Route, Redirect, Link, withRouter } from 'react-router-dom'
import { APIManager } from '../utils'
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';


export default class Album extends Component {
    constructor(){
        super()
        this.state = {
            images: []
        }
    }

    componentWillMount(){
        APIManager.get(`/api/album/${this.props.match.params.id}`, null, (err, response) => {
            if(err){
                let msg = err.message || err
                console.log(msg)
                return
            }

            let images = response.result[0].albums.images
            console.log(images)

            this.setState({
                images: images
            })
        })
    }

    render(){

        const clImages = this.state.images.slice()
        const displayImages = []
        for(let i=0; i<clImages.length; i++) {
            displayImages.push(clImages[i].slice(62, clImages[i].length))
        }

        return(
            <div>
                <Header />
                <div className="imageBoard">
                                <CloudinaryContext  cloudName="djswgrool" fetchFormat="auto" >
                                  <div className="image-holder">
                                      {displayImages.map((displayImage, i) => {
                                          return (
                                              <div className="responsive" key={i}>
                                                  <div className="img">
                                                      <a target="_blank" href={`http://res.cloudinary.com/djswgrool/image/upload/${displayImage}.jpg`}>
                                                          <Image publicId={displayImage} responsive style={{width: '100%'}}>
                                                              <Transformation
                                                                  crop="scale"
                                                                  width="auto"
                                                                  responsive_placeholder="blank"
                                                              />
                                                          </Image>
                                                      </a>
                                                  </div>
                                              </div>
                                          )
                                      })
                                  }
                                  </div>
                                </CloudinaryContext>
                </div>
            </div>
        )
    }
}
