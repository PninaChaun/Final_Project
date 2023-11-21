import Popup from 'reactjs-popup';
import { ServerJoinGroup, ServerLeaveInvite } from '../../api/serverInvites';

export const JoinGroup = ({ group, setGroup }) => {

    const removegroup = () => {
        const updatedGroup = [...group.slice(1)];
        setGroup(updatedGroup);
    }

    const saveJoin = (inviteId) => {
        removegroup()
        ServerJoinGroup(inviteId)
    }

    const leaveGroup = (inviteId) => {
        removegroup()
        ServerLeaveInvite(inviteId)
    }

    if (group.length > 0) {
        let currrent_group = group[0]
        return <Popup open={true} position="right center">
            <div className="PotentialCustomer">
                <img className="logo" src="src/assets/img/logo.png" width="100px" />
                <p >היי : {currrent_group.name}  <br />
                    קבוצה : {currrent_group.groupName}  <br />
                    המזמין: {currrent_group.inviterName}  <br />
                </p>
                <button className="submitCustomer" type="submit" onClick={() => saveJoin(currrent_group.id)}>אישור הצטרפות</button>
                <button className="submitCustomer" type="submit" onClick={() => removegroup()}>שאל אותי מאוחר יותר</button>
                <button type="submit" className="submitCustomer" onClick={() => leaveGroup(currrent_group.id)} >לא מאשר הצטרפות </button>
                <br />     <br />
            </div>
        </Popup>
    }
}

export default JoinGroup;