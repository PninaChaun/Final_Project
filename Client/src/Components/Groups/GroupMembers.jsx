import { useEffect, useState } from "react"
import { ServerGroupsMembers } from "../../api/serverGroups"
import { Loading } from "../Loading/Loading"
import './Groups.css'

export const GroupMembers = ({ group_id, reload }) => {

    const [members, setMembers] = useState([])

    useEffect(() => {
        ServerGroupsMembers(group_id)
            .then(g => JSON.parse(g))
            .then(g =>{
                setMembers([...g['members'],...g['invites']]);
            }
            )
    }, [reload])

    if (members.length == 0)
    return <Loading />

    if (members != []){
        return <>
            <div className="div">
                <table className="user-table" >
                    <thead>
                        <tr>
                            <th className="title">שם:</th>
                            <th className="title">מייל:</th>
                            <th className="title">חבר בקבוצה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((user) => (
                            <tr key={user.id}>
                                <th>{user.name}</th>
                                <th>{user.email}</th>
                                <th>{user.member? 'v':'x'}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </>
    }
}