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
function getMarker(lat, lng, callback) {
    let configs = {
        "async": true,
        "crossDomain": true,
        "url": `/getMarker?lat=${lat}&lng=${lng}`,
        "method": "GET"
    }

    $.ajax(configs).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Mất kết nói với máy chủ. Vui lòng thử lại." });
    });
}


function getAllMarkers(callback) {
    let configs = {
        "async": true,
        "crossDomain": true,
        "url": `/getAllMarkers`,
        "method": "GET"
    }

    $.ajax(configs).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Mất kết nói với máy chủ. Vui lòng thử lại." });
    });
}


function getCrop(soil_id, callback) {
    let configs = {
        "async": true,
        "crossDomain": true,
        "url": `/getCrop?soil_id=${soil_id}`,
        "method": "GET"
    }

    $.ajax(configs).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Mất kết nói với máy chủ. Vui lòng thử lại." });
    });
}

function getAllCrop(callback) {
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

function addMarker(id_user, id_crop, sanluong, id_donvi, name, lat, lng, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/addMarker",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "id_user": id_user,
            "id_crop": id_crop,
            "name": name + "",
            "id_donvi": id_donvi,
            "lat": lat,
            "lng": lng,
            "sanluong": sanluong
        }
    }

    $.ajax(settings)
        .done((result) => {
            callback(result)
        }).fail((err) => {
            console.log("api err", err)
            callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
        });
}

function updateMarker(id, name, id_crop, sanluong, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/updateMarker",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "id": id,
            "id_crop": id_crop,
            "name": name + "",
            "sanluong": sanluong
        }
    }

    $.ajax(settings)
        .done((result) => {
            callback(result)
        }).fail((err) => {
            console.log("api err", err)
            callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
        });
}

