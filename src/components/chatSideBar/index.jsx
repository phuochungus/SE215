import { Box, TextField } from "@mui/material";
import ContactGroup from "./contactGroup";
import Contact from "@/models/contact";

const ChatSideBar = () => {
  // Raw data for group contacts
  const groupData = [
    {
      name: "Gia đình",
      avatar: "/family.jpg",
      lastMessage: "Hahahahah!",
      unreadCount: 4,
    },
    {
      name: "Anh em",
      avatar: "/brother.jpg",
      lastMessage: "Hahahahah!",
      unreadCount: 0,
    },
  ];

  // Raw data for individual contacts
  const individualData = [
    {
      name: "Bố",
      avatar: "/father.jpg",
      lastMessage: "April fool's day",
      unreadCount: 0,
    },
    {
      name: "Mẹ",
      avatar: "/mother.jpg",
      lastMessage: "April fool's day",
      unreadCount: 0,
    },
    {
      name: "Em gái",
      avatar: "/sister.jpg",
      lastMessage: "April fool's day",
      unreadCount: 0,
    },
  ];

  // Create contact instances
  const groupContacts = Contact.createContacts(groupData);
  const individualContacts = Contact.createContacts(individualData);

  return (
    <Box
      sx={{
        width: { xs: "100%"},
        p: 2,
        borderRight: "1px solid #e0e0e0",
        bgcolor: "background.paper",
        height: "calc(100vh - 64px)",
        overflowY: "auto",
      }}
    >
      {/* Search Box */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search"
        variant="outlined"
        sx={{ mb: 2 }}
      />

      {/* Group Contacts */}
      <ContactGroup title="Nhóm" contacts={groupContacts} />

      {/* Individual Contacts */}
      <ContactGroup title="Cá nhân" contacts={individualContacts} />
    </Box>
  );
};

export default ChatSideBar;
