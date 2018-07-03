import * as React from 'react';
import ChatBubbleProps from './interface';
import styles from './styles';

const defaultBubbleStyles = {
  userBubble: {},
  chatbubble: {},
  text: {},
};

export default class ChatBubble extends React.Component {
  props;

  constructor(props: ChatBubbleProps) {
    super(props);
  }

  public render() {
    const { bubblesCentered, parser } = this.props;
    let { bubbleStyles } = this.props;
    bubbleStyles = bubbleStyles || defaultBubbleStyles;
    const { userBubble, chatbubble, text } = bubbleStyles;

    // message.id 0 is reserved for blue
    const readStatus = (
      this.props.message.id === 0 && this.props.message.isRead &&
      (
        <svg style={{ float: 'right', display: 'inline-block', position: 'absolute', bottom: 0, right: 0 }} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50" width="15" height="15">
          <g id="surface1_4_">

            <path fill="#CCFF90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
          </g>
        </svg>
      )
    );

    const chatBubbleStyles =
      this.props.message.id === 0
        ? {
          ...styles.chatbubble,
          ...bubblesCentered ? {} : styles.chatbubbleOrientationNormal,
          ...chatbubble,
          ...userBubble,
          ...(this.props.message.styles && this.props.message.styles.bubbleStyles) ? this.props.message.styles.bubbleStyles : {}
        }
        : {
          ...styles.chatbubble,
          ...styles.recipientChatbubble,
          ...bubblesCentered ? {} : styles.recipientChatbubbleOrientationNormal,
          ...userBubble,
          ...chatbubble,
          ...(this.props.message.styles && this.props.message.styles.bubbleStyles) ? this.props.message.styles.bubbleStyles : {}
        };

    return (
      <div
        style={{
          ...styles.chatbubbleWrapper,
        }}
      >
        {
          this.props.message.type == "text" &&
          (<div style={chatBubbleStyles}>
            <p style={{ ...styles.p, ...text }}>{parser ? parser(this.props.message.message) : this.props.message.message}</p>
            {readStatus}
          </div>)
        }

        {
          this.props.message.type === "image" &&
          (<div style={chatBubbleStyles}>
            <p style={{ ...styles.p, ...text }}>
              <img src={this.props.message.message} style={{ maxHeight: '120px' }} />
              <div style={{marginTop:'10px'}}>
                <a href={this.props.message.message} download='image' style={{padding:'5px',border:'1px solid #e5e5e5',borderRadius:'10px',marginTop:'4px',textDecoration:'none'}}>
                <img style={{display:'inline-block'}} src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDQ3NS4wNzggNDc1LjA3NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc1LjA3OCA0NzUuMDc3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ2Ny4wODMsMzE4LjYyN2MtNS4zMjQtNS4zMjgtMTEuOC03Ljk5NC0xOS40MS03Ljk5NEgzMTUuMTk1bC0zOC44MjgsMzguODI3Yy0xMS4wNCwxMC42NTctMjMuOTgyLDE1Ljk4OC0zOC44MjgsMTUuOTg4ICAgIGMtMTQuODQzLDAtMjcuNzg5LTUuMzI0LTM4LjgyOC0xNS45ODhsLTM4LjU0My0zOC44MjdIMjcuNDA4Yy03LjYxMiwwLTE0LjA4MywyLjY2OS0xOS40MTQsNy45OTQgICAgQzIuNjY0LDMyMy45NTUsMCwzMzAuNDI3LDAsMzM4LjA0NHY5MS4zNThjMCw3LjYxNCwyLjY2NCwxNC4wODUsNy45OTQsMTkuNDE0YzUuMzMsNS4zMjgsMTEuODAxLDcuOTksMTkuNDE0LDcuOTloNDIwLjI2NiAgICBjNy42MSwwLDE0LjA4Ni0yLjY2MiwxOS40MS03Ljk5YzUuMzMyLTUuMzI5LDcuOTk0LTExLjgsNy45OTQtMTkuNDE0di05MS4zNThDNDc1LjA3OCwzMzAuNDI3LDQ3Mi40MTYsMzIzLjk1NSw0NjcuMDgzLDMxOC42Mjd6ICAgICBNMzYwLjAyNSw0MTQuODQxYy0zLjYyMSwzLjYxNy03LjkwNSw1LjQyNC0xMi44NTQsNS40MjRzLTkuMjI3LTEuODA3LTEyLjg0Ny01LjQyNGMtMy42MTQtMy42MTctNS40MjEtNy44OTgtNS40MjEtMTIuODQ0ICAgIGMwLTQuOTQ4LDEuODA3LTkuMjM2LDUuNDIxLTEyLjg0N2MzLjYyLTMuNjIsNy44OTgtNS40MzEsMTIuODQ3LTUuNDMxczkuMjMyLDEuODExLDEyLjg1NCw1LjQzMSAgICBjMy42MTMsMy42MSw1LjQyMSw3Ljg5OCw1LjQyMSwxMi44NDdDMzY1LjQ0Niw0MDYuOTQyLDM2My42MzgsNDExLjIyNCwzNjAuMDI1LDQxNC44NDF6IE00MzMuMTA5LDQxNC44NDEgICAgYy0zLjYxNCwzLjYxNy03Ljg5OCw1LjQyNC0xMi44NDgsNS40MjRjLTQuOTQ4LDAtOS4yMjktMS44MDctMTIuODQ3LTUuNDI0Yy0zLjYxMy0zLjYxNy01LjQyLTcuODk4LTUuNDItMTIuODQ0ICAgIGMwLTQuOTQ4LDEuODA3LTkuMjM2LDUuNDItMTIuODQ3YzMuNjE3LTMuNjIsNy44OTgtNS40MzEsMTIuODQ3LTUuNDMxYzQuOTQ5LDAsOS4yMzMsMS44MTEsMTIuODQ4LDUuNDMxICAgIGMzLjYxNywzLjYxLDUuNDI3LDcuODk4LDUuNDI3LDEyLjg0N0M0MzguNTM2LDQwNi45NDIsNDM2LjcyOSw0MTEuMjI0LDQzMy4xMDksNDE0Ljg0MXoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMjI0LjY5MiwzMjMuNDc5YzMuNDI4LDMuNjEzLDcuNzEsNS40MjEsMTIuODQ3LDUuNDIxYzUuMTQxLDAsOS40MTgtMS44MDgsMTIuODQ3LTUuNDIxbDEyNy45MDctMTI3LjkwOCAgICBjNS44OTktNS41MTksNy4yMzQtMTIuMTgyLDMuOTk3LTE5Ljk4NmMtMy4yMy03LjQyMS04Ljg0Ny0xMS4xMzItMTYuODQ0LTExLjEzNmgtNzMuMDkxVjM2LjU0M2MwLTQuOTQ4LTEuODExLTkuMjMxLTUuNDIxLTEyLjg0NyAgICBjLTMuNjItMy42MTctNy45MDEtNS40MjYtMTIuODQ3LTUuNDI2aC03My4wOTZjLTQuOTQ2LDAtOS4yMjksMS44MDktMTIuODQ3LDUuNDI2Yy0zLjYxNSwzLjYxNi01LjQyNCw3Ljg5OC01LjQyNCwxMi44NDdWMTY0LjQ1ICAgIGgtNzMuMDg5Yy03Ljk5OCwwLTEzLjYxLDMuNzE1LTE2Ljg0NiwxMS4xMzZjLTMuMjM0LDcuODAxLTEuOTAzLDE0LjQ2NywzLjk5OSwxOS45ODZMMjI0LjY5MiwzMjMuNDc5eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                  &nbsp; save
              </a>
              </div>
            </p>
            {readStatus}
          </div>)
        }
        {
          this.props.message.type === "file" &&
          (<div style={chatBubbleStyles}>
            <p style={{ ...styles.p, ...text }}>
              <a href={this.props.message.message} download={this.props.message.metaData.name || 'ChatFile'}>
                {
                  this.props.message.metaData.thumbnail && <img style={{ maxWidth: '50px', height: 'auto' }} src={this.props.message.metaData.thumbnail} />
                }
                {
                  this.props.message.metaData.fileType && <h4 style={{ textAlign: 'center' }}> {`Download ${this.props.message.metaData.name || 'file'} ${this.props.message.metaData.fileType}`} </h4>
                }
              </a>
            </p>
            {readStatus}
          </div>)
        }


      </div>
    );
  }
}

export { ChatBubbleProps };
