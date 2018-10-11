var mymap;
var lyrOSM;

$(document).ready(function () {
    mymap = L.map('map123', { center: [16.69, 106.92], zoom: 5.5 });
    // lyrOSM = L.geoJson(vietnam);
    // mymap.addLayer(lyrOSM); 

    //Tao va add Map from GeoServer
    // var wmsLayer = L.tileLayer.wms("http://localhost:8080/geoserver/Maps/wms", {
    //     layers: 'Maps:vnm_adm1',
    //     format: 'image/png',
    //     transparent: true,
    //     attribution: "Hydropower of Vietnam"
    // }).addTo(mymap);

    // var hpLayer = L.tileLayer.wms("http://localhost:8080/geoserver/Maps/wms", {
    //     layers: 'Maps:hydropower_dams',
    //     format: 'image/png',
    //     transparent: true
    // }).addTo(mymap);

    function style(feature) {
        return {
            fillColor: getColor(feature.properties.domsoil),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }


    getGeoJSON((data) => {
        lyrOSM = L.geoJson(data, {
            style: style,
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.kieu);
            }
        });
        mymap.addLayer(lyrOSM);
    })
    //  var baseLayer = {"Base" : [wmsLayer, hpLayer]};

    // L.control.layers(baseLayer, lyrOSM).addTo(mymap);
    // hpLayer.on('click', onMapClick);



    //side bar
    var ctlSidebar = L.control.sidebar('side-bar').addTo(mymap);

    var ctlEasybutton = L.easyButton('glyphicon-transfer', function () {
        ctlSidebar.toggle();
    }).addTo(mymap);

    // var popup = L.popup();

    // function onMapClick(e) {
    //     popup
    //         .setLatLng(e.latlng)
    //         .setContent("You clicked the map at " + e.latlng.toString())
    //         .openOn(mymap);
    // }


});

function getColor(domsoil) {
    switch (domsoil) {
        //Đất xám bạc màu trên đá trầm tích và đá biến chất
        case "Ao": return "#d7e9f2";

        //"faosoil": "Af63-3c", "kieu": "Đất xám bạc màu nâu đỏ"
        case "Af": return "#b59884";

        //Đất phù sa phì nhiêu
        case "Je": return "#61b8dd";

        //Đất sét giàu dinh dưỡng phì nhiêu
        case "Ge": return "#546bdd";

        //", "kieu": "Đất nứt nẻ, khô hạn
        case "Vp": return "#f7ef07";

        //"faosoil": "Gd29-3a", "kieu": "Đất sét than bùn"
        case "Gd": return "#443f39";

        //"faosoil": "I-Af-3c", "kieu": "Đất núi đa"
        case "I": return "#d6821d";

        // "Ag17-1\/2ab", "kieu": "Đất xám bạc màu phiến sét" 
        case "Ag": return "#d6571d";

        //"faosoil": "Jt13-3a", "kieu": "Đất phù sa nước lợ mặn" 
        case "Jt": return "#876dce";

        //"faosoil": "Re83-1ab", "kieu": "Đất cát pha" 
        case "Re": return "#ccc56a";

        //"faosoil": "Lc100-c", "kieu": "Đất nâu đen phát triển trên đá bazan, núi lửa"
        case "Lc": return "#54422d";

        //"faosoil": "Fr33-3ab", "kieu": "Đất nâu đỏ trên đá bazan"
        case "Fr": return "#703d02";

        //"faosoil": "Fa14-3ab", "kieu": "Đất nâu đỏ khô hạn"
        case "Fa": return "#a38004";

        //"domsoil": "Od", "faosoil": "Od21-a", "kieu": "Đất hữa cơ"
        case "Od": return "#06e5cb";

        // "domsoil": "Fo", "faosoil": "Fo102-3ab", "kieu": "Đất nâu đỏ trên đá quartz"
        case "Fo": return "#f20438";

        default: return "#000000";
    }
}