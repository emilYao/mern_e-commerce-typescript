
import { productReturnType } from "@/types/type";

import Items from "./Items";

interface props{
    title:string,
    items:productReturnType[],
}
export default function Product({title, items}:props) {
  return (
    <>
      <Items title={title} items={items} rows={3} isRelated={false}/>
    </>
  );
}
