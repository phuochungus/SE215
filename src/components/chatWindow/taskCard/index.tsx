import React, { useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Task } from "@/models/task";
import { TaskDetailModal } from "@/components/chatDetailModal";

const TaskCard = ({ task }: { task: Task }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <Container sx={{ width: "100%", display: "flex", justifyContent: "center"}}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "background.paper",
          boxShadow: 1,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            bgcolor: "#4a4b61",
            color: "white",
          }}
        >
          <Typography variant="subtitle1">{task.name}</Typography>
        </Box>

        {/* Content */}
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", mb: 2, justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Ngày bắt đầu
            </Typography>
            {task.startDate && (
              <Typography variant="body2">{task.startDate}</Typography>
            )}
          </Box>

          <Button
            variant="outlined"
            fullWidth
            onClick={handleOpen}
            sx={{
              textTransform: "none",
              color: "text.primary",
              borderColor: "divider",
            }}
          >
            Xem chi tiết
          </Button>
        </Box>
      </Box>
      <TaskDetailModal
        task={task}
        open={open}
        onClose={handleClose}
      />
    </Container>
  );
};

export default TaskCard;
