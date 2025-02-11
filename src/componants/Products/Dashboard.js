import React, { useState, useEffect } from 'react'
import classes from './dashboard.module.css'
import ProductForm from './ProductForm';
import ProductList from './Productlist';

const Dashboard = () => {

    const product = JSON.parse(localStorage.getItem('products'), [])

    const [products, setProducts] = useState(!product?[]:product)

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products))
        // eslint-disable-next-line
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
            product => (product.id === delProduct.id?localStorage.removeItem('products', JSON.stringify(delProduct.id)):delProduct)
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