import Cookies from 'js-cookie'
import { Link, Outlet } from 'react-router-dom'

export const Home =()=>{

    const token = Cookies.get('token')
    if (token == undefined){
        //TODO להעביר ל URL של לוגין
    }
    
    return <>
        <button><Link to='shopper' >אני הולך לחנות ומוכן לקנות מצרכים לאנשים</Link></button>
        <button><Link to ='customer'> אני צריך משהו מהחנות, ורוצה שמשהו יקנה לי</Link></button>
        <button><Link to ='settings'> הגדרות</Link></button>
        {/* <Outlet></Outlet> */}
    </>
}