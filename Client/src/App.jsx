import React from "react";
import { useState, useContext } from "react";
import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Login/Login"
import Cookies from 'js-cookie'
import { Customer } from "./Components/Customer/Customer";
import PotentialCustomer from "./Components/PotentialCustomer/PotentialCustomer";
import PopupContext from "./context/context";

function App() { 
    return (
        <>
            <Home />
            {/* <PotentialCustomer /> */}
        </>

    )
}

// export default App;
// import React, { useState } from 'react';
   
// function App() {
//   const [contacts, setContacts] = useState([]);
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [lName, setlName] = useState('');
// let str;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newContact = {
//       name: name,
//       phone: phone,
//       lName:lName
//     };
//     setContacts([...contacts, newContact]);
//     setName('');
//     setPhone('');
//     setlName('');
//   };

//   return (
//     <div className="App">
//       <h1>Phone Book</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter phone number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//           <input
//           type="text"
//           placeholder="Enter lname"
//           value={lName}
//           onChange={(e) => setlName(e.target.value)}
//         />
//         <button type="submit">Add Contact</button>
//       </form>
//       <table >
//       {/* <thead> */}
//         <tr>
//         {contacts.map((contact, index) => (
//           <td > {contact.name} 
//           {contact.phone}
//           {contact.lName} </td>
//           ))}
//         </tr>
   
//     </table>
//       <ul>
//         {contacts.map((contact, index) => (
//           <li key={index}>
//             {contact.name} - {contact.phone} -{contact.lName}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default App;