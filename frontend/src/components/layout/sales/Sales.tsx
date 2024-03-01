import Product from "./Product";
import { shoe, bags, dress } from "@/data/data";

export default function Sales() {
  return (
    <div className="grid gap-[1rem] md:gap-[5rem] container mt-[5.2rem] xl:mt-[18rem] 3xl:mt-[30rem] md:mt-[14rem]">
        <Product title="Popular Shoe Sales" items={shoe}/>
        <Product title="Best Of Bags Sales" items={bags}/>
        <Product title="Popular Shoe Sales" items={dress}/>

    </div>
    
  )
}
