import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { ProductInputType } from "@/components/pages/admin/AddProduct";
import { useEffect } from "react";
import { setProductSave } from "@/features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

interface props{
  clearImage: boolean,

}
export default function ProductImage({clearImage}:props) {
  const dispatch = useAppDispatch();
    const productSave = useAppSelector(state=>state.admin.productSave)
    const [images, setImages] = useState([]);
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<ProductInputType>();
 
  register("images",{
    validate: {    
      less : (image)=>( image.length ) > 0 || "At least one image is required",
      greater: (image)=>( image.length) < 10 || "Total number of images can't be more than 5"
    },
    
  })
  const onDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    url: string
  )=>{
    event.preventDefault()
    const newImage = images.filter((imageUrl)=>{
        return url !== imageUrl
    })
    setImages(newImage)

  }

  useEffect(()=>{
    setValue("images", images)
    setValue("imageFile", null)
    console.log(productSave)
    if (productSave == true){
      setImages([]);
    dispatch(setProductSave(false))

    }  
  
  }, [images])

  const exitingImage = watch("imageFile");

  useEffect(() => {

    if (exitingImage) {
      const imageArray:any = [...images];

      for (let i = 0; i < exitingImage.length; i++) {
        const reader = new FileReader();

        reader.onloadend = () => {
          imageArray.push(reader.result as string);

          if ((imageArray.length - images.length) === exitingImage.length) {
            let newImageArray:any = [... new Set(imageArray)]
            setImages(newImageArray );
          }
        };

        reader.readAsDataURL(exitingImage[i]);
      }
    }
   setValue("images", images)
   
  },[exitingImage]);

  
  return (
    <div>
     <p>Add product image</p>
      <input
        type="file"
        multiple
        accept="image/*"
        {...register("imageFile")}
      />
      <p className="text-red-400">{errors.images?.message}</p>

      <div className="md:min-h-[15rem] border p-5 mt-2 rounded flex flex-wrap gap-5 justify-start items-center">
      {
        images && images.map((url, key)=>{
            return (
                <div key={key} className="md:h-[12rem] group md:w-[10rem] hover:scale-105 relative ">
                <div className="md:h-[12rem] md:w-[10rem] group-hover:z-[10] absolute flex justify-center items-center top-0 left-0 bg-slate-900 opacity-[0.7] -z-10">
                    <button type="button" className="text-white z-[20] block " onClick={(event)=>onDelete(event, url)}>Delete</button>
                </div>
                <img src={url} alt={url} className="md:h-[12rem] md:w-[10rem] bg-no-repeat" />

                </div>
            )
        })
      }
      </div>

         
    </div>
  );
}
