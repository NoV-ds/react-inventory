import React, { useState } from 'react'
import classes from './productform.module.css'

const ProductForm = (props) => {

  const handleSubmit = event => {
      event.preventDefault()
      let last_id = props.products[props.products.length-1]
      console.log(last_id)
      const newProduct = {
        ...product,
        id: typeof(last_id) !== "undefined"?last_id.id+1:1
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
            <input type="text" name='name' required value={product.name} onChange={handleChange} />
        </div>
        <div className={classes.formgroupinput}>
            <label htmlFor="price">price</label>
            <input type="number" name='price' required value={product.price} onChange={handleChange} />
        </div>
        <div className={classes.formgroupinput}>
            <label htmlFor="description">Description</label>
            <input type="text" name='description' required value={product.description} onChange={handleChange} />
        </div>
        <div className={classes.formgroupinput}>
            <label htmlFor="expirydate">Expiry Date</label>
            <input type="date" name='expirydate' required value={product.expirydate} onChange={handleChange} />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default ProductForm
