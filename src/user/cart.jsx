import { useState, useEffect } from "react";
import swal from "sweetalert";

const MyCart = () =>{

    let[itemlist, updateItem] = useState([]);

    const getItem = () => {

        fetch("http://localhost:1234/cart")
        .then(response=> response.json())
        .then(itemArray => {
            updateItem(itemArray)
        })

        // console.log(itemlist);
    }

    useEffect(() => {
        getItem()
    }, []);

    const delitem = (id) => {
        let url = "http://localhost:1234/cart/"+id;
        let postData = {method:"delete"};
        fetch(url, postData)
        .then(response => response.json())
        .then(item => {
            swal(item.name, "Delete from your Cart", "success");
            getItem();
        })
    }

    const updateCart = (product, status) => {
        if(status == 'A'){
            product['qty'] = product.qty + 1;
        }
        else{
            product['qty'] = product.qty - 1;
        }

        if(product.qty == 0){
            delitem(product.id);  // if quantity is 0 then delete from cart
        }
        else{
            let url = "http://localhost:1234/cart/"+product.id;
            let postData = {
                headers:{'content-Type':'application/json'},
                method:'PUT',
                body:JSON.stringify(product)
            }
            fetch(url, postData)
            .then(response=> response.json())
            .then(item => {
                getItem();
            })
        }
    }

    let[fullname, pickName] = useState("")
    let[mobile, pickMobile] = useState("")
    let[email, pickEmail] = useState("")
    let[address, pickAddress] = useState("")

    const placeorder = () => {
        let url = "http://localhost:1234/order";
        let orderData = {fullname:fullname, email:email, mobile:mobile, address:address, itemlist:itemlist};
        let postData = {
            headers:{'content-Type':'application/json'},
            method:'POST',
            body:JSON.stringify(orderData)
        }
        fetch(url, postData)
            .then(response=> response.json())
            .then(item => {
                swal("Hi, "+ fullname, "We Received Your Order", "success")
            })

            pickName("");
            pickEmail("");
            pickMobile("");
            pickAddress("");
    }

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="mb-4 text-primary text-center"> Items in Cart : {itemlist.length}</h2>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-3">
                    <h4 className="mb-4 text-primary text-center"> Customer Details </h4>
                    <div className="mb-3">
                        <p>Customer Name</p>
                        <input type="text" className="form-control" onChange={obj => pickName(obj.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <p>Mobile</p>
                        <input type="number" className="form-control" onChange={obj => pickMobile(obj.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <p>e-Mail-Id</p>
                        <input type="text" className="form-control" onChange={obj => pickEmail(obj.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <p>Address</p>
                        <textarea className="form-control" onChange={obj => pickAddress(obj.target.value)}></textarea>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-info" onClick={placeorder}>Place Order</button>
                    </div>
                </div>
                <div className="col-lg-9">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th> Sl No </th>
                                <th> Product Name </th>
                                <th> Price </th>
                                <th> Quantity </th>
                                <th> Total </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemlist.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <button className="btn btn-warning btn-sm me-2" onClick={updateCart.bind(this, item, 'B')}>-</button>
                                                {item.qty}
                                                <button className="btn btn-warning btn-sm ms-2" onClick={updateCart.bind(this, item, 'A')}>+</button>
                                            </td>
                                            <td>{item.qty * item.price}</td>
                                            <td>
                                                <i className="fa fa-trash fa-lg text-danger"
                                                 onClick={delitem.bind(this, item.id)}>
                                                </i>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyCart;