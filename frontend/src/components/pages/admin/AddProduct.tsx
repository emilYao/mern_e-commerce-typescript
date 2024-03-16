import ProductDetails from "@/components/forms/addProduct/ProductDetails";
import ProductImage from "@/components/forms/addProduct/ProductImage";
import ProductShortClip from "@/components/forms/addProduct/ProductShortClip";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import * as apiProduct from "../../../api/api-product";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { setProductSave } from "@/features/admin/adminSlice";
import { useAppDispatch } from "@/app/hooks";
export interface ProductInputType {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stockQuantity: number;
  rating: number;
  images: string[];
  imageFile: FileList | null;
  videoFile: FileList | null;
  video?: string[];
}

export default function AddProduct() {
  const dispatch = useAppDispatch();
  const [clearImage, setClearImage] = useState<boolean>(false);
  const methods = useForm<ProductInputType>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      brand: "",
      stockQuantity: 0,
      rating: 0,
      images: [],
      video: [],
    },
    // mode:"onChange"
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiProduct.addProduct,
    onSuccess: (data) => {
      toast.success("Product saved successfull");

      dispatch(setProductSave(true));
      // methods.reset({
      //   name: "PETROL POCKET DETAILED PRINTED CYCLING COLLAR BOY KNITTED T-SHIRT TKDSS22TS0973",
      //   description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      //   price: 0,
      //   brand: "",
      //   stockQuantity: 0,
        
      // });
    },
    onError: (error: any) => {
      if (error?.status == 404) {
        toast.error(error?.data?.message)
        toast.error(error?.data?.message?.errors[0]?.msg);
      } else {
        toast.error("Sorry something went wrong");
      }
    },
  });

  const onSubmit = (data: ProductInputType) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price?.toString());
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("stockQuantity", data.stockQuantity?.toString());
    formData.append("rating", data.rating?.toString());
   

    data.images.forEach((value) => {
      formData.append("images", value);
    });
    data.video?.forEach((value) => {
      formData.append("videos", value);
    });

    mutate(formData);
  };
  return (
    <div className=" h-full">
      <div className="text-center ">Add Product</div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <ProductDetails />

          <ProductImage clearImage={clearImage} />
          <ProductShortClip />
          <Button type="submit" disabled={isPending} className="relative">
            {isPending ? <Spinner /> : "Add Product"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
