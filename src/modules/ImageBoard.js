import React, { Component } from 'react'
import { APIManager } from '../utils'
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';
const Waypoint = require('react-waypoint');

export default class ImageBoard extends Component {
    constructor(){
        super()
        this.loadMore = this.loadMore.bind(this),
        this.state = {
            images: [],
            limit: 12
        }
    }

    componentWillMount(){
        APIManager.get('/api/image', {limit: this.state.limit}, (err, response) => {
            if(err){
                let msg = err.message || err
                console.log(msg)
                return
            }

            let array = response.results

            this.setState({
                images: array
            })
        })
    }


    loadMore(){
        this.setState({
            limit: this.state.limit+=12
        })
        APIManager.get('/api/image', {limit: this.state.limit}, (err, response) => {
            if(err){
                let msg = err.message || err
                console.log(msg)
                return
            }

            let array = response.results

            this.setState({
                images: array
            })
        })
    }

    render(){

        const toPublicId = (image) => {
            return image.slice(62, image.length)
        }

        return(
            <div className="imageBoard">
                <CloudinaryContext  cloudName="djswgrool" fetchFormat="auto" >
                      {this.state.images.map((image, i) => {
                          return (
                              <div className="responsive imgContainer" key={i} style={{}}>
                                  <div style={{height: '10px'}}>
                                      <a href={`/album/${image.albums._id}`} className="imgLink">
                                          <Image publicId={toPublicId(image.albums.images.url)} responsive className="imageBoardImage">
                                              <Transformation
                                              width="500"
                                              height="500"
                                              crop="fill"
                                              />
                                          </Image>
                                      </a>
                                  </div>
                              </div>
                          )
                      })
                  }
                  <Waypoint
                    onEnter={ () => this.loadMore()}
                    bottomOffset='-500px'/>
                </CloudinaryContext>
            </div>
        )
    }
}
