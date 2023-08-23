import { useEffect, useState } from "react"
import { ServerGroupsMembers } from "../../api/serverGroups"

export const GroupMembers = ({ group_id, reload }) => {
    console.log('IN GROUP MEMBERS ', reload);

    const [members, setMembers] = useState([])

    useEffect(() => {
        console.log('in use effect!!!!', reload);
        ServerGroupsMembers(group_id)
            .then(g => JSON.parse(g))
            .then(g =>{
                setMembers([...g['members'],...g['invites']]);
                console.log(members);
            }
            )
    }, [reload])

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