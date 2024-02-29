import { Input } from "@/components/ui/input"
import { CiSearch } from "react-icons/ci";


export default function SearchInput(){

    return (
        <div className="relative border bg-white/80">
        <Input
          type="search"
          className="w-full bg-transparent h-[2rem] pl-[2rem] text-slate-900 font-bold md:text-[1rem] focus-visible:ring-slate-600 focus:outline-none focus-visible:ring-1 focus:border-0"
        />
        <CiSearch
          size={21}
          className="text-slate-900 absolute top-[50%] translate-y-[-50%] left-1 z-[5] cursor-pointer 3xl:scale-[2]"
        />
      </div>
    )
}