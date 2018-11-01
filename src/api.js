function getGeoJSON(callback) {
    let configs = {
        "async": true,
        "crossDomain": true,
        "url": "/geojson",
        "method": "GET"
    }

    $.ajax(configs).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: err });
    });
}

function getInfo(lat, lng, callback) {
    let configs = {
        "async": true,
        "crossDomain": true,
        "url": `/getInfo?lat=${lat}&lng=${lng}`,
        "method": "GET"
    }

    $.ajax(configs).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Mất kết nói với máy chủ. Vui lòng thử lại." });
    });
}



function getCrop(domsoil, callback) {
    let configs = {
        "async": true,
        "crossDomain": true,
        "url": `/getCrop?soil_id=${domsoil}`,
        "method": "GET"
    }

    $.ajax(configs).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Mất kết nói với máy chủ. Vui lòng thử lại." });
    });
}

function getAllCrop( callback) {
    let configs = {
        "async": true,
        "crossDomain": true,
        "url": `/getAllCrop`,
        "method": "GET"
    }

    $.ajax(configs).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Mất kết nói với máy chủ. Vui lòng thử lại." });
    });
}
function filter(id_crop, sl, callback) {
    let configs = {
        "async": true,
        "crossDomain": true,
        "url": `/filter?id_crop=${id_crop}&sl=${sl}`,
        "method": "GET"
    }

    $.ajax(configs).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Mất kết nói với máy chủ. Vui lòng thử lại." });
    });
}

function login(name, crop, sl, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/addMarker",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "name": name,
            "crop": crop,
            "sl": sl
        }
    }

    $.ajax(settings)
        .done((result) => {
            callback(result)
        }).fail((err) => {
            callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
        });
}

function login(username, password, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/login",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "username": username,
            "password": password
        }
    }

    $.ajax(settings)
        .done((result) => {
            callback(result)
        }).fail((err) => {
            callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
        });
}