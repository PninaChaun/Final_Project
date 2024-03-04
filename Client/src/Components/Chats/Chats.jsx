import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { ServerGetChats, serverDeleteChat } from '../../api/serverChat';
import { Chat } from '../Chat/Chat';
import '../Groups/Groups.css'
import { Button } from '@mui/material'
import './chats.css'
export function Chats({ showChat, setShowChat }) {

    const [chats, setChats] = useState([])
    const [reload, setReload] = useState(false) //forcing reload GroupMembers to show new invite

    useEffect(() => {
        ServerGetChats()
            .then(r => JSON.parse(r))
            .then(
                r => {
                    setChats(r)
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

    const deleteChat = (chatId) => {
        serverDeleteChat(chatId)

        setReload(!reload)
    }

    return <>
        <ul>
            {chats.map((chat) => (
                <li className="group_name" key={chat.id}>
                    <Button className="nameGroup" onClick={() => openChat(chat.id)}> {chat.name} </Button>
                    {showChat == chat.id ?
                        <>
                            <Chat userId={chat.id} />
                            <button type="button" className="buttonUseState" onClick={() => deleteChat(chat.id)}>לסיום שיחת הצאט עם   {chat.name}</button>

                            {/* <Button type="button" className="buttonUseState" onClick={() => deleteChat(chat.id)}>לסיום שיחת הצאט עם   {chat.name}</Button> */}
                            <a href="http:///www.paypal.com"><img src="src/assets/img/paypl.png" alt="" width="70px" /> </a>
                        </>
                        :
                        <></>
                    }
                </li>
            ))}
        </ul>
    </>
}