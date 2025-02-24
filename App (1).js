import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  LinearProgress,
  Typography,
  Box,
} from "@mui/material";

const Survey = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    satisfaction: "",
  });
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const filledFields = Object.values(formData).filter(
      (value) => value !== ""
    ).length;
    setProgress((filledFields / 4) * 100);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (progress === 100) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", age: "", satisfaction: "" });
      }, 5000);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: "#f5f5f5", p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Denos su opinion!!!
        </Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Satisfaction Level
          </Typography>
          <RadioGroup
            name="satisfaction"
            value={formData.satisfaction}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Very Satisfied"
              control={<Radio />}
              label="Very Satisfied"
            />
            <FormControlLabel
              value="Satisfied"
              control={<Radio />}
              label="Satisfied"
            />
            <FormControlLabel
              value="Neutral"
              control={<Radio />}
              label="Neutral"
            />
            <FormControlLabel
              value="Dissatisfied"
              control={<Radio />}
              label="Dissatisfied"
            />
          </RadioGroup>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={progress < 100}
          >
            Submit Survey
          </Button>
        </form>
        {submitted && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            Survey submitted successfully!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Survey;
