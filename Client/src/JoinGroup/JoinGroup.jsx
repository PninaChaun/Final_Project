import Popup from 'reactjs-popup';

export const JoinGroup = ({ group, setGroup }) => {

    const saveJoin = () => {
        const updatedGroup = [...group.slice(1)];
        setGroup(updatedGroup);
        //TODO קריאת שרת לצרף את הבנאדם לקבוצה
    }
    //     //TODO הפופאפ נסגר כשלוחצים איפהשהוא במסך 
  
        if (group.length > 0) {
            let currrent_group = group[0]
    
            return <Popup open={true} position="right center">
                <div className="PotentialCustomer">
    
                <img className="logo" src="src/assets/img/logo.png" width="100px" />
                    <p >היי : {currrent_group.name}  <br />
                    <p>{group.length}</p>
                        קבוצה : {currrent_group.groupName}  <br />
                        המזמין: {currrent_group.inviterName}  <br />
                    </p>
                    <button className="submitCustomer" type="submit" onClick={() => saveBuy(currrent_group['group'].groupId)}>אישור הצטרפות</button>
                    <button type="submit" className="submitCustomer" onClick={() => removegroup()} >לא מאשר הצטרפות </button>
                     <br />     <br />   
                    
                </div>
            </Popup>
    }
}

export default JoinGroup;