import React from 'react';
import ReactDOM from 'react-dom';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

const PhoneBookForm = ({ addEntryToPhoneBook }) => {
  
  const [userFirstname, setUserFirstname] = React.useState("")
  const [userLastname, setUserLastname] = React.useState("")
  const [userPhone, setUserPhone] = React.useState("")
  
  const onSubmit = (e) => {
    e.preventDefault()
    const newEntry = {
      userFirstname,
      userLastname,
      userPhone
    } 
    addEntryToPhoneBook(newEntry)
  }

  return (
    <form onSubmit={e => onSubmit(e) } style={style.form.container}>
      <label>First name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        type='text'
        onChange={(e) => setUserFirstname(e.target.value)}
      />
      <br/>
      <label>Last name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        type='text' 
        onChange={(e) => setUserLastname(e.target.value)}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone' 
        name='userPhone' 
        type='text'
        onChange={(e) => setUserPhone(e.target.value)}
      />
      <br/>
      <input 
        style={style.form.submitBtn} 
        className='submitButton'
        type='submit' 
        value='Add User' 
      />
    </form>
  )
}

function InformationTable(props) {
  const sortedArray = props.phonebook.sort((a,b) => {
    if (a.userLastname > b.userLastname) {
        return -1;
    }
    if (b.userLastname > b.userLastname) {
        return 1;
    }
    return 0;
  })

  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>firstname</th>
          <th style={style.tableCell}>lastname</th>
          <th style={style.tableCell}>phone</th>
        </tr>
      </thead> 
      <tbody>
        {sortedArray.map((address) => {
          return (
          <tr>
            <th style={style.tableCell}>{address.userFirstname}</th>
            <th style={style.tableCell}>{address.userLastname}</th>
            <th style={style.tableCell}>{address.userPhone}</th>
          </tr>
          )
        })}
      </tbody>
    </table>
  );
}

function Application(props) {
  const [phonebook, setPhonebook] = React.useState([])

  const addEntryToPhoneBook = (newaddy) => {
    setPhonebook(phonebook.concat(newaddy))
  }

  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable phonebook={phonebook} />
    </section>
  );
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);