const INITAL_STATE = {
    latitude: false,
    longitude: false,
    hasPermission: false
}

export default function Filter( state = INITAL_STATE, action ) {

    const { userPosition } = action

    switch (action.type) {
        
        case 'GEOLOCATION':  

            console.log('GEOLOCATION REDUCER')
            console.log(userPosition)
            console.log('=----------- GEOLOCATION REDUCER ---------------=');
            
            return { ...state, latitude: userPosition.latitude, longitude: userPosition.longitude, hasPermission: true };

        default:

            return state;

    }

}