import React, { Component } from 'react'
import actions from '../actions'
import { connect } from 'react-redux'
import { APIManager } from '../utils'
import {Router, Route, Redirect } from 'react-router-dom'
import { DropZone } from '../modules'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'
import { AccountNav, Header } from '../modules'
import geolib from 'geolib'
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';

class NewAlbum extends Component {
    constructor(){
        super()
        this.uploadFile.bind(this),
        this.state = {
            name: '',
            images:
                []
        }
    }

    uploadFile (file) {

        const cloudName = 'djswgrool'
        const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

        const timestamp = Date.now()/1000
        const uploadPreset = 'gxgjmexn'

        const paramStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'HiP4dbpagTMuPWo6dA93J-ROAyQ'

        const signature = sha1(paramStr)
        const params = {
            'api_key': '485348192797243',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature,
        }

        let uploadRequest = superagent.post(url)


            uploadRequest.attach('file', file)

            Object.keys(params).forEach((key) => {
                uploadRequest.field(key, params[key])
            })

        uploadRequest.then((res) => {

            const uploaded = res.body

            let location = []

            if (res.body.image_metadata.GPSLongitude == undefined) {
                const preLongitude = "-118.4912"
                const longitude = JSON.parse(preLongitude)
                location.push(longitude)
            }

            else {
                let preLng = JSON.stringify(res.body.image_metadata.GPSLongitude).replace(/ deg/g, '°')
                let postLng = JSON.parse(preLng)
                const longitude = geolib.useDecimal(postLng)
                location.push(longitude)
            }

            if (res.body.image_metadata.GPSLatitude == undefined) {
                const preLatitude = "34.0195"
                const latitude = JSON.parse(preLatitude)
                location.push(latitude)
            }
            else {
                let preLat = JSON.stringify(res.body.image_metadata.GPSLatitude).replace(/ deg/g, '°')
                let postLat = JSON.parse(preLat)
                const latitude = geolib.useDecimal(postLat)
                location.push(latitude)
            }


            const url = res.body.secure_url
            let updatedArr = this.state.images.slice();

            const imageObj = {url, location}
            updatedArr.push(imageObj)
                this.setState({
                    images: updatedArr
                })
            })

        .catch((error) => {
            console.log(error)
            return
        })


    }

    uploadFiles(files){
        for(let i=0; i<files.length; i++){
        this.uploadFile(files[i])
    }}



    postAlbum(event){
        event.preventDefault()

        if (this.state.name.length < 1) {
            alert('Album must have a name')
            return
        }

        else if (this.state.images.length < 1) {
            alert('Album must contain at least one image')
            return
        }

        let updated = Object.assign({}, this.state)
        APIManager.put('/api/profile/'+this.props.currentUser.id, updated, (err, response) => {
            if (err){
                let msg = err.message || err
                alert(msg)
                console.log(JSON.stringify(msg))
                return
            }
            this.props.history.push('/albums')
        })
    }

    updateAlbumName(event){
        this.setState({
            name: event.target.value
        })
    }

    render(){

        const toPublicId = (image) => {
            if (image == undefined) {
                return
            }
            return image.slice(62, image.length)
        }

        return(
            <div>
                <Header />
                <h2>Create New Album</h2>
                <input className="inputBox" onChange={this.updateAlbumName.bind(this)} type="text" id="name" placeholder="Album Name" />
                <p className="pNote">Note: image geolocation currently only availbe for photos taken with an iPhone</p>
                    <Dropzone  className="dropZone" onDrop={this.uploadFiles.bind(this)}/>
                    <CloudinaryContext  cloudName="djswgrool" fetchFormat="auto" >
                          {this.state.images.map((image, i) => {
                              return (
                                  <div className="responsive newAlbumImage" key={i} style={{}}>
                                      <div>
                                          <Image publicId={toPublicId(image.url)} responsive>
                                              <Transformation
                                              width="500"
                                              height="500"
                                              crop="fill"
                                              />
                                          </Image>
                                      </div>
                                  </div>
                              )
                          })
                      }
                    </CloudinaryContext>
                <button className="btn"onClick={this.postAlbum.bind(this)}>Create Album</button>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        currentUser: state.account.currentUser
    }
}

const dispatchToProps = (dispatch) => {
    return {
        profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
        currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
    }
}

export default connect(stateToProps, dispatchToProps)(NewAlbum)
