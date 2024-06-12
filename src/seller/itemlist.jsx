import { useState, useEffect } from "react";
import swal from "sweetalert";
import ReactPaginate from 'react-paginate';

const Allitem = () => {
    let[itemlist, updateItem] = useState([]);
    const [istruncated, setIstruncated] = useState(true);

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

    // Showing product description
    const ShowDescription = (text, maxLength) => {

        const toggleEvent = () => {
            if(istruncated){
                setIstruncated(false);
            }else{
                setIstruncated(true)
            }
        }

        if(text.length <= maxLength){
            return(
                <p>{text}</p>
            )
        };

        const displayText = istruncated ? `${text.slice(0, maxLength)}` : text ;
        return(
            <div>
                <p>{displayText}</p>
                <button className="mt-2 mb-3 text-primary border-0 bg-transparent" onClick={toggleEvent}>
                    {istruncated ? 'Read more' : 'Read less'}
                </button>
            </div>
        )
    }

    let[keyword, updateKeyword] = useState("");

    const PER_PAGE = 12;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(itemlist.length / PER_PAGE);

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-9 text-center mb-4">
                    <h3>Item in Stock : {itemlist.length}</h3>
                </div>
                <div className="col-lg-3">
                    <input type="text" className="form-control" placeholder="Search..."
                    onChange={obj => updateKeyword(obj.target.value.toLowerCase())}/>
                </div>
                {
                    itemlist.slice(offset, offset + PER_PAGE).map((item, index) => {
                        if(item.name.toLowerCase().match(keyword) || item.price.toString().match(keyword)){
                            return(
                                <div className="col-lg-2 mb-4 p-3 product" key={index}>
                                    <h4>{item.name}</h4>
                                    <img src={item.photo} height="140" width="100%" />
                                    <p>Rs.{item.price}</p>
                                    <div>{ShowDescription(item.details, 80)}</div>
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

export default Allitem;