import { Task } from "@/models/task";
import { User } from "@/models/user";
import {
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useState } from "react";

// SubTaskModal Component
interface SubTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (subTask: Task) => void;
  users: User[];
}

const SubTaskModal = (props: SubTaskModalProps) => {
  const { open, onClose, onSubmit, users } = props;
  const [subTaskForm, setSubTaskForm] = useState<Task>({
    name: "",
    startDate: null,
    subTasks: [],
    assignee: null,
  } as Task);

  const handleSubTaskFormChange = (field: keyof Task, value: string) => {
    if(field.toString() == "assignee") {
        setSubTaskForm((prev) => ({ ...prev, assignee: users.find((e) => e.id == value) ?? null }));
        return;
    }
    setSubTaskForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(subTaskForm);
    onClose();
    setSubTaskForm({
      name: "",
      startDate: "",
      subTasks: [],
      assignee: null,
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          width: "400px",
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add Subtask
        </Typography>
        <TextField
          fullWidth
          label="Subtask Name"
          value={subTaskForm.name}
          onChange={(e) => handleSubTaskFormChange("name", e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Assignee</InputLabel>
          <Select
            value={subTaskForm.assignee?.name}
            onChange={(e) =>
              handleSubTaskFormChange("assignee", e.target.value)
            }
          >
            {users.map((user, index) => (
              <MenuItem value={user.id} key={index}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add Subtask
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default SubTaskModal;
