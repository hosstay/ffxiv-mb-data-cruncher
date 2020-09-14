const db = require('../database/database');
const security = require('../security/security');

async function addData(req, res) {
  try {
    const data = req.body.dataObjs;
    const date = req.body.date;

    let query = '';

    data.forEach((datum) => {
      query += `INSERT INTO ffxi_mb_data_dump (item_name, type, initial_cost, gross, date) VALUES ('${datum.itemName.replace(/\'/, '\'\'')}', '${datum.type}', ${datum.initialCost.replace(/\,/, '')}, ${datum.gross.replace(/\,/, '')}, '${date}');\n`;
    });

    await db.query(query);

    return res.status(200).json(security.encrypt({success: true, result: {success: true}}));
  } catch (err) {
    console.log(err);
    return res.status(200).json(security.encrypt({success: true, result: {success: false, msg: err.message}}));
  }
}

async function getAllData(req, res) {
  try {
    const data = await db.query('SELECT * FROM ffxi_mb_data_dump ORDER BY item_name, date;');

    return res.status(200).json(security.encrypt({success: true, result: {success: true, data: data[0]}}));
  } catch (err) {
    console.log(err);
    return res.status(200).json(security.encrypt({success: true, result: {success: false, msg: err.message}}));
  }
}

module.exports = {
  addData: addData,
  getAllData: getAllData
};