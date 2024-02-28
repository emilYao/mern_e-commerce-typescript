import ProductDetails from "@/components/forms/addProduct/ProductDetails";
import ProductImage from "@/components/forms/addProduct/ProductImage";
import ProductShortClip from "@/components/forms/addProduct/ProductShortClip";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import * as apiProduct from "../../../api/api-product";
import { useMutation } from "@tanstack/react-query";


export interface ProductInputType {
  name: string,
  description: string,
  price: number,
  category:string,
  brand:string,
  stockQuantity: number,
  rating: number,
  images: string[],
  imageFile : FileList | null,
  videoFile: FileList | null,
  video: string[]
}


export default function AddProduct() {
  const methods = useForm<ProductInputType>({
    // mode:"onChange"
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

  const onSubmit = (data: ProductInputType)=>{
    const formData = new FormData();
    
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price?.toString())
    formData.append("category", data.category)
    formData.append("brand", data.brand)
    formData.append("stockQuantity", data.stockQuantity?.toString())
    formData.append("rating", data.rating?.toString())
    console.log(formData)
  
    data.images.forEach((value) => {
      formData.append("images", value);
    });
    data.video.forEach((value)=>{
      formData.append("videos", value);
    })

   mutate(formData)

  }
  return (
    <div className=" h-full">
       <div className="text-center ">
            Add Product
        </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} encType="multipart/form-data" >
          <ProductDetails />

          <ProductImage/>
          <ProductShortClip/>
          <Button type="submit" >Add Product</Button>
        </form>
      </FormProvider>
    </div>
  );
}
