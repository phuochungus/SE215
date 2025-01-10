import { Box, Typography } from "@mui/material";

const ChatBubble = ({
  text,
  isSender,
}: {
  text: string;
  isSender: boolean;
}) => {
  return (
    <Box
      sx={{
        maxWidth: "70%",
        px: 2,
        py: 1,
        borderRadius: 2,
        bgcolor: isSender ? "primary.main" : "grey.300",
        color: isSender ? "primary.contrastText" : "text.primary",
        alignSelf: isSender ? "flex-end" : "flex-start",
        mb: 1,
      }}
    >
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

export default ChatBubble;
