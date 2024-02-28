import multer from "multer"
import {v2 as cloudinary} from "cloudinary"

const storage = multer.memoryStorage();

const upload = multer({storage:storage,limits: { fileSize: Infinity,fieldSize: Infinity}})


export const upLoadFile = upload.fields([{ name: 'images', maxCount: 6 }, { name: 'Videos', maxCount: 5 }])




export async function upLoadImages(imageFile: string[]| string) {
    let image:string[] = []
        if (typeof imageFile == 'string'){
            image.push(imageFile)
        }else if (typeof imageFile == 'object'){
            image = imageFile
        }
      
    const uploadPromises = image.map(async (image) => {
        // const b64 = Buffer.from(image.buffer).toString("base64");
        // let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.uploader.upload(image, { folder: "myImages" });
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}



export async function upLoadVideo(videoFile:string[] | string){
    let videos:string[] = []
        if (typeof videoFile == 'string'){
            videos.push(videoFile)
        }else if (typeof videoFile == 'object'){
            videos = videoFile
        }
    const uploadPromises = await videos.map(async (video)=>{
       
        const res = await cloudinary.uploader.upload_large(`${video}`, {
            resource_type:"video",
             folder: "myVideos" 
        })
        return res.url;
    })
    const videoUrls = await Promise.all(uploadPromises);
    return videoUrls;
}