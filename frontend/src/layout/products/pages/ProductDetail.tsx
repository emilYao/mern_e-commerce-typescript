import { Button } from "@/components/ui/button";
import { productReturnType } from "@/types/type";
import { useLocation } from "react-router-dom";
import Items from "@/components/layout/sales/Items";
import { addToCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/app/hooks";


const ProductDetail = () => {
  const dispatch = useAppDispatch();

  const {
    item,
    items,
  }: { item: productReturnType; items: productReturnType[] } =
    useLocation().state;

  return (
    <div className=" container 3xl:px-[18rem]">
      <div className="grid md:grid-cols-12 md:h-[15rem] xl:h-[25rem] h-[100%]  gap-2 md:mb-[1rem]">
        <div className="grid md:col-span-5 md:gap-[1.5rem]  grid-cols-12">
          <div className=" relative col-span-3  bg-slate-100 w-[5rem] xl:w-[8rem]  px-[0.2rem]   ">
            <div className="absolute top-[50%]  translate-y-[-50%] left-[50%] translate-x-[-50%] overflow-y-auto h-[12rem] xl:h-[20rem] grid gap-3 ">
              {item.images.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="w-[3rem]  h-[3rem] xl:w-[5rem] xl:h-[5rem] md:w-[4rem] md:h-[4rem]  bg-white"
                  >
                    <img
                      src={image}
                      alt={item.id}
                      className="w-[3rem] h-[3.3rem]  md:w-[4rem] md:h-[4rem] xl:w-[5rem] xl:h-[5rem]"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-span-8 md:col-span-9 px-[1rem] ">
            <img
              src={item.images[0]}
              alt={item.name}
              className="object-fill w-[100%]  md:h-[15rem]  xl:h-[25rem]"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 md:col-span-7 gap-[1.3rem] ">
          <div className=" text-[12px] xl:text-[14px] 3xl:text-[1.2rem] grid gap-1 col-span-8 xl:col-span-7 xl:flex xl:flex-col">
            <p className="font-semibold xl:text-[20px] 3xl:font-bold 3xl:text-[25px] ">
              {item.name}
            </p>
            <p className="">{item.category}</p>
            <p className="">{item.rating}</p>

            <p className="text-justify ">{item.description}</p>
          </div>
          <div className="col-span-4 3xl:text-[1.2rem] flex flex-col gap-[0.5rem] xl:col-span-5 text-[12px] bg-slate-100 p-[0.5rem]">
            <p className="bg-slate-800 text-white text-center py-[1px] rounded-xl xl:py-2">
              {item.brand}
            </p>
            <p>
              Price : <span className="font-bold">GH {item.price}</span>
            </p>
            <p className="text-green-500 ">
              Stock : <span className="font-bold">{item.stockQuantity}</span>
            </p>
            <div className="xl:flex xl:gap-[1rem]">
              <Button
                type="button"
                className="text-[10px] xl:text-[12px] h-[2rem] xl:h-[2.2rem] w-[4.8rem] xl:w-[5rem] scale-95 xl:scale-100 3xl:h-[3rem] 3xl:w-[7rem] 3xl:text-[1rem] text-slate-950 font-semibold xl:px-[7px] bg-yellow-300 hover:bg-yellow-200 hover:text-slate-800"
                onClick={()=>dispatch(addToCart(item))}
              >
                Add To Cart
              </Button>
              <Button
                type="button"
                className="text-[10px] xl:text-[12px] h-[2rem] xl:h-[2.2rem] w-[4.8rem] xl:w-[5rem] scale-95 xl:scale-100 font-semibold xl:px-[7px] 3xl:h-[3rem] 3xl:w-[7rem] 3xl:text-[1rem]"
              >
                Watch Later
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[8rem] md:h-[10rem] xl:h-[15rem] 3xl:h-[18rem] ">
        <Items
          title="Related Products"
          items={items}
          rows={1}
          isRelated={true}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
