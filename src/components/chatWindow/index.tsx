import { Box, Typography, TextField, IconButton } from "@mui/material";
import { Send, InsertEmoticon, AttachFile, PhotoCamera, Mic } from "@mui/icons-material";
import ChatBubble from "./chatBubble";

const ChatWindow = () => {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
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
        <ChatBubble text="Yes, sure!" isSender={true} />
        <ChatBubble text="I am doing well. Can we meet tomorrow?" isSender={false} />
        <ChatBubble text="I am fine and how are you?" isSender={true} />
        <ChatBubble text="Hello!" isSender={true} />
        <ChatBubble text="How are you?" isSender={false} />
        <ChatBubble text="Hey There!" isSender={false} />
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
      </Box>
    </Box>
  );
};

export default ChatWindow;
