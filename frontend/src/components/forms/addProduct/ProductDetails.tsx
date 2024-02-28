import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";

import { ProductInputType } from "@/components/pages/admin/AddProduct";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

export default function ProductDetails() {
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<ProductInputType>();

  

  return (
    <div className="grid gap-5">
      <label htmlFor="name">
        Product Name:
        <Input
          type="text"
          id="name"
          className="focus-visible:ring-slate-600 focus:outline-none md:w-[50%] focus-visible:ring-1 focus:border-0"
          {...register("name", { required: "Product name is required" })}
        />
        <p className="text-red-400">{errors?.name?.message}</p>
      </label>

     
        <label htmlFor="description" className="col-span-8">
          Description
          <Textarea
            id="description"
            placeholder="Say something about the product."
            className="focus-visible:ring-slate-600 md:h-[5rem] focus-visible:ring-1 focus:outline-none focus:border-0"
            {...register("description", {
              required: "Description field is required",
            })}
          />
          <p className="text-red-400">{errors.description?.message}</p>
        </label>

        <label htmlFor="price" className="col-span-4">
          Price
          <Input
            id="price"
            type="number"
            className="focus-visible:ring-slate-600 focus-visible:ring-1 focus:outline-none focus:border-0"
            {...register("price", { required: "Price field is required" })}
          />
          <p className="text-red-400">{errors.price?.message}</p>
        </label>

      <label>
          Cateogry
          <Select onValueChange={(value)=>setValue("category", value,{shouldValidate:true})}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shoe">Shoe</SelectItem>
              <SelectItem value="cufflink">CuffLink</SelectItem>
              <SelectItem value="fabric">Fabric</SelectItem>
              <SelectItem value="bag">Bag</SelectItem>

            </SelectContent>
          </Select>
          <p className="text-red-400">{errors.category?.message}</p>
         
        </label>

      <label htmlFor="brand" className="col-span-4">
          Brand
          <Input
            id="brand"
            type="text"
            className="focus-visible:ring-slate-600 focus-visible:ring-1 focus:outline-none focus:border-0"
            {...register("brand", { required: "Brand field is required" })}
          />
          <p className="text-red-400">{errors.brand?.message}</p>
        </label>

        <label htmlFor="stockQuantity" className="col-span-4">
          Stock Quantity
          <Input
            id="stockQuantity"
            type="number"
            className="focus-visible:ring-slate-600 focus-visible:ring-1 focus:outline-none focus:border-0"
            {...register("stockQuantity", { required: "Stock quantity field is required" })}
          />
          <p className="text-red-400">{errors.stockQuantity?.message}</p>
        </label>
        
        <label htmlFor="rating" className="col-span-4">
          Rating
          <Input
            id="rating"
            type="number"
            className="focus-visible:ring-slate-600 focus-visible:ring-1 focus:outline-none focus:border-0"
            {...register("rating")}
          />
          <p className="text-red-400">{errors.rating?.message}</p>
        </label>
        

    </div>
  );
}
