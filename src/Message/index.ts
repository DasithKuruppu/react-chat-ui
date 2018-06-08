/**
 * A statndardized message object for use
 * in rendering messages in the chat feed.
 */
import * as React from 'react';

interface MessageData {
  id: number | string;
  message: any;
  senderName?: string;
  avatar?: any;
  timestamp?: Date;
  type?: string;
  isRead?: boolean;
  metaData?: any;
  styles?: any;

}

export default class Message {
  /**
   * Message object for organizing and storing current message data.
   */
  id: number | string;
  message: any;
  senderName?: string;
  avatar?: any;
  timestamp?: Date;
  type?: string;
  isRead?: boolean;
  metaData?: any;
  styles?: any;
  constructor(messageData: MessageData) {
    this.id = messageData.id; // id of the sender (0 is reserved for "blue bubble")
    this.message = messageData.message;
    this.senderName = messageData.senderName || undefined;
    this.avatar=messageData.avatar;
    this.timestamp=messageData.timestamp;
    this.type=messageData.type || 'text';
    this.isRead=messageData.isRead || false;
    this.metaData=messageData.metaData || {};
    this.styles=messageData.styles || null;
  }
}
