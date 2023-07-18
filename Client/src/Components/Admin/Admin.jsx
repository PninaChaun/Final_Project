import { useEffect, useState } from "react"
import { ServerAdmin } from "../../api/serverAdmin";

export const Admin = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        ServerAdmin()
            .then(r => JSON.parse(r))
            .then(r => {
                setUsers(r)
                console.log(r, 'r');
            })
            .then(console.log(users, 'users'));
    }, [])

    return <h1>good night</h1>

    // {
    //     users.map((u) => {
    //         return (
    //             <>
    //                 <h1>ddddddddddd</h1>
    //                 <table>
    //                     <tbody>
    //                         <tr>
    //                             <th >{u.name}</th>
    //                             <th >{u.address}</th>
    //                             <th >{u.email}</th>
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //             </>
    //         )
    //     })
    // }


}