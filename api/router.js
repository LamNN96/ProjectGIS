var express = require('express')
var query = require('./query')
var router = express.Router()


router.get('/getInfo', async (req, res) => {
    let lat = req.query.lat
    let lng = req.query.lng

    query.getInfo(lat, lng, (err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            //console.log(data)
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
});

router.post('/login', async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    query.login(username, password, (err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            //console.log(data)
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
});

router.post('/marker', async (req, res) => {
    let name = req.body.name
    let crop = req.body.crop
    let sl = req.body.sl

    query.addMarker(name, crop, sl, (err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            //console.log(data)
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
});

router.get('/getCrop', async (req, res)=>{
    console.log(req.query.soil_id)
    let soil_id = req.query.soil_id
    query.getCrop(soil_id, (err, data) => {
        if (err) {
            res.json({success: false, error : err})
<<<<<<< HEAD
           console.log("Fail")
        } else {
          console.log("OK")
=======
        } else {
>>>>>>> thangnd
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
})

router.get('/getAllCrop', async (req, res)=>{
    query.getAllCrop((err, data) => {
        if (err) {
            console.log("Error", err)
            res.json({success: false, error : err})
        } else {
            res.json({
                success: true,
                data: data.rows
            })
        }
    })
})
router.get('/filter', async (req, res)=>{
    let id_crop = req.query.id_crop;
    let sl = req.query.sl;
    query.filter(id_crop, sl, (err, data) => {
        if (err) {
            console.log("Error", err)
            res.json({success: false, error : err})
        } else {
            res.json({
                success: true,
                data: data.rows
            })
        }
    })
})

module.exports = router;