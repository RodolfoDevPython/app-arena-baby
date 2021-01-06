const INITAL_STATE = [

]

export default function step( state = INITAL_STATE, action ) {

    switch (action.type) {

        case 'FILTER':  
            console.log('FILTERRR REDUCER')
            console.log(action.checkedItem);
            console.log('=----------- FILTERRR REDUCER ---------------=');
            
            return action.checkedItem;

        case 'CLEAR_FILTER':  
            return INITAL_STATE;
        default:

            return state;

    }

}