import { useState, useEffect } from "react";
import swal from "sweetalert";

const Orderlist = () => {

    let[orderlist, updateOrder] = useState([]);

    const getOrder = () => {

        fetch("http://localhost:1234/order")
        .then(response=> response.json())
        .then(itemArray => {
            updateOrder(itemArray.reverse())
        })

    }

    useEffect(() => {
        getOrder()
    }, []);

    return(
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-lg-12">
                    <h1 className="text-center text-primary">Manage Order : {orderlist.length}</h1>
                </div>              
            </div>
            {
                orderlist.map((order, index) => {
                    return(
                        <div className="row mb-4" key={index}>
                            <div className="col-lg-3 bg-light border p-3">
                                <h5>{index + 1}: Customer Details:</h5>
                                <p>Full Name : {order.fullname}</p>
                                <p>Mobile : {order.mobile}</p>
                                <p>Eail-Id : {order.email}</p>
                                <p>Delivery Address : {order.address}</p>
                            </div>

                            <div className="col-lg-9">
                                <table className="table table-bordered ">
                                    <thead>
                                        <tr className="table table-primary">
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.itemlist.map((item, index) => {
                                                return(
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{ item.price * item.qty }</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Orderlist;