import Contact from "@/models/contact";
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge } from "@mui/material";

const ContactGroup = ({ title, contacts }: {title: string, contacts: Array<Contact>}) => {
  return (
    <Box sx={{ mb: 2 }}>
      {/* Title */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {/* List of Contacts */}
      <List>
        {contacts.map((contact, index) => (
          <ListItem key={index} sx={{ p: 0.5 }}>
            <ListItemAvatar>
              {contact.avatar && <Avatar src={contact.avatar}>{contact.name.charAt(0)}</Avatar>}
            </ListItemAvatar>
            <ListItemText
              primary={contact.name}
              secondary={contact.lastMessage}
              primaryTypographyProps={{ fontWeight: 500 }}
              secondaryTypographyProps={{ color: "text.secondary" }}
            />
            {contact.unreadCount > 0 && (
              <Badge badgeContent={contact.unreadCount} color="error" sx={{ ml: 1 }} />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ContactGroup;
