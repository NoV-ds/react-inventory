import React, { useState } from 'react'
import classes from './product.module.css'
import formClasses from './productform.module.css'

const ProductList = (props) => {
    let products = [
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

    

    //define edit product state
    const [editProduct, setEditProduct] = useState({
        id: "",
        name: "",
        price: "",
        description: "",
        expirydate: Date()
    })

    //set edit product data to state
    const handleEdit = (data) => {
        setEditProduct(data)
    }

    //define expand description state
    const [isReadMore, setIsReadMore] = useState({
        value: true,
        index: 0
    });

    //define expand description with boolean state
    const handleDescription = (count) => {
        if (isReadMore){
            setIsReadMore((prev) => ({
                value: false,
                index: count
            }))
        }
        else {
            console.log(isReadMore)
            setIsReadMore((prev) => ({
                value: true,
                index: count
            }))
        }
    }

    //format date to get proper local string output
    function formatDate(date) {
        const newDate = new Date(date)
        return newDate.toLocaleDateString('en-us', {day: "numeric", month: "long", year: "numeric"})
    }

    //handling updates on changes and sending to state
    const handleEditChange = (event) => {
        console.log(event.target.value)
        const {name, value} = event.target
        setEditProduct({...editProduct, [name]: value})
    }

    //Handling submission of update form and sending data using props to parent componant
    const handleSubmitForm = (event) => {
        event.preventDefault()
        console.log(editProduct)
        const product = {
            ...editProduct
          }
        props.updateProduct(product)
        console.log(product)
        
        setEditProduct({
          id: "",
          name: "",
          price: "",
          description: "",
          expirydate: ""
        })
  
    }

    const handleDelete = product => {
        props.deleteProduct(product)
    }

    const handleSearch = event => {
        setSearch(event => event.target.value)
    }

    const [search, setSearch] = useState()

    // const filterProduct = props.products.length>0?props.products.filter(product => (
    //     product.name.toLowerCase().includes(search.toLowerCase())
    // )):[]

    const [currentPage, setCurrentPage] = useState()
    const itemsPerPage = 5

    //Pagination
    const indexOfLastProduct = currentPage*itemsPerPage
    const indexOfFirstProduct = indexOfLastProduct-itemsPerPage

    const currentProducts = props.products.length > 5?props.products.slice(
        indexOfFirstProduct, indexOfLastProduct
    ):props.products

    //total count
    const totalPages = Math.ceil(props.products.length / itemsPerPage)

    return (
        <div className={classes.productlist}>
            <h2>Product List</h2>
            {/* <div className={`${formClasses.container} mb-2`}>
                <form>
                    <div className={formClasses.formgroupinput}>
                        <input type="text" placeholder='search text' value={search} onChange={handleSearch} />
                    </div>
                </form>
            </div> */}
            <table>
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Expiry Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                        {
                        currentProducts.map((prod, count=1) => (
                            <tr key={prod.id}>
                                <td>{count++}</td>
                                <td>{prod.name}</td>
                                <td>{prod.price}</td>
                                <td >{
                                    prod.description.length < 5
                                    ? prod.description
                                    : isReadMore.value === false && isReadMore.index === prod.id
                                    ? prod.description.substring(0, 5)
                                    : prod.description
                            }
                            <a href='#' onClick={() => handleDescription(prod.id)}>{
                                isReadMore.value === false && isReadMore.index === prod.id
                                ?"...view more"
                                :"...view less"
                            }
                            </a></td>
                            <td>{formatDate(prod.expirydate)}</td>
                            <td>
                                <button type="button" style={{margin: "5px"}} onClick={() => handleEdit(prod)}>Edit</button>
                                <button type="button" onClick={() => handleDelete(prod)}>Delete</button>
                            </td>
                           </tr> 
                        ))
                    }
                </tbody>
            </table>
            <div>

            </div>
            <div className={`${formClasses.container}`}>
                <h2>Product Update Form</h2>
                <form onSubmit={handleSubmitForm} >
                    <div className={formClasses.formgroupinput}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' value={editProduct.name} onChange={handleEditChange} />
                    </div>
                    <div className={formClasses.formgroupinput}>
                        <label htmlFor="price">Price</label>
                        <input type="text" name='price' value={editProduct.price} onChange={handleEditChange} />
                    </div>
                    <div className={formClasses.formgroupinput}>
                        <label htmlFor="description">Description</label>
                        <input type="text" name='description' value={editProduct.description} onChange={handleEditChange} />
                    </div>
                    <div className={formClasses.formgroupinput}>
                        <label htmlFor="expirydate">Expiray Date</label>
                        <input type="date" name='expirydate' value={editProduct.expirydate} onChange={handleEditChange} />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}

export default ProductList