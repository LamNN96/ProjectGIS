const db = require('../utils/connect')


function getInfo(lat, lng, callback) {
    db.query(`SELECT * from  vnm_adm2, tho_nhuong where st_contains(vnm_adm2.geom, ST_GeomFromText('POINT(${lng} ${lat})')) and st_contains(tho_nhuong.geom, ST_GeomFromText('POINT(${lng} ${lat})'))`, (err, res) => {
        callback(err, res)
    })
}

function getCrop(soil_id, callback) {
    db.query(`SELECT * from crop, crop_detail, soil_detail 
                where soil_detail.crops = crop_detail.id 
                and crop_detail.id_crop = crop.id_crop and domsoil = '${soil_id}'`
        , (err, res) => {
            callback(err, res)
        })
}

function getAllCrop(callback) {
    db.query(`SELECT * from crop`, (err, res) => {
        callback(err, res);
    })
}

function getAllMarkers(callback) {
    db.query(`SELECT * from marker`, (err, res) => {
        callback(err, res);
    })
}
function getMarker(lat, lng, callback) {
    db.query(`SELECT * from marker where lat = ${lat} and lng = ${lng}`, (err, res) => {
        callback(err, res);
    })
}
function addMarker(id_user, id_crop, sanluong, id_donvi, name, lat, lng, callback) {
    console.log(name)
    db.query(`insert into marker(id, id_user, id_crop, sanluong, id_donvi, name_marker, lat, lng) 
    VALUES (DEFAULT, ${id_user}, ${id_crop}, ${sanluong}, ${id_donvi}, '${name}',${lat}, ${lng})`, (err, res) => {
            console.log("Query err", res)
            callback(err, res)
        })
}
function updateMarker(id, name, id_crop, sanluong, callback) {
    console.log(name)
    db.query(`update marker set id_crop = ${id_crop}, name_marker = '${name}', sanluong = ${sanluong} where id = ${id}`, (err, res) => {
        console.log("Qerry err", err)
        callback(err, res)
    })
}
function filter(id_crop, sl, callback) {
    db.query(`select * from marker where id_crop = ${id_crop} and sanluong >= ${sl}`, (err, res) => {
        callback(err, res)
    })
}





module.exports = { getInfo, getCrop, getAllCrop, addMarker, filter, getAllMarkers, getMarker, updateMarker }