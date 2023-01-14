import React, { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { 
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

  const apiKey = process.env.REACT_APP_STREAM_API_KEY

  const user = {
    id: "george",
    name: "george",
    image: "/logo512.png"
  }

function App() {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey)
      await chatClient.connectUser(user, chatClient.devToken(user.id))
      const channel = chatClient.channel('messaging', 'react-talk', {
        image: '/logo512.png',
        name: 'Gist',
        members: [user.id]
      }) 
      await channel.watch()
      setChannel(channel)
      setClient(chatClient)
    }
    init()
    if (client) return () => client.disconnectUser()
  }, [])

  if (!channel || !client) return <LoadingIndicator />

  return (
    <Chat client={client} theme='messaging light'>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}

export default App;
