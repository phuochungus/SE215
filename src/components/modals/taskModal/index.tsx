import { Task } from "@/models/task";
import { User } from "@/models/user";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import SubTaskModal from "./subTaskModel";
import { Delete } from "@mui/icons-material";

// TaskModal Component
interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  users: User[];
}

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  onSubmit,
  users,
}) => {
  const [taskForm, setTaskForm] = useState<Task>({
    name: "",
    startDate: "",
    subTasks: [],
    assignee: null,
  });
  const [subTaskModalOpen, setSubTaskModalOpen] = useState(false);

  const handleTaskFormChange = (field: keyof Task, value: string) => {
    setTaskForm((prev) => ({ ...prev, [field]: value }));
  };

  const addSubTask = (subTask: Task) => {
    console.log(subTask);
    setTaskForm((prev) => ({ ...prev, subTasks: [...prev.subTasks, subTask] }));
  };

  const handleSubmit = () => {
    onSubmit(taskForm);
    onClose();
    setTaskForm({
      name: "",
      startDate: "",
      subTasks: [],
      assignee: null,
    });
  };

  function handleDelete(subTask: Task): void {
    setTaskForm({
      ...taskForm,
      subTasks: taskForm.subTasks.filter((e) => e != subTask),
    });
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            width: "500px",
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            Thêm công việc
          </Typography>
          <TextField
            fullWidth
            label="Tên công việc"
            value={taskForm.name}
            onChange={(e) => handleTaskFormChange("name", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="date"
            label="Ngày bắt đầu"
            InputLabelProps={{ shrink: true }}
            value={taskForm.startDate}
            onChange={(e) => handleTaskFormChange("startDate", e.target.value)}
            sx={{ mb: 2 }}
          />
          <Typography variant="subtitle2" mb={1}>
            Danh sách công việc phụ
          </Typography>
          {taskForm.subTasks.map((subTask, index) => (
            <Box
              key={index}
              sx={{ mb: 1, pl: 2, display: "flex", alignItems: "center" }}
            >
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {index + 1}. {subTask.name} (
                {subTask.assignee?.name ?? "Chưa gán"})
              </Typography>
              <IconButton onClick={() => handleDelete(subTask)} sx={{ ml: 2 }}>
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setSubTaskModalOpen(true)}
            sx={{ mb: 2 }}
          >
            + Thêm công việc phụ
          </Button>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button variant="outlined" onClick={onClose}>
              Hủy
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Thêm công việc
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* SubTaskModal */}
      <SubTaskModal
        open={subTaskModalOpen}
        onClose={() => setSubTaskModalOpen(false)}
        onSubmit={addSubTask}
        users={users}
      />
    </>
  );
};

export default TaskModal;
