import React, { useState, useEffect } from 'react'
import classes from './dashboard.module.css'
import ProductForm from './ProductForm';
import ProductList from './Productlist';

const Dashboard = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const product = JSON.parse(window.localStorage.getItem('products'))
        console.log(product)
        setProducts(products)
    })

    useEffect(() => {
        window.sessionStorage.setItem('products', JSON.stringify(products))
    }, [products])

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
    }

    const deleteProduct = delProduct => {
        console.log(delProduct)
        products.map(
            product => (product.id === delProduct.id?window.sessionStorage.removeItem('product', JSON.stringify(product)):product)
        )

    }

    return (
        <div className={classes.dashboard}>
            <ProductForm addProduct={addProduct} products={products} />
            <ProductList 
            updateProduct={updateProduct} 
            products={products} 
            deleteProduct={deleteProduct}
            />
        </div>
    );
}

export default Dashboard