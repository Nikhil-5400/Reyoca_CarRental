const mysql = require('mysql2');
const db = require('../../dbcon');
const dotenv = require('dotenv');
dotenv.config();


class CartModel {
    static async view_cart(id, callback) {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });
        connection.connect((err) => {
            if (err) {
              return callback(err, null);
            }
            connection.query(
                'SELECT * FROM cart WHERE rentee_id = ?',
                [id],
                (error, results) => {
                  if (error) {
                    callback(err, null);
                  } else if (results.length === 0) {
                    return callback(null, "No items in this users cart");
                  } else {
                    return callback(null, results);
                  }
                }
              );
        });
    }
    static async delete_car(ids, callback) {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });
        connection.connect((err) => {
            if (err) {
              return callback(err, null);
            }
            const rentee_id = ids['rentee_id'];
            const vehicle_id = ids['vehicle_id'];
            if (rentee_id && vehicle_id) {
                connection.query(
                    'DELETE FROM cart WHERE rentee_id = ? and vehicle_id = ?',
                    [rentee_id, vehicle_id],
                    (error, results) => {
                        if (error) {
                            callback(err, null);
                        } else if (results.affectedRows === 0) {
                            return callback(null, "Empty cart or not a valid user");
                        } else {
                            return callback(null, "Car deleted successfully!!");
                        }
                    }
                );
            }
        });
    }
}

module.exports = CartModel;

