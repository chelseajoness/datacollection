// formController.js
const connection = require('/frontend/src/dbInit.js');

const insertFormData = (formData, callback) => {
    const sql = `
        INSERT INTO assessments (
            professor_name, semester, course_type, course,
            section_numbers, csc_majors, itc_majors,
            majors_meeting_target, comments, rubric_file_path
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const values = [
        formData.professorName,
        formData.semester,
        formData.courseType,
        formData.course,
        formData.sectionNumbers,
        formData.cscMajors,
        formData.itcMajors,
        formData.majorsMeetingTarget,
        formData.comments,
        formData.rubricFilePath || null  // optional file path
    ];

    connection.query(sql, values, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};
    const getFormData = (callback) => {
        const sql = 'SELECT * FROM assessments;';
        connection.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    };

module.exports = { insertFormData, getFormData };
