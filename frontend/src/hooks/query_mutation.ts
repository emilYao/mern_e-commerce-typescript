import { useMutation } from "@tanstack/react-query";
import * as userApiClient from "./api-clients-user";
import { UserInputType } from "@/components/forms/user/Register";

export const  registerUser = ()=>{
    return useMutation(
        {mutationFn: userApiClient.registerUser}
        )
}
