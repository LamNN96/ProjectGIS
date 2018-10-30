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
            console.log(data)
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
})

module.exports = router;