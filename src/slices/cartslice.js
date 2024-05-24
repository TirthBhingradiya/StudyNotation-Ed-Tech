import {createSlice} from "@reduxjs/toolkit"
import {toast} from "react-hot-toast"

const initialState ={
    cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart"))
    :[],
    total:localStorage.getItem("total")?JSON.parse(localStorage.getItem("total")):0,

    totalItems:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems"))
    :0,

}

const cartslice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action) =>{
            const course=action.payload
            const index=state.cart.findIndex((item) =>item._id === course._id)

            if(index>=0){
                toast.error("Cource already in cart")
                return
            }
            state.cart.push(course)
            state.totalItems++;
            state.total+=course.price
            //update to localstorage

            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

            toast.success("Course added to cart")
        },

        removeFromCart:(state,action) =>{
            const courseId=action.payload
            const index=state.cart.findIndex((item) =>item._id=== courseId)


            if(index>=0){
                state.totalItems--
                state.total-=state.cart[index].price
                state.cart.splice(index,1)

                localStorage.setItem("cart",JSON.stringify(state.cart))
                localStorage.setItem("total",JSON.stringify(state.total))
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

                
                toast.success("Cource removed From cart")
            }
        },

        resetCart:(state) =>{
            state.cart =[]
            state.total=0;
            state.totalItems=0

            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")


        },
    },
})

export const {addToCart,removeFromCart,resetCart}=cartslice.actions

export default cartslice.reducer