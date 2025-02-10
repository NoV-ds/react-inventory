import React from 'react'
import classes from './dashboard.module.css'
import ProductForm from './ProductForm';
import ProductList from './Productlist';

const Dashboard = () => {
    return (
        <div className={classes.dashboard}>
            <ProductForm />
            <ProductList />
        </div>
    );
}

export default Dashboard