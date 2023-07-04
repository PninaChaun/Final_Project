import { useNavigate } from "react-router-dom";
import { ServerShopper } from "../../api/serverShopper";
import PotentialCustomer from "../PotentialCustomer/PotentialCustomer";
import { useContext, useEffect } from "react";
import { FindCustomer } from "../../api/serverFindCustomer";
import Cookies from "js-cookie";
import Context from "../../context/context";

export const Shopper = ({ order, setOrder }) => {

  useEffect(() => {

    setInterval(() => {

      FindCustomer().then(r => JSON.parse(r)).then(
        r => {
          let col = r['col'];
          let newOrderList = order.map(x => x)
          newOrderList.push(...col)
          setOrder(newOrderList);
          console.log(order, 'order');
        }
      );
    }
      , 5000); // fetch updates every 5 seconds

  }, []);

  const _navigate = useNavigate(Context);

  const saveShopper = ($event) => {
    event.preventDefault();
    Cookies.set('prevRequest', new Date(1970, 1))
    setOrder([])

    const store = event.target.store.value;
    let data = { 'store': store }
    ServerShopper(data)
    _navigate('/');

  }

  return <div>
    <form onSubmit={saveShopper}>
      <input type="text" name="store" id="store" placeholder="שם חנות" />
      <button type="submit">שמירה </button>
    </form>
  </div>
}