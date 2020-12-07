const INITAL_STATE = {
    step: 1,
    percent: 0.2
}

export default function step( state = INITAL_STATE, action ) {

    switch (action.type) {

        case 'NEXT_STEP':

            return { step: action.step  , percent: action.percent + 0.2 }
            
        case 'PREV_STEP':
        
            return { step: action.step , percent: action.percent - 0.2 }
    
        default:

            return state;

    }

}