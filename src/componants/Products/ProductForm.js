import React, { useState } from 'react'
import classes from './productform.module.css'

const ProductForm = (props) => {
    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     console.log(product)
    // }
    const handleSubmit = event => {
      event.preventDefault()
      const newProduct = {
        ...product,
        id: Date.now()
      }

      props.addProduct(newProduct)
      // console.log(newProduct)
      
      setProduct({
        id: "",
        name: "",
        price: "",
        description: "",
        expirydate: ""
      })
    }

    const [product, setProduct] = useState({
      id: "",
      name: "",
      price: "",
      description: "",
      expirydate: ""
    })

    const handleChange = (event) => {
      const {name, value} = event.target
      setProduct({...product, [name]: value})
    }
  return (
    <div className={classes.container}>
        <h2>Product Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.formgroupinput}>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' onChange={handleChange} />
        </div>
        <div className={classes.formgroupinput}>
            <label htmlFor="price">price</label>
            <input type="text" name='price' onChange={handleChange} />
        </div>
        <div className={classes.formgroupinput}>
            <label htmlFor="description">Description</label>
            <input type="text" name='description' onChange={handleChange} />
        </div>
        <div className={classes.formgroupinput}>
            <label htmlFor="expirydate">Expiry Date</label>
            <input type="date" name='expirydate' onChange={handleChange} />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default ProductForm
