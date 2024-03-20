export interface userCart{
    cart:{
        items:{
            productId:string,
            name:string,
            rating:number,
            images:string[],
            QTY: number,
            price: number
        }[],
        totalQTY: number,
        totalPrice:number
    }
}

export interface userInfo{
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber:string
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
