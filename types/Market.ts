export default  interface Product {
    product_id: number
    priceUsd : number
    priceMel : number
    link : string
    name : string
    images:Image[]
}
export  interface Image {
    itemImageSrc: string
}
