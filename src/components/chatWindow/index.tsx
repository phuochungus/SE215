import { ReactNode, useState } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import {
  Send,
  InsertEmoticon,
  AttachFile,
  PhotoCamera,
  Mic,
  TaskAlt,
} from "@mui/icons-material";
import { Task } from "@/models/task";
import { User } from "@/models/user";
import { Message } from "@/models/message";
import TaskModal from "../modals/taskModal";
import ChatBubble from "./chatBubble";
import TaskCard from "./taskCard";
export const exampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    avatarUrl: "https://example.com/avatars/john_doe.png",
    phoneNumber: "+1234567890",
    email: "john.doe@example.com",
    status: "online",
    lastSeen: new Date(),
    role: "admin",
    bio: "Lead developer with a passion for coding.",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatarUrl: "https://example.com/avatars/alice_johnson.png",
    phoneNumber: "+9876543210",
    email: "jane.smith@example.com",
    status: "offline",
    lastSeen: new Date(Date.now() - 3600 * 1000), // 1 hour ago
    role: "member",
    bio: "Project manager and multitasker.",
  },
  {
    id: "3",
    name: "Alice Johnson",
    avatarUrl: "https://example.com/avatars/alice_johnson.png",
    phoneNumber: "+1122334455",
    status: "busy",
    lastSeen: new Date(Date.now() - 24 * 3600 * 1000), // 1 day ago
    role: "guest",
    bio: "Freelance consultant and tech enthusiast.",
  },
  {
    id: "4",
    name: "Bob Brown",
    avatarUrl: "https://example.com/avatars/bob_brown.png",
    phoneNumber: "+9988776655",
    email: "bob.brown@example.com",
    status: "online",
    lastSeen: new Date(),
    role: "member",
    bio: "UI/UX designer with 5+ years of experience.",
  },
  {
    id: "5",
    name: "Charlie Davis",
    avatarUrl: "https://example.com/avatars/charlie_davis.png",
    phoneNumber: "+5566778899",
    status: "offline",
    lastSeen: new Date(Date.now() - 6 * 3600 * 1000), // 6 hours ago
    role: "guest",
    bio: "QA engineer and problem solver.",
  },
];
const messages: Message[] = [
  {
    id: "1",
    message: "Hey, are you available for a meeting today?",
    createdAt: new Date("2025-01-10T09:00:00Z"),
    sender: exampleUsers[0], // John Doe
    isRead: true,
  },
  {
    id: "2",
    message: "Yes, I’m free at 3 PM. Does that work for you?",
    createdAt: new Date("2025-01-10T09:05:00Z"),
    sender: exampleUsers[4], // Jane Smith
    isRead: true,
  },
  {
    id: "3",
    message: "3 PM works perfectly. Let’s catch up then.",
    createdAt: new Date("2025-01-10T09:10:00Z"),
    sender: exampleUsers[2], // John Doe
    isRead: false,
  },
  {
    id: "4",
    message: "Great, I’ll send you a calendar invite shortly.",
    createdAt: new Date("2025-01-10T09:15:00Z"),
    sender: exampleUsers[2], // Jane Smith
    isRead: false,
  },
  {
    id: "5",
    message: "Looking forward to it!",
    createdAt: new Date("2025-01-10T09:20:00Z"),
    sender: exampleUsers[4], // John Doe
    isRead: false,
  },
];
const ChatWindow = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [chatHistory, setChatHistory] =
    useState<Array<Message | Task>>(messages);

  const handleTaskModalToggle = () => setIsTaskModalOpen(!isTaskModalOpen);

  const handleAddTask = (newTask: Task) => {
    setChatHistory((prev) => [...prev, newTask]);
  };

  function generateMessage(e: Message | Task, key: number): ReactNode {
    if ("message" in e)
      return (
        <ChatBubble
          text={e.message}
          isSender={e.isMe ?? false}
          key={key}
          sender={e.sender}
        />
      );
    return <TaskCard task={e} />;
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          borderBottom: "1px solid #e0e0e0",
          pb: 2,
          px: 2,
        }}
      >
        <Typography variant="h6">Anil</Typography>
        <Typography variant="body2" color="textSecondary">
          Online - Last seen, 2.02pm
        </Typography>
      </Box>

      {/* Chat Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column-reverse", // Ensures messages start from the bottom
          px: 2,
          py: 2,
        }}
      >
        {/* Existing chat messages */}
        {chatHistory.toReversed().map((e, index) => generateMessage(e, index))}
      </Box>

      {/* Input Box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #e0e0e0",
          p: 1,
          background: "#f9f9f9",
        }}
      >
        <IconButton>
          <AttachFile />
        </IconButton>
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <PhotoCamera />
        </IconButton>
        <TextField
          fullWidth
          placeholder="Type your message here..."
          sx={{ mx: 1, background: "#f1f1f1", borderRadius: 2 }}
        />
        <IconButton>
          <Mic />
        </IconButton>
        <IconButton>
          <Send />
        </IconButton>
        <IconButton onClick={handleTaskModalToggle}>
          <TaskAlt />
        </IconButton>
      </Box>

      {/* Task Modal */}
      <TaskModal
        users={exampleUsers}
        open={isTaskModalOpen}
        onClose={handleTaskModalToggle}
        onSubmit={handleAddTask}
      />
    </Box>
  );
};

export default ChatWindow;
