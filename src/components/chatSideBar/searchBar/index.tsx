"use client";
import { Box, TextField, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { ChangeEvent } from "react";

const SearchBar = ({ onSearch }: { onSearch: (param: string) => void }) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
        p: 1,
        maxWidth: { xs: "100%" },
        mx: "auto",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Search"
        onChange={handleSearch}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />
      <IconButton
        color="primary"
        sx={{ ml: 1 }}
        onClick={() => console.log("Search triggered")}
      >
        <Search />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
