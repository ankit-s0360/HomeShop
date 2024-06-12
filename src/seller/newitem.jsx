import { useState, useEffect } from "react";
import swal from "sweetalert";

const NewItem = () => {
    let[pname, pickName]= useState("");
    let[pprice, pickPrice] = useState("");
    let[pphoto, pickPhoto] = useState("");
    let[pdetails, pickDetails] = useState("");

    const save = () => {
        // alert(pname + pprice + pphoto + pdetails);
        let url = "http://localhost:1234/product";
        let newitem = {name:pname, price:pprice, photo:pphoto, details:pdetails};
        let postData = {
            Headers:{'content-Type':'application/json'},
            method:'POST',
            body:JSON.stringify(newitem)
        }

        if(pname != "" && pprice !="" && pphoto != "" && pdetails !=""){

            fetch(url, postData)
            .then(response => response.json())
            .then(productInfo=> {
                swal(pname, "Save Successfully !", "success");
                pickName("");
                pickPrice("");
                pickPhoto("");
                pickDetails("");
            })
        }
        else{
            swal("Invalid Inputs","All input field are required !", "error")
        }

    }
    return(
        <div className="container mt-5">
            <div className="row mb-5">
                <div className="col-lg-12 text-center">
                    <h2>Enter New Product</h2>
                </div>

            </div>
            <div className="row">

                <div className="col-lg-4 mb-4">
                    <p>Enter Product Name</p>
                    <input type="text" className="form-control" value={pname} onChange={obj => pickName(obj.target.value)} />
                </div>

                <div className="col-lg-4 mb-4">
                    <p>Enter product Price</p>
                    <input type="number" className="form-control" value={pprice} onChange={obj => pickPrice(obj.target.value)}/>
                </div>

                <div className="col-lg-4 mb-4">
                    <p>Enter Product Photo URL</p>
                    <input type="text" className="form-control" value={pphoto} onChange={obj => pickPhoto(obj.target.value)} />
                </div>

                <div className="col-lg-10 mb-4">
                    <p>Enter Product Details</p>
                    <textarea className="form-control" value={pdetails} onChange={obj => pickDetails(obj.target.value)}></textarea>
                </div>

                <div className="col-lg-2 mb-4 pt-5">
                    <button className="btn btn-danger" onClick={save}> Save Product</button>
                </div>
                
            </div>
        </div>
    )
}

export default NewItem;