import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import './Groups.css';
import { ServerGroups } from "../../api/serverGroups";
import { GroupMembers } from "./GroupMembers";
export const Groups = () => {

  const [groups, setGroups] = useState(null)
  const [show, setShow] = useState(33)

  useEffect(() => {
    ServerGroups()
      .then(g => JSON.parse(g))
      .then(g =>
        setGroups(g)
      )
  }, [])

  const showMembers = (group_id) => {
    console.log(group_id);
    if (show == group_id) {
      setShow(-1)
    } else {
      setShow(group_id)
    }
  }

  let inviteFriend = ($event) => {
    event.preventDefault()
    let email = event.target.email.value
    let name = event.target.name.value
    console.log(email, name);

    // TODO NOW קריאת שרת - ליצור שרת - לשמור את הנתונים בקולקשן של אינבייט 
  }

  if (groups == null) {
    return <p>loading...</p>
  }

  return <>
    <label>הקבוצות להם אתה שייך:</label>
    <ul>
      {groups.map((group) => (
        <li className="group_name" key={group.id}>
          <button onClick={() => showMembers(group.id)}> {group.name} </button>
          {show == group.id ?
            <>
              <GroupMembers group_id={group.id} />
              <form onSubmit={inviteFriend}>
                <label htmlFor="">הוסף חבר לקבוצה</label>
                <br />
                <label htmlFor="">הכנס מייל:</label>
                <input type="text" placeholder="friend-email@gmail.com" name="email" />
                <input type="text" placeholder="friend's name" name="name" />

                <button type="submit">שליחת הזמנה</button>
              </form>
            </>
            : <>
            </>
          }
          {/* id={"members"+group.id} style="hidden:True" */}
        </li>
      ))}
    </ul>


    <label htmlFor="">בחירת שם לקבוצה: </label>
    <input type="text" placeholder="שכונת נוף ציון" />

    {/* <select name="" id="">
    <option value="1">tן9</option>
    <option value="1">t</option>
</select> */}
  </>
}
