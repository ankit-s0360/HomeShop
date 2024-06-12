import { useState } from "react";
import swal from "sweetalert";

const Mylogin = () =>{

    let [username, pickEmail] = useState("");
    let [password, pickPassword] = useState("");

    const Gologin = () => {
        let url = "http://localhost:1234/account?email="+username+"&password="+password;
        fetch(url)
        .then(response => response.json())
        .then(userinfo => {
            if(userinfo.length > 0){
                localStorage.setItem("adminid", userinfo[0].id);
                localStorage.setItem("adminname", userinfo[0].fullname);
                window.location.reload();
                
            }else{
                swal("Fail","Invalid or Not Exist !", "error");
            }
        })
    };

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="p-4 shadow-lg">
                        <h3 className="text-center text-info mb-4"> 
                            <i className="fa fa-lock"></i> Login 
                        </h3>
                        <div className="mb-4">
                            <p>e-Mail Id</p>
                            <input type="text" className="form-control"
                            onChange={obj => pickEmail(obj.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <p>Password</p>
                            <input type="password" className="form-control"
                            onChange={obj => pickPassword(obj.target.value)}/>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-danger" onClick={Gologin}> 
                                Login <i className="fa fa-arrow-right"></i> 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}
export default Mylogin;
