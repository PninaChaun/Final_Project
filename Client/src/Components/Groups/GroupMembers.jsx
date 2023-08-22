import { useEffect, useState } from "react"
import { ServerGroupsMembers } from "../../api/serverGroups"

export const GroupMembers = ({ group_id }) => {

    const [members, setMembers] = useState([])

    useEffect(() => {
        ServerGroupsMembers(group_id)
            .then(g => JSON.parse(g))
            .then(g =>
                setMembers(g)
            )
    }, [])

    if (members != []){
        return <>
            <div className="div">
                <table className="user-table" >
                    <thead>
                        <tr>
                            <th className="title">שם:</th>
                            <th className="title">מייל:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((user) => (
                            <tr>
                                {/* <th>{user.id}</th> */}
                                <th>{user.name}</th>
                                <th>{user.email}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </>
    }
}