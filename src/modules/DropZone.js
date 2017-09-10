import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'
import actions from '../actions'
import { connect } from 'react-redux'

class DropZone extends Component {
    constructor(){
        super()
        this.state = {
            images: [
                url: '',
                userName: '',
                location: ''
            ]
        }
    }

    uploadFiles(files){

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
        files.forEach((file) => {
            console.log('file', file)
            uploadRequest.attach('file', file)

            Object.keys(params).forEach((key) => {
                uploadRequest.field(key, params[key])
            })

            uploadRequest.end((err, resp) => {
                if (err){
                    alert(err, null)
                    return
                }
            console.log('UPLOAD COMPLETE: '+JSON.stringify(resp.body))
        })



        {/*}    const uploaded = resp.body
            const imageUrl = resp.body.secure_url
            let images = Object.assign({}, this.state.image)
            images.url = imageUrl
            images.currentUser = this.props.currentUser.userName
            this.setState({
                image: images
            })*/}
        })

    }
    render(){
        return(
            <div>
                <Dropzone onDrop={this.uploadFiles.bind(this)}/>
                <img src={this.state.image.url} />
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

export default connect(stateToProps, dispatchToProps)(DropZone)
