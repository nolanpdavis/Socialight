import React, { Component } from 'react'
import { APIManager } from '../utils'

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


        return(
            <div>
                <h1>ImageBoard Component</h1>

                {this.state.images.map(function(image, i){
                    return <div key={i} >
                            <img src={image.albums.images} style={{width: '300px'}}/>
                            <div className="X"></div>
                         </div>
                })}

            </div>
        )
    }
}
