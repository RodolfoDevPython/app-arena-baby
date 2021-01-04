const INITAL_STATE = {
    FieldValueId: 0,
    FieldId: 0,
}

export default function step( state = INITAL_STATE, action ) {

    console.log(action)
    switch (action.type) {

        case 'FILTER':
            
            return { FieldValueId: action.checkedItem.FieldValueId , FieldId: action.checkedItem.FieldId }

        default:

            return state;

    }

}