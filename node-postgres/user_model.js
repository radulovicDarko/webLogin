const Pool = require('pg').Pool
const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'web_login',
  password: '',
  port: 5434,
});

const getUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const createUser = (body) => {
    return new Promise(function(resolve, reject) {
      const { username, hashedPassword, email } = body
      pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', [username, hashedPassword, email], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new user has been added. Added: ${results.rows[0]}`)
      })
    })
  }

  const updateUser = (body) => {
    return new Promise(function(resolve, reject) {
      const { userEmail, hashedPassword } = body
      pool.query(
        'UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, userEmail],
        (error, results) => {
          if (error) {
            throw error
          }
          resolve(`User modified successfully!`)
        })
    })
  }

  module.exports = {
    getUsers,
    createUser,
    updateUser,
  }