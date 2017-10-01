import React, { Component } from 'react'
import { Header, ImageBoard, AccountNav, AlbumBoard } from '../modules'
import {Router, Route, Redirect, Link, withRouter } from 'react-router-dom'
import { APIManager } from '../utils'
import ReactDOM from 'react-dom'
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';
import { compose, withProps, lifecycle } from "recompose";
const Waypoint = require('react-waypoint');
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";


export default class Album extends Component {
    constructor(){
        super()
        this.toLatLng.bind(this),
        this.loadMore = this.loadMore.bind(this),
        this.toRelative = this.toRelative.bind(this),
        this.toFixed = this.toFixed.bind(this),
        this.handleScroll = this.handleScroll.bind(this),
        this.state = {
            images: [],
            center: { lat: 25.03, lng: 121.6 },
            limit: 6,
            fixed: false
        }
    }

    toLatLng (coord) {
        if (coord == undefined) {
            return
        }
        const latLng = {lat: coord[1], lng: coord[0]}
        return latLng
    }

    componentWillMount(){
        APIManager.get(`/api/album/${this.props.match.params.id}`, {limit: this.state.limit}, (err, response) => {
            if(err){
                let msg = err.message || err
                console.log(msg)
                return
            }

            let images = response.result


            this.setState({
                images: images,
                center: this.toLatLng(images[0].albums.images.location)
            })

        })
    }


    handleScroll(location){
        this.setState({
            center: this.toLatLng(location)
        })
    }

    loadMore(){
        this.setState({
            limit: this.state.limit+=3
        })
        APIManager.get(`/api/album/${this.props.match.params.id}`, {limit: this.state.limit}, (err, response) => {
            if(err){
                let msg = err.message || err
                console.log(msg)
                return
            }

            let images = response.result

            this.setState({
                images: images
            })
        })
    }

    toRelative(){
        this.setState({
            fixed: false
        })
    }

    toFixed(){
        this.setState({
            fixed: true
        })
    }


    render(){

        const Map = compose(
              withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAsv9Hz2-CqDOgrb4FBSkfC-4aTiJL13cI",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div className="mapStyle" className={(this.state.fixed) ? "mapFixed" : "mapRelative"} style={{height: `100vh`, float: `right`}} />,
                mapElement: <div className="mapStyleWidth" style={{ width: `40vw`, height: `100%`}} />,
                center: this.state.center,
              }),
              withScriptjs,
              withGoogleMap,
            )(props =>
              <GoogleMap
                defaultZoom={14}
                defaultCenter={props.center}
              >
              {this.state.images.map((image, i) => {
                  return (
                      <Marker key={i}
                          position={this.toLatLng(image.albums.images.location)}
                      />
                  )
              })}
              </GoogleMap>
            );


        const toPublicId = (image) => {
            return image.slice(62, image.length)
        }


        return(
            <div>
                <Header />
                <Waypoint
                    onEnter={ () => this.toRelative() }
                    onLeave={ () => this.toFixed() }/>
                <Map />
                <div className="albumImageBoard">
                    <CloudinaryContext  cloudName="djswgrool" fetchFormat="auto" >
                      <div className="image-holder" ref="imgDiv">

                          {this.state.images.map((image, i) => {
                              return (
                                  <div className="responsive" key={i}>
                                      <div className="img">
                                          <a target="_blank" href={`http://res.cloudinary.com/djswgrool/image/upload/${toPublicId(image.albums.images.url)}`}>
                                              <Image publicId={toPublicId(image.albums.images.url)} responsive style={{width: '100%'}} >
                                                  <Transformation
                                                      crop="scale"
                                                      width="auto"
                                                      responsive_placeholder="blank"
                                                  />
                                              </Image>
                                          </a>
                                      </div>
                                     <Waypoint
                                        onEnter={ () => this.handleScroll(image.albums.images.location)}/>
                                  </div>

                              )
                          })
                      }
                      </div>
                      <Waypoint
                        onEnter={ () => this.loadMore()}
                        bottomOffset='-500px'/>
                    </CloudinaryContext>
                </div>
            </div>
        )
    }
}
