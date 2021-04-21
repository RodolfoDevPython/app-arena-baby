const INITAL_STATE = {
    item_url: ""
}

export default function Checkout( state = INITAL_STATE, action ) {

    switch (action.type) {

        case 'GO_TO_CHECKOUT':  
            console.log('NO REDUCER DO CHECKOUT')
            // console.log(action.item.seller);
            // console.log(action.item.product);
            // console.log("---")
            // console.log(state)

            // sku=343&qty=1&seller=arenababymauasp
            console.log(action.items)
            console.log('=----------- CHECKOUT ---------------=');
            
            return { item_url:  action.items } ;
        
        case "GO_BACK_CHECKOUT":
                console.log("GO_BACK_CHECKOUT")
                console.log(state)
                console.log("=--")
                
                console.log(" -------------= GO_BACK_CHECKOUT  =---------")

            return state;

        default:
            
            return state;

    }

}