import constants from '../constants'

export default {
    currentUserReceived: (profile) => {
        return {
            type: constants.CURRENT_USER_RECEIVED,
            profile: profile
        }
    },

    profileCreated: (profile) => {
        return {
            type: constants.PROFILE_CREATED,
            profile: profile
        }
    },

    albumCreated: (album) => {
        return {
            type: constants.ALBUM_CREATED,
            album: album
        }
    }
}
