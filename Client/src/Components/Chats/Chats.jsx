import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { ServerGetChats, serverDeleteChat } from '../../api/serverChat';
import { Chat } from '../Chat/Chat';
import '../Groups/Groups.css'


export function Chats({ showChat, setShowChat}) {

    const [chats, setChats] = useState([])
    const [reload, setReload] = useState(false) //forcing reload GroupMembers to show new invite



    useEffect(() => {
        ServerGetChats()
            .then(r => JSON.parse(r))
            .then(
                r => {
                    setChats(r)
                    // setChats(r.reverse()) // show current chat first
                }
            )
    }, [reload])

    const openChat = (chat_id) => {
        if (showChat == chat_id) {
            setShowChat(-1)
        } else {
            setShowChat(chat_id)
        }
    }

    const deleteChat=(chatId)=>{
        serverDeleteChat(chatId)

        setReload(!reload)
    }

    ///chatid=userid
    return <>
        <ul>
            {chats.map((chat) => (
                <li className="group_name" key={chat.id}>
                    <button className="nameGroup" onClick={() => openChat(chat.id)}> {chat.name} </button>
                    {showChat == chat.id ?
                        <>
                            <Chat userId={chat.id} />
                            <button type="button" className="buttonUseState" onClick={() => deleteChat(chat.id)}>לסיום שיחת הצאט עם   {chat.name}</button>
                        </>
                        :
                        <></>
                    }
                </li>
            ))}
        </ul>

    </>


}