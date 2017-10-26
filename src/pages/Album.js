import React, { Component } from 'react'
import { Header, ImageBoard, AccountNav, AlbumBoard } from '../modules'
import {Router, Route, Redirect, Link, withRouter } from 'react-router-dom'
import { APIManager } from '../utils'
import ReactDOM from 'react-dom'
import { Map, Marker, Popup, Tooltip, TileLayer } from 'react-leaflet'
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';
const Waypoint = require('react-waypoint');


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
            fixed: false,
            zoom: 12
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

    handleOnZoom(){
        const zoomLevel = this.refs.map.leafletElement.getZoom()
        this.setState({
          zoom: zoomLevel
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

        const toPublicId = (image) => {
            return image.slice(62, image.length)
        }

        const fixedStyle = {
            position: 'fixed',
            right: '0px',
            top: '0px'
        }

        const relativeStyle = {
            position: 'relative',
            float: 'right'
        }


        return(
            <div>
                <Header />
                <Waypoint
                    onEnter={ () => this.toRelative() }
                    onLeave={ () => this.toFixed() }/>
                <Map center={this.state.center} onZoomend={this.handleOnZoom.bind(this)} zoom={this.state.zoom} useFlyTo={true} ref="map" style={(this.state.fixed) ? fixedStyle : relativeStyle}>
                            <TileLayer
                              attribution='Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.'
                              url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                            />
                            <TileLayer
                              attribution='Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.'
                              url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}.png'
                            />
                                {this.state.images.map((image, i) => {
                                    return (
                                        <Marker key={i}
                                            position={this.toLatLng(image.albums.images.location)}
                                        />
                                    )
                                })}
                        </Map>
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
