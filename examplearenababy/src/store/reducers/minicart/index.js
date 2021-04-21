const INITAL_STATE = [

]

export default function MiniCart( state = INITAL_STATE, action ) {

    switch (action.type) {

        case 'ADD_TO_CART':  
            console.log('ADD TO CART')
            console.log(action.item.seller);
            console.log(action.item.product);
            console.log("---")
            console.log(state)
            console.log('=----------- ADD TO CART ---------------=');
            
            return [ ...state, { seller: action.item.seller, product: action.item.product }];
        
        case "REMOVE_ITEM_MINICART":
                console.log("REMOVE_ITEM_MINICART")
                console.log(state)
                console.log("=--")
                console.log(state.filter( item =>  item.product.productId != action.productId ))
                console.log(" -------------= REMOVE_ITEM_MINICART  =---------")
                state = state.filter( item =>  item.product.productId != action.productId );

            return state;

        default:
            console.log("caiiiiiiiiiiiiu no deafult")
            return state;

    }

}