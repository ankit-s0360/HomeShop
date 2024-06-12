import UserApp from "./user/userapp";
import SellerApp from "./seller/sellerapp";


function App() {

  if(localStorage.getItem("adminid") == null){
    return (<UserApp/>);
  }
  else{
    return (<SellerApp/>);
  }

}

export default App;
