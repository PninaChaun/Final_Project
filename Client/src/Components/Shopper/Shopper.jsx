import { useNavigate } from "react-router-dom";
import { ServerShopper } from "../../api/serverShopper";
import PotentialCustomer from "../PotentialCustomer/PotentialCustomer";
import { useContext, useEffect, useState } from "react";
import { FindCustomer } from "../../api/serverFindCustomer";
import Cookies from "js-cookie";
import Context from "../../context/context";
import '../Shopper/Shopper.css';
export const Shopper = ({ order, setOrder, shopId, setshopId }) => {

  // const [shopId, setshopId] = useState(null)

  const _navigate = useNavigate(Context);

  const saveShopper = ($event) => {
    event.preventDefault();
    Cookies.set('prevRequest', new Date(1970, 1))
    // setOrder([])

    const store = event.target.store.value;
    let data = { 'store': store }

    const x = ServerShopper(data)
      .then((result) => JSON.parse(result))
      .then((result) => {
        setshopId(result)
       _navigate('/');
      })
      .catch((error) => {
        console.log(error);
      })
    // 
  }

  return <div>

    <form onSubmit={saveShopper}>
      <label className="labelShopper" htmlFor="">הכנס שם חנות:</label><br />
      <input type="text" className="store" name="store" id="store" placeholder="יש " />
      <br />
      <button className="submitShopper" type="submit">שמירה </button>
    </form>
  </div>
}