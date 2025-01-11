"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import ChatWindow from "@/components/chatWindow";
import ChatSideBar from "@/components/chatSideBar";
const ResizableLayout = () => {
  const [sideBarWidth, setSideBarWidth] = useState(300); // Default sidebar width in pixels

  const handleDrag = (e: MouseEvent) => {
    // Prevent default behavior
    e.preventDefault();
    // Calculate new sidebar width based on mouse position
    const newWidth = Math.max(200, Math.min(e.clientX, window.innerWidth - 300)); // Min 200px, Max window width - 300px
    setSideBarWidth(newWidth);
  };

  const stopDrag = () => {
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

  const startDrag = () => {
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  return (
    <Box
      sx={{
        display: "flex",
        // height: "100vh",
        marginTop: "64px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: `${sideBarWidth}px`,
          minWidth: "200px",
          maxWidth: "70%",
          bgcolor: "background.paper",
          borderRight: "1px solid #e0e0e0",
          overflowY: "auto",
        }}
      >
        <ChatSideBar/>
      </Box>

      {/* Resizer */}
      <Box
        sx={{
          width: "5px",
          cursor: "ew-resize",
          bgcolor: "gray",
        }}
        onMouseDown={startDrag}
      />

      {/* Chat Window */}
      <Box
        sx={{
          flex: 1, // Fill remaining space
          bgcolor: "background.default",
          overflowY: "auto",
        }}
      >
        <ChatWindow/>
      </Box>
    </Box>
  );
};

export default ResizableLayout;
