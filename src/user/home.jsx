import { useState, useEffect } from "react";
import swal from "sweetalert";
import ReactPaginate from 'react-paginate';

const MyHome = () => {
    let[itemlist, updateItem] = useState([]);

    const getItem = () => {

        fetch("http://localhost:1234/product")
        .then(response=> response.json())
        .then(itemArray => {
            updateItem(itemArray.reverse())
        })

        // console.log(itemlist);
    }

    useEffect(() => {
        getItem()
    }, []);


    let[keyword, updateKeyword] = useState("");

    const PER_PAGE = 12;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(itemlist.length / PER_PAGE);

    const addtocart = (product) => {
        product['qty'] = 1;
        let postData = {
            headers:{'content-Type':'application/json'},
            method:'POST',
            body:JSON.stringify(product)
        }
        fetch("http://localhost:1234/cart", postData)
        .then(response=> response.json())
        .then(iteminfo => {
            // console.log(iteminfo, "item info");
            swal(product.name, "Added in your Cart..", "success")
        })
    }

    return(
        <div className="container mt-4">
            <div className="row mb-5">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="input-group">
                        <label className="input-group-text text-primary"><i className="fa fa-search"></i></label>
                        <input type="text" className="form-control" placeholder="Search..."
                        onChange={obj => updateKeyword(obj.target.value.toLowerCase())}/>
                    </div>
                </div>
                <div className="col-lg-3"></div>
                {
                    itemlist.slice(offset, offset + PER_PAGE).map((item, index) => {
                        if(item.name.toLowerCase().match(keyword) || item.price.toString().match(keyword)){
                            return(
                                <div className="col-lg-2 mt-5 mb-5 p-3 product" key={index}>
                                    <h5 className="text-center text-info mb-3">{item.name}</h5>
                                    <img src={item.photo} height="140" width="100%"/>
                                    <p>Rs.{item.price}</p>
                                    <p>{item.details.slice(0, 65)}</p>
                                    <div className="text-center">
                                        <button className="btn btn-info btn-sm" onClick={addtocart.bind(this, item)}>
                                            <i className="fa fa-shopping-cart"></i>Add to Cart</button>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>

            <div className="mb-4 mt-4">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination  justify-content-center"}
                    pageClassName={"page-item "}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active primary"}
                />
            </div>
        </div>
    )
}

export default MyHome;