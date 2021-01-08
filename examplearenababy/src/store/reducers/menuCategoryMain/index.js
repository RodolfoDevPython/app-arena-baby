const INITAL_STATE = [

]

import api from "../../../server";

export default function CategorySeleted( state = INITAL_STATE, action ) {

    switch (action.type) {

        case 'CATEGORY_SELETED':  
            // console.log('CATEGORY_SELETED REDUCER')
            // // console.log(action.category);
            // // console.log(action);
            // console.log('=----------- CATEGORY_SELETED REDUCER ---------------=');
            
            // api.get(`/catalog_system/pub/products/search?fq=C:${action.category.id}`)
            // .then( (resp) => console.log((resp.data).length))

            return { category: action.category, search: action.search };
        
        default:

            return state;

    }

}