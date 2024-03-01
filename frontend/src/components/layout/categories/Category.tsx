import Product from "./Product";
import { shoe } from "@/data/data";
import { bags } from "@/data/data";
import { dress } from "@/data/data";

export default function Category() {
  return (
    <div className="grid grid-cols-3 gap-5 xl:px-[8rem] md:px-[5rem] 3xl:px-[30rem] h-[4rem] container mt-[2rem]" >
        <Product items={shoe}/>
        <Product items={bags}/>
        <Product items={dress}/>


    </div>
  )
}
