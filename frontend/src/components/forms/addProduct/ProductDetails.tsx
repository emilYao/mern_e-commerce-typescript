import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Textarea } from "@/components/ui/textarea"

import { AiOutlineClose } from "react-icons/ai";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";

import * as apiProduct from "../../../api/api-product";

import Spinner from "../../Spinner";
const productSchema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    category:yup.string().required(),
    brand: yup.string().required(),
    stockQuantity: yup.number().required(),
    rating: yup.number().required()
  })
  .required();


export interface ProductInputType {
    name: string,
    description: string,
    price: number,
    category:string,
    brand:string,
    stockQuantity: number,
    rating: number
}

export default function ProductDetails() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductInputType>({
    resolver: yupResolver(productSchema ) ,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiProduct.addProduct,
    onSuccess: (data) => {
        console.log(data)
    },
    onError: (error :String) => {
      console.log(error)
    },
  });

  const onSubmit = (data:ProductInputType) => {
    mutate(data);
  };


  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center ">
            Add Product
        </div>

        <label htmlFor="productName">
          Product Name:
          <Input
            type="text"
            id="name"
            className="focus-visible:ring-slate-600 focus:outline-none md:w-[50%] focus-visible:ring-1 focus:border-0"
            {...register("name")}
          />
          <p className="text-red-400">{errors.name?.message}</p>
        </label>
        
        <div className="grid grid-cols-12 gap-[5rem]">
        <label htmlFor="description" className="col-span-8">
          Description
          <Textarea
            id="description"
            
            placeholder="Say something about the product."
            className="focus-visible:ring-slate-600 md:h-[5rem] focus-visible:ring-1 focus:outline-none focus:border-0"
            {...register("description")}
          />
          <p className="text-red-400">{errors.description?.message}</p>
        </label>

        <label htmlFor="price" className="col-span-4">
            Price
          <Input
            id="price"
            type="number"
            className="focus-visible:ring-slate-600 focus-visible:ring-1 focus:outline-none focus:border-0"
            {...register("price")}
          />
          <p className="text-red-400">{errors.description?.message}</p>
        </label>
        </div>
 
        
  
     

      <Button
        type="submit"
        disabled={isPending}
        className="relative"
      >
        {isPending ? <Spinner /> : "Create Account"}
      </Button>
  
    </form>
  );
}
