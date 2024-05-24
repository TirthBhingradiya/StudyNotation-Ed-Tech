import React from "react";
import {toast} from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

export const getCatalogPageData=async(categoryId) =>{
    const toastId=toast.loading("loading..");
    let result=[];

    try{
        const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId,});


        if(!response?.data?.success)
        throw new Error("could not fetch Category Page and Data");

         result=response?.data;
    }
    catch(error)
    {
        console.log("CATALOG PAGE DATA API ERROR",error);
        toast.error(error.response);
        result=error.repsonse?.data;
    }
    toast.dismiss(toastId);
    return result;
}