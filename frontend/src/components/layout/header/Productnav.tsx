
import {headerNavAPI} from "@/data/data"
import { Link } from "react-router-dom"

export default function Productnav() {
  return (
    <div className="flex justify-center items-center gap-5 bg-white/80 overflow-x-auto py-1 ">
        {
            headerNavAPI.map((product:{name:string, image:string, url:string}, index:number)=>{
                return (
                    <Link to={product.url} key={index} className="">
                        <div className="w-[1.2rem] h-[1.2rem] overflow-hidden rounded-full bg-white">
                        <img src={product.image} alt={product.name} className="w-[1.2rem] h-[1.2rem] object-cover rounded-full"/>

                        </div>
                        <p className="text-[12px]">
                        {product.name}

                        </p>
                    </Link>
                )
            })
        }
    </div>
  )
}
