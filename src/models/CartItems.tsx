export interface Product{
    id:string,
    name:string,
    price:number,
    imgUrl:string
}
export interface CartItem{
    id:string,
    product:Product,
    amount:number
}
export type CartItems=CartItem[];