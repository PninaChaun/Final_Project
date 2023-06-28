import { useNavigate } from "react-router-dom";
import { ServerShopper } from "../../api/serverShopper";
import Context, { PopupContext } from "../../context/context";
import PotentialCustomer from "../PotentialCustomer/PotentialCustomer";
import { useContext, useEffect } from "react";
import { FindCustomer } from "../../api/serverFindCustomer";

export const Shopper = () => {

  let [order, setOrder] = useContext(PopupContext)

    useEffect(() => {

    setInterval(() => {
      console.log('in set interval');

      FindCustomer().then(r=>JSON.parse(r)).then(
        r=>{
          //TODO for each
          let col=r['col'];
          // debugger
          console.log(col);
          setOrder(col);
          }
        );
      }
    , 5000); // fetch updates every 5 seconds

  }, []);

  const _navigate = useNavigate(Context);

  const saveShopper = ($event) => {
    event.preventDefault();
    const store = event.target.store.value;
    let data = { 'store': store }

    //TODO קריאת שרת
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