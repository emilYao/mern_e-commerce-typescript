import ProductDetails from "@/components/forms/addProduct/ProductDetails";
import ProductImage from "@/components/forms/addProduct/ProductImage";
import { useForm, FormProvider, useFormContext } from "react-hook-form";


export interface ProductInputType {
  name: string,
  description: string,
  price: number,
  category:string,
  brand:string,
  stockQuantity: number,
  rating: number,
  images: string[],
  imageFile : FileList
}

export default function AddProduct() {
  const methods = useForm<ProductInputType>();

  // const { mutate, isPending } = useMutation({
  //   mutationFn: apiProduct.addProduct,
  //   onSuccess: (data) => {
  //       console.log(data)
  //   },
  //   onError: (error :String) => {
  //     console.log(error)
  //   },
  // });

  const onSubmit = ()=>{
    // console.log(data)
  }
  return (
    <div className=" h-full">
       <div className="text-center ">
            Add Product
        </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ProductDetails />

          <ProductImage/>
        </form>
      </FormProvider>
    </div>
  );
}
