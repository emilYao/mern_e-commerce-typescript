export interface userCart{
    cart:{
        items:{
            productId:string,
            QTY: number,
            price: number
        }[],
        totalQTY: number,
        totalPrice:number
    }
}
export interface productReturnType {
    _id: string,
    name:string,
    description:string
    price: string,
    category: string,
    brand: string,
    stockQuantity: string,
    images: string[],
    videos:string[],
    rating: string,
    createdAt:Date,
    updatedAt:Date,
    
}
