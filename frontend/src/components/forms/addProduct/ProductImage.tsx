import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { ProductInputType } from "@/components/pages/admin/AddProduct";
import { useEffect } from "react";

export default function ProductImage() {
    const [images, setImages] = useState([]);
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<ProductInputType>();

  const onDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    url: string
  )=>{
    event.preventDefault()
    const newImage = images.filter((imageUrl)=>{
        return url !== imageUrl
    })
    setImages(newImage)
    setValue("images", newImage)
  }
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
   console.log(images)
  },[exitingImage]);

  
  return (
    <div>
     
      <input
        type="file"
        multiple
        accept="image/*"
        {...register("imageFile", {
          validate: (imageFile) => {
            console.log(imageFile);
            const totalLength = imageFile.length + exitingImage.length;
            if (totalLength < 1) {
              return "At least one image is required";
            }

            if (totalLength > 5) {
              return "Total number of images can't be more than 5";
            }
            return true;
          },
        })}
      />
      <div className="md:h-[15rem] border p-5 mt-2 rounded flex gap-5 justify-start items-center">
      {
        exitingImage && images.map((url, key)=>{
            return (
                <div key={key} className="md:h-[12rem] group md:w-[10rem] hover:scale-105 relative flex-wrap">
                <div className="md:h-[12rem] md:w-[10rem] group-hover:z-[10] absolute flex justify-center items-center top-0 left-0 bg-slate-900 opacity-[0.7] -z-10">
                    <button type="button" className="text-white z-[20] block " onClick={(event)=>onDelete(event, url)}>Delete</button>
                </div>
                <img src={url} alt={url} className="md:h-[12rem] md:w-[10rem] bg-no-repeat" />

                </div>
            )
        })
      }
      </div>
      <p className="text-red-400">{errors.imageFile?.message}</p>

         
    </div>
  );
}
