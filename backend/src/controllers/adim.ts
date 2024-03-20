import {Request, Response} from "express"
import axios from "axios";


export const approvePayment = async (req:Request, res:Response)=>{

    const {reference} = req.params;

    try{
        axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAY_STACK_SECRET}`
              },
        }).then((response)=>{
            console.log(response)
            return res.send(response.data)

        }).catch((error)=>{
            console.log(error)
            return res.status(500).send(error)
        })
    }catch(error){
        console.log(error)
        return res.status(500).send("Sorry something went wrong");
    }
}