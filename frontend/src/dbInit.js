// Initialize the database

const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'mysql-service', // Kubernetes service name
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || 'course_assessment',
    multipleStatements: true
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');

    const sql = fs.readFileSync('./database/db-setup.sql', 'utf-8');
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error setting up database schema:', err);
        } else {
            console.log('Database schema setup complete.');
        }
    });
});

module.exports = connection;
