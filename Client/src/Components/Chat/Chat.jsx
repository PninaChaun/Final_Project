import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import './chat.css'
import { ServerOrderDetails } from '../../api/serverOrder';
import { Loading } from '../Loading/Loading';

export function Chat({ userId }) {
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded && userId != -1) {

      ServerOrderDetails(userId)
        .then(r => JSON.parse(r))
        .then(r => {
          let current = r.current
          const currentUser = new Talk.User({
            id: current.id,
            name: current.name,
            // email: current.email,
            photoUrl: 'src/assets/img/cart.png',
            welcomeMessage: 'Hello!',
            role: 'default',
          });

          let other = r.other
          const otherUser = new Talk.User({
            id: other.id,
            name: other.name,
            // email: other.email,
            photoUrl: 'src/assets/img/cart.png',
            welcomeMessage: 'Hello!',
            role: 'default',
          });

          console.log(other, current);

          const session = new Talk.Session({
            appId: 'tFyIJvSX',
            me: currentUser,
          });

          const conversationId = Talk.oneOnOneId(currentUser, otherUser);
          const conversation = session.getOrCreateConversation(conversationId);
          conversation.setParticipant(currentUser);
          conversation.setParticipant(otherUser);

          const chatbox = session.createChatbox();
          chatbox.select(conversation);
          chatbox.mount(chatboxEl.current);


          return () => session.destroy();
        })

    }
  }, [talkLoaded, userId]);

  return <div ref={chatboxEl} id="talkjs-container" >
    <Loading />
  </div>;
}