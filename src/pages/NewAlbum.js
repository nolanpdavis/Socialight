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

class NewAlbum extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            description: '',
            images: []
        }
    }

    uploadFiles(files){
        const image = files[0]

        const cloudName = 'djswgrool'
        const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

        const timestamp = Date.now()/1000
        const uploadPreset = 'hogwyejn'

        const paramStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'HiP4dbpagTMuPWo6dA93J-ROAyQ'

        const signature = sha1(paramStr)
        const params = {
            'api_key': '485348192797243',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        let uploadRequest = superagent.post(url)
        uploadRequest.attach('file', image)

        Object.keys(params).forEach((key) => {
            uploadRequest.field(key, params[key])
        })

        uploadRequest.end((err, resp) => {
            if (err){
                alert(err, null)
                return
            }

            const uploaded = resp.body
            const imageUrl = resp.body.secure_url
            let updatedArr = this.state.images.slice();
            updatedArr.push(imageUrl);
            this.setState({
                images: updatedArr
            })
        })

    }

    postAlbum(event){
        event.preventDefault()

        let updated = Object.assign({}, this.state)
        APIManager.put('/api/profile/'+this.props.currentUser.id, updated, (err, response) => {
            if (err){
                let msg = err.message || err
                alert(msg)
                console.log(JSON.stringify(msg))
                return
            }
            this.props.history.push('/')
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
                <AccountNav history={history}/>
                <h1>Create New Album</h1>
                <input onChange={this.updateAlbumName.bind(this)} type="text" id="name" placeholder="Album Name" /><br />
                <input onChange={this.updateAlbumDescription.bind(this)} type="text" id="description" placeholder="Description" /><br />
                    <Dropzone onDrop={this.uploadFiles.bind(this)}/>
                    {this.state.images.map(function(image, i){
                        console.log(image)
                        return <div key={i}>
                                <img src={image}/>
                                <div className="X"></div>
                             </div>
                    })}
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
