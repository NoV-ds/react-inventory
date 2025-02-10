// import Products from "../componants/Products/productData";
import myContext from "./MyContext";
import React, { useEffect, useState } from 'react'

const ProductProvider = (props) => {
    let Products = [
        {
            id:1,
            name:"Shirts",
            description: "Black colored shirt",
            price:2000,
            expirayDate: new Date(2025,2,15)
        },
        {
            id:2,
            name:"pencil box",
            description: "Solid steel pencil box",
            price:2000,
            expirayDate: new Date(2025,2,15)
        },
        {
            id:3,
            name:"Pant",
            description: "Black colored",
            price:2000,
            expirayDate: new Date(2025,2,15)
        },
        {
            id:4,
            name:"Shirts",
            description: "Black colored",
            price:2000,
            expirayDate: new Date(2025,2,15)
        },
        {
            id:5,
            name:"Head Phones",
            description: "Good quality",
            price:10000,
            expirayDate: new Date(2025,2,15)
        }
    ]

    const [products, setProducts] = useState([        {
        id:Number,
        name:"",
        description: "",
        price:Number,
        expirayDate: new Date()
    }
])
    // useEffect(() => {
    //     setProducts(Products)
    // }, [])
    // console.log(products)

    // useEffect(() => {
    //     console.log(Products)
    //     const product = JSON.parse(window.sessionStorage.getItem('products'))
    //     setProducts(() => product.length > 0?product:Products)
    //     // eslint-disable-next-line
 
    // }, [])


    const updateProduct = updatedProduct => {
        setProducts(
            products.map(
            product => (product.id === updatedProduct.id ? updatedProduct : product)
        )
    );
    };

    const addProduct = (product) => {
        console.log(products)
        setProducts([...products, product])
        window.sessionStorage.setItem('products', JSON.stringify(products))
    }

    const deleteProduct = delProduct => {
        console.log(delProduct)
        products.map(
            product => (product.id === delProduct.id?window.sessionStorage.removeItem('product', JSON.stringify(product)):product)
        )
    }

    return (
    <myContext.Provider value={{products, updateProduct, addProduct, deleteProduct}}>
      {props.children}
    </myContext.Provider>
  )
}

export default ProductProvider
