import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    signupData:null,
    loading:false,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) :null,
    
};

const authslice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupData(state,value) {
            state.signupData=value.payload;
        },
        setLoading(state,value) {
            state.loading=value.payload;

        },
        setToken(state,value){
state.token=value.payload;

        },
    },
});

export const{setSignupData,setLoading,setToken}=authslice.actions;
export default authslice.reducer;