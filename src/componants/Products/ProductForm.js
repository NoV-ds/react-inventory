import React, { useContext, useState } from 'react'
import classes from './productform.module.css'
import ProductProvider from '../../Context/ProductProvider'

const ProductForm = () => {
    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     console.log(product)
    // }
    const product_data = useContext(ProductProvider)
    const handleSubmit = event => {
      event.preventDefault()
      const newProduct = {
        ...product,
        id: Number
      }

      product_data.addProduct(newProduct)
      // console.log(newProduct)
      let last_id = product_data.products[product_data.products.length-1]
      setProduct({
        id: product_data.products.length > 0?last_id.id+1:0,
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
            <input type="text" name='name' required onChange={handleChange} />
        </div>
        <div className={classes.formgroupinput}>
            <label htmlFor="price">price</label>
            <input type="text" name='price' required onChange={handleChange} />
        </div>
        <div className={classes.formgroupinput}>
            <label htmlFor="description">Description</label>
            <input type="text" name='description' required onChange={handleChange} />
        </div>
        <div className={classes.formgroupinput}>
            <label htmlFor="expirydate">Expiry Date</label>
            <input type="date" name='expirydate' required onChange={handleChange} />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default ProductForm
