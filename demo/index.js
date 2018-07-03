import React from 'react';
import { render } from 'react-dom';
import { ChatFeed, ChatBubble, BubbleGroup, Message } from '../lib';

const styles = {
  button: {
    backgroundColor: '#fff',
    borderColor: '#1D2129',
    borderStyle: 'solid',
    borderRadius: 20,
    borderWidth: 2,
    color: '#1D2129',
    fontSize: 18,
    fontWeight: '300',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  selected: {
    color: '#fff',
    backgroundColor: '#0084FF',
    borderColor: '#0084FF',
  },
};

const users = {
  0: 'You',
  1: 'Mark',
  2: 'Evan',
};

const avatars={
  'You': null,
  'Mark':<img src="http://icons.iconarchive.com/icons/hopstarter/halloween-avatar/256/Dave-icon.png" style={{width:"50px"}}/>,
  'Evan':<img src="http://icons.iconarchive.com/icons/hopstarter/halloween-avatar/128/Bat-icon.png" style={{width:"50px"}}/>
}

const customBubble = props => (
  <div>
    <p>{`${props.message.senderName} ${props.message.id ? 'says' : 'said'}: ${
      props.message.message
    }`}</p>
  </div>
);

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [
        new Message({
          id: 1,
          message: "I'm the recipient! (The person you're talking to)",
          senderName: "George",
          avatar:<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArL5ZYgvYomgLZ6QKxjLO6iK-w6UqdRakfN56wFzWwE7ewq0O" style={{width:"50px"}}/>,
          timestamp: new Date(),
        }),
        new Message({
          id: 1,
          message: "This needs to be in red..",
          senderName: "George",
          avatar:<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArL5ZYgvYomgLZ6QKxjLO6iK-w6UqdRakfN56wFzWwE7ewq0O" style={{width:"50px"}}/>,
          timestamp: new Date(),
          styles:{
            bubbleStyles:{backgroundColor:'red'}
          }
        }),
        new Message({
          id: 1,
          message: "https://404store.com/2017/12/08/1194986855125869974rubik_s_cube_random_petr_01.svg.med.png",
          senderName: "George",
          avatar:<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArL5ZYgvYomgLZ6QKxjLO6iK-w6UqdRakfN56wFzWwE7ewq0O" style={{width:"50px"}}/>,
          timestamp: new Date(),
          type:'image',
          metaData:{
            name:'Random txt',
            fileType:'png',
            thumbnail:'http://www.ewe.png'
            
          }
        }),
        new Message({
          id: 0,
          message: 'Hey! Evan here. react-chat-ui is pretty dooope.',
          senderName: 'Evan',
        }),
      ],
      useCustomBubble: false,
      curr_user: 0,
    };
  }

  onPress(user) {
    this.setState({ curr_user: user });
  }

  onMessageSubmit(e) {
    const input = this.message;
    e.preventDefault();
    if (!input.value) {
      return false;
    }
    this.pushMessage(this.state.curr_user, input.value);
    input.value = '';
    return true;
  }

  pushMessage(recipient, message) {
    const prevState = this.state;
    const newMessage = new Message({
      id: recipient,
      message,
      senderName: users[recipient],
      avatar:avatars[users[recipient]],
      isRead: users[recipient]=='You',
      timestamp: new Date()
    });
    prevState.messages.push(newMessage);
    this.setState(this.state);
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">react-chat-ui</h1>
        <p className="text-center">
          <a
            href="https://github.com/brandonmowat/react-chat-ui"
            target="_blank"
          >
            Github
          </a>
        </p>
        <div className="install">
          <code>npm i -s monkas-chat</code>
        </div>
        <div className="chatfeed-wrapper">
          <ChatFeed
            //chatBubble={this.state.useCustomBubble && customBubble}
            maxHeight="auto"
            messages={this.state.messages} // Boolean: list of message objects
            showSenderName
            parser={(text)=>text}
          />

          <form onSubmit={e => this.onMessageSubmit(e)}>
            <input
              ref={m => {
                this.message = m;
              }}
              placeholder="Type a message..."
              className="message-input"
            />
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button
              style={{
                ...styles.button,
                ...(this.state.curr_user === 0 ? styles.selected : {}),
              }}
              onClick={() => this.onPress(0)}
            >
              You
            </button>
            <button
              style={{
                ...styles.button,
                ...(this.state.curr_user === 1 ? styles.selected : {}),
              }}
              onClick={() => this.onPress(1)}
            >
              Mark
            </button>
            <button
              style={{
                ...styles.button,
                ...(this.state.curr_user === 2 ? styles.selected : {}),
              }}
              onClick={() => this.onPress(2)}
            >
              Evan
            </button>
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}
          >
            <button
              style={{
                ...styles.button,
                ...(this.state.useCustomBubble ? styles.selected : {}),
              }}
              onClick={() =>
                this.setState({ useCustomBubble: !this.state.useCustomBubble })
              }
            >
              Custom Bubbles
            </button>
          </div>
        </div>
        <h2 className="text-center">There are Bubbles!</h2>
        <ChatBubble
          message={new Message({ id: 1, message: 'I float to the left!' })}
        />
        <ChatBubble
          message={new Message({ id: 0, message: 'I float to the right!' })}
        />

        <h2 className="text-center">And we have Bubble Groups!</h2>
        <BubbleGroup
          messages={[
            new Message({ id: 1, message: 'Hey!' }),
            new Message({ id: 1, message: 'I forgot to mention...' }),
            new Message({
              id: 1,
              message:
                "Oh no, I forgot... I think I was going to say I'm a BubbleGroup",
            }),
          ]}
          id={1}
          showSenderName={true}
          senderName={'Elon Musk'}
        />
        <ChatBubble
          message={new Message({ id: 2, message: "I 'm a single ChatBubble!" })}
        />
        <BubbleGroup
          messages={[
            new Message({ id: 0, message: 'How could you forget already?!' }),
            new Message({
              id: 0,
              message: "Oh well. I'm a BubbleGroup as well",
            }),
          ]}
          id={1}
          showSenderName={true}
          senderName={'Elon Musk'}
        />
      </div>
    );
  }
}

render(<Chat />, document.getElementById('chat-ui'));
