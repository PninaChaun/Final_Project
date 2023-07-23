import { useEffect, useState } from "react"
import { ServerAdmin } from "../../api/serverAdmin";
import React from 'react';
import './Admin.css'
export const Admin = () => {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        ServerAdmin()
            .then(r => JSON.parse(r))
            .then(r => {
                setUsers(r)
            });
    }, [])

    return <>
        {(users == null) ?

            <h1>unauthorized</h1>
            :
            <>
     <div className="div">
                <table className="user-table" >
                    <thead>
                        <tr>
                            <th className="title">מס':  </th>
                            <th className="title">שם:</th>
                            <th className="title">מייל:</th>
                            {/* <th >כתובת</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr>
                                <th>{user.id}</th>
                                <th>{user.name}</th>
                                <th>{user.email}</th>
                                {/* <th>{user.address}</th> */}


                            </tr>


                        ))}
                    </tbody>
                </table>

                </div>



                {/* <table> */}
                {/* {users.map(u => { */}
                {/* // { console.log(u, 'u'); } */}


                {/* < div key={u['id']}>
                        <h1>ddddddddddd</h1>
                        <p>{u.email}</p>
                        {u.map(u => <Message {...u} />)} */}
                {/* <tbody>
                                <tr>
                                    <th >{u.name}</th>
                                    <th >{u.address}</th>
                                    <th >{u.email}</th>
                                </tr>
                            </tbody> */}
                {/* </div> */}

                {/* })} */}
                {/* </table> */}
            </>
        }


    </>
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