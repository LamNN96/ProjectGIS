const db = require('../utils/connect')


function getInfo(lat, lng, callback) {
    db.query(`SELECT ten, gid, danso, vote1, vote2 FROM vietnam_provinces where st_contains(geom, ST_GeomFromText('POINT(${lng} ${lat})'))`, (err, res) => {
        callback(err, res)
      })
}

function login(login, password, callback) {
    console.log(login, password)
    db.query(`select users.* from User where users.login like '${login}' and users.password like '${password}'`, (err, res) => {
		callback(err, res)
	})
}

module.exports = {getInfo, login}