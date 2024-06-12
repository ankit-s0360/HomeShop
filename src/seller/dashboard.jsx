import { useState, useEffect } from "react";
import swal from "sweetalert";

const MyDashboard = () => {

    let[itemlist, updateItem] = useState([]);
    let[orderlist, updateOrder] = useState([]);

    const getItem = () => {

        fetch("http://localhost:1234/product")
        .then(response=> response.json())
        .then(itemArray => {
            updateItem(itemArray)
        })
    }
    const getOrder = () => {

        fetch("http://localhost:1234/order")
        .then(response=> response.json())
        .then(itemArray => {
            updateOrder(itemArray.reverse())
        })

    }

    useEffect(() => {
        getItem();
        getOrder()
    }, []);

    return(
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-lg-12">
                    <h1 className="text-center text-primary">Seller Dashboard</h1>
                </div>              
            </div>

            <div className="row mb-4 text-center">
                <div className="col-lg-2"></div>              
                <div className="col-lg-4">
                    <i className="fa fa-suitcase fa-4x text-info mb-3"></i>
                    <h4>Availabe items in store <br />{itemlist.length}</h4>
                </div>              
                <div className="col-lg-4">
                    <i className="fa fa-headset fa-4x text-primary mb-3"></i>
                    <h4>Order Received <br />{orderlist.length}</h4>
                    </div>              
                <div className="col-lg-2"></div>              
            </div>
        </div>
    )
}

export default MyDashboard;