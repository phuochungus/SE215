import { User } from "./user";

export interface Message {
    id: string;            // Unique identifier for the message
    message: string;       // The content of the message
    createdAt: Date;       // Timestamp when the message was created
    sender: User;        // Sender of the message
    isMe?: boolean | null;
    isRead: boolean;       // Flag indicating whether the message has been read
    updatedAt?: Date;      // Optional: Timestamp for when the message was last updated
  }
  