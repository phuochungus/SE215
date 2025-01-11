import { User } from "@/models/user";
import { Box, Typography, Avatar } from "@mui/material";

const ChatBubble = ({
  text,
  sender,
  isSender,
}: {
  text: string;
  sender: User;
  isSender: boolean;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSender ? "row-reverse" : "row",
        alignItems: "flex-end",
        mb: 1,
      }}
    >
      {/* Show sender's avatar if it's not the sender's own message */}
      {!isSender && (
        <Avatar
          src={sender.avatarUrl}
          alt={sender.name}
          sx={{ width: 30, height: 30, mr: 1 }}
        />
      )}
      
      <Box sx={{ maxWidth: "70%" }}>
        {/* Show sender's name above the chat bubble */}
        {!isSender && (
          <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.5 }}>
            {sender.name}
          </Typography>
        )}

        <Box
          sx={{
            px: 2,
            py: 1,
            borderRadius: 2,
            bgcolor: isSender ? "primary.main" : "grey.300",
            color: isSender ? "primary.contrastText" : "text.primary",
            alignSelf: isSender ? "flex-end" : "flex-start",
          }}
        >
          <Typography variant="body2">{text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBubble;
