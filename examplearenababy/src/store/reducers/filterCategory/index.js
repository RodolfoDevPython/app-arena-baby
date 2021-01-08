const INITAL_STATE = [

]

export default function Filter( state = INITAL_STATE, action ) {

    switch (action.type) {

        // case 'ORDER_BY':  
        //     console.log('ORDER BY REDUCER')
        //     console.log(action.orderBy);
        //     console.log(action.checkedItem)
        //     console.log('=----------- ORDER BY REDUCER ---------------=');
            
        //     return action.checkedItem ? [ ...action.checkedItem ,...action.orderBy ]: action.orderBy;
        
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