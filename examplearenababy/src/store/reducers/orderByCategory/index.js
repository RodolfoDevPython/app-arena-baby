const INITAL_STATE = [

]

export default function OrderBy( state = INITAL_STATE, action ) {

    switch (action.type) {

        case 'ORDER_BY':  
            console.log('ORDER BY REDUCER')
            console.log(action.orderBy);
            console.log(action.checkedItem)
            console.log('=----------- ORDER BY REDUCER ---------------=');
            
            return action.orderBy;
        
        default:

            return state;

    }

}