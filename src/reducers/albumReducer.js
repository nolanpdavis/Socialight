import constants from '../constants'

var initialState = {
    images: []
}

export default (state = initialState, action) => {
    let updated = Object.assign({}, state)

    switch (action.type) {
        case constants.ALBUM_CREATED:
            {/*updated['images'] = action.album*/}
            console.log('images')
            return updated

        default:
            return state
    }
}
