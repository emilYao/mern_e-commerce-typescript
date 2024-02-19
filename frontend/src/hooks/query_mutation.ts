import { useMutation } from "@tanstack/react-query";
import * as userApiClient from "./api-clients-user";
import { UserInputType } from "@/components/forms/Register";

export const  registerUser = ()=>{
    return useMutation(
        {mutationFn: userApiClient.registerUser}
        )
}
