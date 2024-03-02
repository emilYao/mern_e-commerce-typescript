

import VideoClip from "@/components/layout/header/VideoClip";
import Category from "@/components/layout/categories/Category";
import Sales from "@/components/layout/sales/Sales";
import Swipper from "@/components/layout/header/Swipper";
import { clip} from "@/data/data";

export default function Home() {
  return (
    <>
      <div className=" w-[2.5rem] md:w-[4rem] md:h-[25rem] h-[15rem] absolute top-[9.2rem]  left-2 md:left-[8rem] 3xl:left-[19.9rem] z-10">
        {clip.map((value, index) => {
          return (
            <VideoClip image={value.image} video={value.video} key={index} />
          );
        })}
      </div>
      <Swipper />

      <Category />

      <Sales />
    </>
  );
}
