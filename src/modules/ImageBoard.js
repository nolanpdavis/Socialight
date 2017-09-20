import React, { Component } from 'react'
import { APIManager } from '../utils'
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';

export default class ImageBoard extends Component {
    constructor(){
        super()
        this.state = {
            images: []
        }
    }

    componentWillMount(){
        APIManager.get('/api/image', null, (err, response) => {
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

        const clImages = this.state.images.slice()
        const displayImages = []
        for(let i=0; i<clImages.length; i++) {
            displayImages.push(clImages[i].albums.images.slice(62, clImages[i].albums.images.length))
        }

        const toPublicId = (image) => {
            return image.slice(62, image.length)
        }

        return(
            <div className="imageBoard">
                <CloudinaryContext  cloudName="djswgrool" fetchFormat="auto" >
                      {this.state.images.map((image, i) => {
                          return (
                              <div className="responsive imgContainer" key={i} style={{}}>
                                  <div className="img" style={{height: '10px'}}>
                                      <a href={image.albums.images} className="imgLink">
                                          <Image publicId={toPublicId(image.albums.images)} responsive className="imageBoardImage">
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
                </CloudinaryContext>
            </div>
        )
    }
}


{

                       }
