import React, { useState } from 'react'
import classes from './product.module.css'
import formClasses from './productform.module.css'
import { Link } from 'react-router'

const ProductList = (props) => {

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
        if (isReadMore) {
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
        return newDate.toLocaleDateString('en-us', { day: "numeric", month: "long", year: "numeric" })
    }

    //handling updates on changes and sending to state
    const handleEditChange = (event) => {
        console.log(event.target.value)
        const { name, value } = event.target
        setEditProduct({ ...editProduct, [name]: value })
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
            expirydate: Date
        })

    }

    // handle for deleting the data from a list
    const handleDelete = product => {
        props.deleteProduct(product)
    }


    const [search, setSearch] = useState()

    //handling the searching value
    const handleSearch = event => {
        setSearch(() => event.target.value)
    }


    //filtering the product list according to search variable and if no search variable then sending the all product list
    const filterProduct = props.products.length > 0 ? props.products.filter(product => (
        product.name.toLowerCase().includes(typeof (search) === "undefined" ? "" : search.toLowerCase())
    )) : []

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    //Pagination
    const indexOfLastProduct = currentPage * itemsPerPage
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage

    // setting the current page products
    const currentProducts = filterProduct.length > 5 ? filterProduct.slice(
        indexOfFirstProduct, indexOfLastProduct
    ) : filterProduct

    //total count
    const totalPages = Math.ceil(props.products.length / itemsPerPage)

    //handle previous page product list
    const handlePagePrevious = () => {
        setCurrentPage((page) => page > 1 ? page - 1 : page)
    }

    //handle next page product list
    const handlePageNext = () => {
        setCurrentPage((page) => page < totalPages ? page + 1 : page)
    }

    return (
        <div className={classes.productlist}>
            <h2>Product List</h2>
            <div className={`${formClasses.container} mb-2`}>
                <form>
                    <div className={formClasses.formgroupinput}>
                        <input type="text" placeholder='search text' value={search} onChange={handleSearch} />
                    </div>
                </form>
            </div>
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
                        currentProducts.map((prod, count = 1) => (
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
                                    <Link to='#' onClick={() => handleDescription(prod.id)}>{
                                        isReadMore.value === false && isReadMore.index === prod.id
                                            ? "...view more"
                                            : "...view less"
                                    }
                                    </Link></td>
                                <td>{formatDate(prod.expirydate)}</td>
                                <td>
                                    <button type="button" style={{ margin: "5px" }} onClick={() => handleEdit(prod)}>Edit</button>
                                    <button type="button" onClick={() => handleDelete(prod)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div>
                <nav aria-label="Page navigation center">
                    <ul className="pagination">
                        <li className="page-item">
                            <Link className="page-link" to="#" onClick={handlePagePrevious} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </Link>
                        </li>
                        <li className="page-item"><Link className="page-link" to="#">{currentPage}</Link></li>
                        <li className="page-item">
                            <Link className="page-link" to="#" onClick={handlePageNext} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className='container'>
                <h2>Product Update Form</h2>

                <form onSubmit={handleSubmitForm} >
                    <div className={formClasses.formgroupinput}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' value={editProduct.name} onChange={handleEditChange} />
                    </div>
                    <div className={formClasses.formgroupinput}>
                        <label htmlFor="price">Price</label>
                        <input type="number" name='price' value={editProduct.price} onChange={handleEditChange} />
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