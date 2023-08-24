import React, { useState, ChangeEvent, FormEvent } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface UserProfileProps {}

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  maxWidth: "400px",
  margin: "0 auto",
}));

const UserProfile: React.FC<UserProfileProps> = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can perform API calls to update user data
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <StyledContainer maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        User Profile
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ color: "#fff" }}
          fullWidth
        >
          Save Changes
        </Button>
      </StyledForm>
    </StyledContainer>
  );
};

export default UserProfile;
