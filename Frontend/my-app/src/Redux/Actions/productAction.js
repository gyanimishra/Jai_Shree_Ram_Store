import axios from 'axios'
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../Constants/productConstants"


// getallproducts........................................................
export const getAllProducts =(keyword = "",category)=>async(dispatch)=>{
try {
    dispatch({
        type:ALL_PRODUCT_REQUEST
    })
    let link = `http://localhost:4000/api/v1/Allproducts?keyword=${keyword}`

    if (category) {
        link = `http://localhost:4000/api/v1/Allproducts?keyword=${keyword}&category=${category}`;
      }
    
    const { data } = await axios.get(link);
   
    dispatch({
        type:ALL_PRODUCT_SUCCESS,
        payload:data
    })
} catch (error) {
    dispatch({
        type:ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
    })
}
}

// get singal products...............................................

export const getProductDetails = (id)=> async(dispatch)=>{
    try {
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        })
        const {data} = await axios.get(`http://localhost:4000/api/v1/getProductdetails/${id}`)
        dispatch({
      type:PRODUCT_DETAILS_SUCCESS,
      payload:data.product
        })
        
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
    }




    // Clearing Errors...........................................
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  