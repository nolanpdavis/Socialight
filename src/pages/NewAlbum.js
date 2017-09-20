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

class NewAlbum extends Component {
    constructor(){
        super()
        this.uploadFile.bind(this),
        this.state = {
            name: '',
            description: '',
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
            console.log(uploaded)

            if (res.body.image_metadata.GPSLatitude) {
                let latitude = geolib.useDecimal(res.body.image_metadata.GPSLatitude.slice(0, 2) +'°'+res.body.image_metadata.GPSLatitude.slice(7, res.body.image_metadata.GPSLatitude.length))
            }
            let latitude = 34.0522

            if (res.body.image_metadata.GPSLongitude) {
                let longitude = geolib.useDecimal(res.body.image_metadata.GPSLongitude.slice(0, 2) +'°'+res.body.image_metadata.GPSLongitude.slice(7, res.body.image_metadata.GPSLongitude.length))
            }
            let longitude = 118.2437

            const url = res.body.secure_url
            let updatedArr = this.state.images.slice();
            let location = []
            location.push(longitude, latitude)

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

        let updated = Object.assign({}, this.state)
        APIManager.put('/api/profile/'+this.props.currentUser.id, updated, (err, response) => {
            if (err){
                let msg = err.message || err
                alert(msg)
                console.log(JSON.stringify(msg))
                console.log('updated', updated)
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

    updateAlbumDescription(event){
        this.setState({
            description: event.target.value
        })
    }

    render(){



        return(
            <div>
                <Header />
                <h1>Create New Album</h1>
                <input onChange={this.updateAlbumName.bind(this)} type="text" id="name" placeholder="Album Name" /><br />
                <input onChange={this.updateAlbumDescription.bind(this)} type="text" id="description" placeholder="Description" /><br />
                    <Dropzone onDrop={this.uploadFiles.bind(this)}/>
                    {this.state.images.map(function(image, i){
                        return <div key={i}>
                                <img src={image.url} style={{width: '300px'}}/>
                                <div className="X"></div>
                             </div>
                    }.bind(this))}
                <button onClick={this.postAlbum.bind(this)}>Create Album</button>
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
