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

function login(login, password, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/login",
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "login": login,
          "password": password
        }
    }

    $.ajax(settings)
    .done((result) => {
        callback(result)
    }).fail((err) => {
        callback({success : false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}