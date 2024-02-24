import multer from "multer"
import {v2 as cloudinary} from "cloudinary"


const upload = multer({ storage: storage })


export const upLoadFile = upload.fields([{ name: 'productImages', maxCount: 6 }, { name: 'productVideo', maxCount: 5 }])




export async function upLoadImages(imageFile: Express.Multer.File[]) {

    const uploadPromises = imageFile.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}



async function upLoadVideo(videoFile: Express.Multer.File[]){
    const uploadPromises = await videoFile.map(async (video)=>{
       
        const res = await cloudinary.uploader.upload_large(`${video}`, {
            resource_type:"video",
            public_id:"myVidoes"
        })
        return res.url;
    })
}