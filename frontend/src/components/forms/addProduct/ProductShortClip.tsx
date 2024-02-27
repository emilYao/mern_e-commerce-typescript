import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { ProductInputType } from "@/components/pages/admin/AddProduct";
import { useEffect } from "react";

export default function ProductShortClip() {
  const [video, setVideo] = useState([]);
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<ProductInputType>();

  register("video", {
    validate: {
      // less: (videos) => videos.length > 0 || "At least one video is required",
      greater: (videos) =>
        videos.length < 5 || "Total number of video can't be more than 5",
    },
  });
  const onDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    url: string
  ) => {
    event.preventDefault();
    const newVideo = video.filter((video) => {
      return url !== video;
    });
    setVideo(newVideo);
  };

  useEffect(() => {
    setValue("video", video);
    setValue("videoFile", null);
  }, [video]);

  const exitingVideo = watch("videoFile");

  useEffect(() => {
    if (exitingVideo) {
      const videoArray: any = [...video];

      for (let i = 0; i < exitingVideo.length; i++) {
        const reader = new FileReader();

        reader.onloadend = () => {
          videoArray.push(reader.result as string);

          if (videoArray.length - video.length === exitingVideo.length) {
            let newVideoArray: any = [...new Set(videoArray)];
            setVideo(newVideoArray);
          }
        };

        reader.readAsDataURL(exitingVideo[i]);
      }
    }
    setValue("video", video);
    console.log(video);
  }, [exitingVideo]);

  return (
    <div>
        Add product short clip video <br/>
      <input type="file" multiple accept="video/*" {...register("videoFile")} />
      <p className="text-red-400">{errors.video?.message}</p>

      <div className="md:min-h-[15rem] border p-5 mt-2 rounded flex flex-wrap gap-5 justify-start items-center">
        {video &&
          video.map((url, key) => {
            return (
              <div key={key} className="md:h-[12rem] md:w-[10rem]  relative group">
                <div className="md:h-[8rem] md:w-[10rem] group-hover:z-[10] absolute flex justify-center items-center top-0 left-0 bg-slate-900 opacity-[0.7] -z-10">
                  <button
                    type="button"
                    className="text-white z-[20] block "
                    onClick={(event) => onDelete(event, url)}
                  >
                    Delete
                  </button>
                </div>
                <video
                  
                  className="md:h-[12rem] md:w-[10rem]  object-cover group-hover:z-"
                  controls
                  controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foo bar"
                  muted
                  disablePictureInPicture={true}
                >
                  <source
                    src={url}
                    key={key}
                    className="md:h-[12rem] md:w-[10rem] "
                  />
                </video>
              </div>
            );
          })}
      </div>
    </div>
  );
}
