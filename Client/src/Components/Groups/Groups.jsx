import { useEffect, useState } from "react"
import { Form, Link } from 'react-router-dom'
import './Groups.css';
import { ServerCreateGroup, ServerGroups, ServerInvite, ServerRemoveMember } from "../../api/serverGroups";
import { GroupMembers } from "./GroupMembers";
import { Loading } from "../Loading/Loading";
import { useConfirm } from 'react-hook-popup'
import { Button, FormControl, FormLabel, Grid, Input, ListItemButton, ListItemText, createTheme } from "@mui/material";
export const Groups = () => {

  const [groups, setGroups] = useState(null)
  const [show, setShow] = useState(-1)
  const [reload, setReload] = useState(false) //forcing reload GroupMembers to show new invite
  const [addMemberreload, setaddMemberreload] = useState(false) //forcing reload GroupMembers to show new invite
  const [confirm] = useConfirm()

  let theme = createTheme({
    palette: {
        primary: {
            main: '#FF8F45',
            contrastText: 'white'
        },
        secondary: {
            main: '#19acb7'
        },
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
              <GroupMembers group_id={group.id} reload={reload} />
              <form onSubmit={inviteFriend}>
                <Grid container spacing={2}>
                <Grid item> <Button variant="outlined" theme={theme}  onClick={() => addFriend()} >הוספת חבר לקבוצה</Button></Grid>

                {addMemberreload ?

                  <>
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
                <Grid item> <Button type="button" variant="outlined" theme={theme} onClick={() => removeMember(group.id)}>יציאה מהקבוצה</Button></Grid>
                </Grid>
              </form>
            </>
            : <>
            </>
          }
        </div>
      ))}
    </ul>
    <Button variant="contained" theme={theme} className="buttonUseState" onClick={() => setReload(!reload)} >להוספת קבוצה</Button>
    {reload ? <>
    <br />
      <form onSubmit={addGroup}>
        <FormLabel htmlFor="">בחירת שם לקבוצה: </FormLabel>
        <Input type="text" className="inputGroup" placeholder="שכונת נוף ציון" name="name" required /><br />
        <Button type="submit" variant="contained"  theme={theme} className="submitGroups" role="submit" >אישור</Button>
      </form>
    </>
      : <></>
    }
  </>
}