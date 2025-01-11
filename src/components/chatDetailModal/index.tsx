import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Modal,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { Task } from '@/models/task';

interface TaskDetailModalProps {
  task: Task;
  open: boolean;
  onClose: () => void;
}

export const TaskDetailModal = ({ task, open, onClose }: TaskDetailModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="task-details-modal"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            p: 2,
            bgcolor: '#4a4b61',
            color: 'white',
          }}
        >
          <Typography variant="h6">Chi tiết công việc</Typography>
        </Box>

        {/* Modal Content */}
        <Box sx={{ p: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {task.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Ngày bắt đầu: {task.startDate ? new Date(task.startDate).toLocaleDateString('vi-VN') : 'N/A'}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Người được giao: {task.assignee?.name ?? 'Chưa phân công'}
          </Typography>

          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
            Các công việc con:
          </Typography>

          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {task.subTasks && task.subTasks.length > 0 ? (
              task.subTasks.map((subTask: Task, index: number) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={subTask.name}
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          Người được giao: {subTask.assignee?.name ?? 'Chưa phân công'}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < task.subTasks.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="Không có công việc con" />
              </ListItem>
            )}
          </List>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                bgcolor: '#4a4b61',
                '&:hover': {
                  bgcolor: '#3a3b4f',
                },
              }}
            >
              Đóng
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};