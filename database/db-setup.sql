-- db-setup for assessment form
CREATE DATABASE IF NOT EXISTS course_assessment;

USE course_assessment;

CREATE TABLE assessments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    professor_name VARCHAR(255) NOT NULL,
    semester VARCHAR(50) NOT NULL,
    course_type ENUM('undergraduate', 'graduate') NOT NULL,
    course VARCHAR(255),
    section_numbers VARCHAR(50) NOT NULL,
    csc_majors INT NOT NULL,
    itc_majors INT NOT NULL,
    majors_meeting_target INT NOT NULL,
    comments TEXT,
    rubric_file_path VARCHAR(255)
);
