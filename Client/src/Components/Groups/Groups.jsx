import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import './Groups.css';
import { ServerCreateGroup, ServerGroups, ServerInvite, ServerRemoveMember } from "../../api/serverGroups";
import { GroupMembers } from "./GroupMembers";
export const Groups = () => {

  const [groups, setGroups] = useState(null)
  const [show, setShow] = useState(-1)
  const [reload, setReload] = useState(false) //forcing reload GroupMembers to show new invite
  const [addMemberreload, setaddMemberreload] = useState(false) //forcing reload GroupMembers to show new invite

  useEffect(() => {
    ServerGroups()
      .then(g => JSON.parse(g))
      .then(g =>
        setGroups(g)
      )
  }, [reload])

  const showMembers = (group_id) => {
    if (show == group_id) {
      setShow(-1)
    } else {
      setShow(group_id)
    }
  }

  const addGroup = ($event) => {
    event.preventDefault()
    let name = event.target.name.value
    ServerCreateGroup(name)
      .then(() => {
        setReload(!reload)
      })
  }

  const addFriend =()=>{
    event.preventDefault()
    setaddMemberreload(!addMemberreload);
  }

  let inviteFriend = ($event) => {
    event.preventDefault()
    let email = event.target.email.value
    let name = event.target.name.value
    let currentGroup = show
    setaddMemberreload(!addMemberreload);



    ServerInvite(currentGroup, email, name)
      .then(() => {
        setReload(!reload)
      }
      )

  }
  const removeMember = (id) => {
    event.preventDefault()
    ServerRemoveMember(id)
      .then(() => {
        setReload(!reload)
      })
  }

  if (groups == null) {
    return <p>loading...</p>
  }

  return <>
    <label >הקבוצות להם אתה שייך:</label>
    <ul>
      {groups.map((group) => (
        <li className="group_name" key={group.id}>
          <button className="nameGroup" onClick={() => showMembers(group.id)}> {group.name} </button>
          {show == group.id ?
            <>
              <GroupMembers group_id={group.id} reload={reload} />
              <form onSubmit={inviteFriend}>
                
               <li className="lil"> <button className="buttonUseState" onClick={()=>addFriend()} >להוספת חבר לקבוצה</button></li>
                {addMemberreload ?

                  <><div className="border">
                    <br /> <label htmlFor="">הכנס מייל:</label>
                    <input type="text" className="inputGroup" placeholder="friend-email@gmail.com" name="email" /><br />
                    <label htmlFor=""> הכנס שם:</label>
                    <input type="text" className="inputGroup" placeholder="דויד (אופציונלי)" name="name" />
                    <button type="submit" className="submitGroups2" > להוספה ושליחת הזמנה לקבוצה </button><br />
                    </div>
                   </>
                   
    
                  :
                  <></>}
               <li className="lil"> <button type="button"  className="buttonUseState" onClick={() => removeMember(group.id)}>ליצאיה מהקבוצה</button></li>

              </form>
            </>
            : <>
            </>
          }
        </li>
      ))}
    </ul>
    <button className="buttonUseState" onClick={() => setReload(!reload)} >להוספת קבוצה</button>
    {reload ? <>
      <br /><label htmlFor="">בחירת שם לקבוצה: </label>
      <form action="" onSubmit={addGroup}>
        <input type="text" className="inputGroup" placeholder="שכונת נוף ציון" name="name" /><br />
        <button className="submitGroups" type="submit" >אישור</button>
      </form>
    </>
      : <></>
    }
  </>
}