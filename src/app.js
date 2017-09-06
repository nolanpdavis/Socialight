import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './stores'
import { Provider } from 'react-redux'
import { Account, Albums, Images, Profile, Signup, Login, NewAlbum } from './pages'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
    render(){
        return(
            <Provider store={ store.configureStore() }>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Images} />
                        <Route path="/map" component={Map} />
                        <Route path="/albums" component={Albums} />
                        <Route path="/account" component={Account} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="/newalbum" component={NewAlbum} />
                    </Switch>
                </BrowserRouter>
            </Provider>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
