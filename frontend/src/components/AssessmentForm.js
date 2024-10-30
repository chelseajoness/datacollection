import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Container,
  Typography,
  Paper,
} from '@mui/material';

const AssessmentForm = () => {
  const [formData, setFormData] = useState({
    professorName: '',
    semester: '',
    courseType: '',
    course: '',
    sectionNumbers: '',
    cscMajors: '',
    itcMajors: '',
    majorsMeetingTarget: '',
    comments: '',
    rubricFile: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rubricFile: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your submit logic here
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, color: '#9c27b0' }}>
        Course Assessment Data Collection
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#1e1e1e', color: 'white' }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ 
          display: 'grid', 
          gap: 3,
          gridTemplateColumns: 'repeat(2, 1fr)'
        }}>
          {/* First row */}
          <TextField
            name="professorName"
            label="Professor Name"
            value={formData.professorName}
            onChange={handleChange}
            fullWidth
            required
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'grey' },
                '&:hover fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'grey' }
            }}
          />

          <TextField
            name="semester"
            label="Enter Semester (example: Fall 2020)"
            value={formData.semester}
            onChange={handleChange}
            fullWidth
            required
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'grey' },
                '&:hover fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'grey' }
            }}
          />

          {/* Second row */}
          <FormControl fullWidth>
            <InputLabel sx={{ color: 'grey' }}>Select Course Type</InputLabel>
            <Select
              name="courseType"
              value={formData.courseType}
              onChange={handleChange}
              label="Select Course Type"
              sx={{ 
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              }}
            >
              <MenuItem value="">--Select Course Type--</MenuItem>
              <MenuItem value="undergraduate">Undergraduate</MenuItem>
              <MenuItem value="graduate">Graduate</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel sx={{ color: 'grey' }}>Select Course</InputLabel>
            <Select
              name="course"
              value={formData.course}
              onChange={handleChange}
              label="Select Course"
              sx={{ 
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              }}
            >
              <MenuItem value="">--Select Course--</MenuItem>
              {/* Add your course options here */}
            </Select>
          </FormControl>

          {/* Third row */}
          <TextField
            name="sectionNumbers"
            label="Section Numbers"
            value={formData.sectionNumbers}
            onChange={handleChange}
            fullWidth
            required
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'grey' },
                '&:hover fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'grey' }
            }}
          />

          {/* Split Number of Majors into CSC and ITC */}
          <Box sx={{ 
            gridColumn: '2', 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: 2 
          }}>
            <TextField
              name="cscMajors"
              label="CSC Majors"
              type="number"
              value={formData.cscMajors}
              onChange={handleChange}
              fullWidth
              required
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'grey' },
                  '&:hover fieldset': { borderColor: 'white' },
                },
                '& .MuiInputLabel-root': { color: 'grey' }
              }}
            />
            <TextField
              name="itcMajors"
              label="ITC Majors"
              type="number"
              value={formData.itcMajors}
              onChange={handleChange}
              fullWidth
              required
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'grey' },
                  '&:hover fieldset': { borderColor: 'white' },
                },
                '& .MuiInputLabel-root': { color: 'grey' }
              }}
            />
          </Box>

          {/* Fourth row - spans full width */}
          <TextField
            name="majorsMeetingTarget"
            label="Number of Majors Who Met Target"
            type="number"
            value={formData.majorsMeetingTarget}
            onChange={handleChange}
            fullWidth
            required
            sx={{ 
              gridColumn: '1 / -1',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'grey' },
                '&:hover fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'grey' }
            }}
          />

          {/* Comments field - spans full width */}
          <TextField
            name="comments"
            label="Comments"
            multiline
            rows={4}
            value={formData.comments}
            onChange={handleChange}
            fullWidth
            sx={{ 
              gridColumn: '1 / -1',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'grey' },
                '&:hover fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'grey' }
            }}
          />

          {/* File upload - spans full width */}
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Typography sx={{ mb: 1 }}>Upload any rubrics used:</Typography>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ color: 'white' }}
            />
          </Box>

          {/* Submit button - spans full width */}
          <Button
            type="submit"
            variant="contained"
            sx={{ 
              gridColumn: '1 / -1',
              mt: 2,
              backgroundColor: '#9c27b0',
              '&:hover': {
                backgroundColor: '#7b1fa2'
              }
            }}
          >
            Submit Form
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AssessmentForm;