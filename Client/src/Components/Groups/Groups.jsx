import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import './Groups.css';
import { ServerCreateGroup, ServerGroups, ServerInvite, ServerRemoveMember } from "../../api/serverGroups";
import { GroupMembers } from "./GroupMembers";
import { Loading } from "../Loading/Loading";
import { useConfirm } from 'react-hook-popup'
import { ListItemButton, ListItemText, createTheme } from "@mui/material";
export const Groups = () => {

  const [groups, setGroups] = useState(null)
  const [show, setShow] = useState(-1)
  const [reload, setReload] = useState(false) //forcing reload GroupMembers to show new invite
  const [addMemberreload, setaddMemberreload] = useState(false) //forcing reload GroupMembers to show new invite
  const [confirm] = useConfirm()

  let theme = createTheme({
    palette: {
      primary: {
        main: '#FF0000',
      }
    },
  });

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

  const addFriend = () => {
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
  const removeMember = async (id) => {
    event.preventDefault()

    const confirmed = await confirm('?אתה בטוח שברצונך לצאת מהקבוצה?')
    if (confirmed) {
      ServerRemoveMember(id)
        .then(() => {
          setReload(!reload)
        })
    }


  }

  if (groups == null) {
    return <Loading />
  }

  return <>
    <label >הקבוצות להם אתה שייך:</label>
    <ul>
      {groups.map((group) => (
        <div className="group_name" key={group.id}>
          <ListItemButton theme={theme}  onClick={() => showMembers(group.id)}>
            <ListItemText  primary={group.name} />
            </ListItemButton>
          
          {show == group.id ?
            <>
            <br />
              <GroupMembers group_id={group.id} reload={reload} />
              <form onSubmit={inviteFriend}>
              <br />
                <li className="lil"> <button className="buttonUseState" onClick={() => addFriend()} >להוספת חבר לקבוצה</button></li>

                {addMemberreload ?

                  <>
                  <br />
                  <div className="border">
                    <br /> <label htmlFor="">הכנס מייל:</label>
                    <input type="text" className="inputGroup" placeholder="friend-email@gmail.com" name="email" required /><br />
                    <label htmlFor=""> הכנס שם:</label>
                    <input type="text" className="inputGroup" placeholder="דויד (אופציונלי)" name="name" />
                    <button type="submit" className="submitGroups2" > להוספה ושליחת הזמנה לקבוצה </button><br />
                  </div>
                  </>
                  :
                  <></>}
                <li className="lil"> <button type="button" className="buttonUseState" onClick={() => removeMember(group.id)}>ליצאיה מהקבוצה</button></li>

              </form>
            </>
            : <>
            </>
          }
        </div>
      ))}
    </ul>
    <button className="buttonUseState" onClick={() => setReload(!reload)} >להוספת קבוצה</button>
    {reload ? <>
      <br /><label htmlFor="">בחירת שם לקבוצה: </label>
      <form action="" onSubmit={addGroup}>
        <input type="text" className="inputGroup" placeholder="שכונת נוף ציון" name="name" required /><br />
        <button className="submitGroups" type="submit" >אישור</button>
      </form>
    </>
      : <></>
    }
  </>
}