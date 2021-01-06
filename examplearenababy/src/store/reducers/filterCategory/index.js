const INITAL_STATE = {
    posFilter: -410,
    posOrder: 410,
    opacity: 0,
    elevation: 5,
}

export default function step( state = INITAL_STATE, action ) {

    switch (action.type) {

        case 'CLOSE_FILTER':

            return state = INITAL_STATE;

        case 'OPEN_BOX_FILTER':

            return { posFilter: action.posActive  , posOrder: 410 , opacity: 1, elevation: 8 }
            
        case 'OPEN_BOX_ORDER':
            console.log("OPEN_BOX_ORDER")
            console.log(state)
            console.log('=---------------------------=')
        
            return { posOrder: action.posActive , posFilter: -410, opacity: 1, elevation: 8 }
    
        default:

            return state;

    }

}