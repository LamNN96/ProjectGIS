var mymap;
var lyrOSM;

var lyrImagery;
var lyrVoyaer;
var mrkCurrentLocation;
var fgpDrawnItems;
var ctlAttribute;
var ctlScale;
var ctlMouseposition;
var ctlMeasure;
var ctlEasybutton;
var ctlSidebar;
var ctlLayers;
var ctlDraw;
var ctlStyle;
var objBasemaps;
var objOverlays;
var icnRedSprite;
var icnVioletSprite;
var icnLAMtree;
var icnLAMbird;
var icnMKTree;
var icnMKBird;
var icnEagleActive;
var icnEagleInactive;
var preMakerLatLng;

$(document).ready(function () {
    mymap = L.map('map123', { center: [22, 105], zoom: 7.5 });
    
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

    lyrImagery = L.tileLayer.provider('Esri.WorldImagery');

    lyrVoyaer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    });
    lyrVoyaer.addTo(mymap)
    objBasemaps = {
        "Imagery": lyrImagery,
        "Voyaer": lyrVoyaer
    };
    getGeoJSON((data) => {
        console.log(data)
        lyrGEO = L.geoJson(data, {
            style: style,
            onEachFeature: function (feature, layer) {
                layer.on({
                    mouseover: onMouseOver,
                    click: onClickFeature,
                    mouseOut: onMouseOut
                })
            }
        });

        objOverlays = {
            "Tho Nhuong": lyrGEO,
        };

        L.control.layers(objBasemaps, objOverlays).addTo(mymap);
    })

    function onMouseOver(e) {

    }
    function onMouseOut(e) {
        console.log("M out ", e)
    }
    var marker;
    function onClickFeature(e) {
        ctlSidebar.show();
        let properties = e.target.feature.properties;
        let latlng = e.latlng;
        console.log(latlng)
        if (marker != null) { 
            mymap.removeLayer(marker); 
        }
        marker = new L.Marker(latlng); 
        marker.addTo(mymap);
        getInfo(latlng.lat, latlng.lng, (data) => {
            console.log(data)
            document.getElementById("soilDetail").innerHTML = data.data.kieu;
            document.getElementById("locationDetail").innerHTML = data.data.type_2 + " " + data.data.name_2 + ", " + data.data.name_1;
        });

        preMakerLatLng = latlng;
    }




    mymap.on('draw:created', function (e) {
        fgpDrawnItems.addLayer(e.layer);
    });

    mymap.on('locationfound', function (e) {
        onMapClick(e);
        var mrkCurrentLocation = L.circle(e.latlng, { radius: e.accuracy / 2 }).addTo(mymap);
        mymap.setView(e.latlng, 15);
    });

    mymap.on('locationerror', function (e) {
        console.log(e);
        alert("Location was not found");
    })

    $("#btnLocate").click(function () {
        mymap.locate();
    });

    var ctlSidebar = L.control.sidebar('side-bar').addTo(mymap);

    var ctlEasybutton = L.easyButton('glyphicon-transfer', function () {
        ctlSidebar.toggle();
    }).addTo(mymap);

    function onMapClick(e) {
        ctlSidebar.show();
        let latlng = e.latlng;
        var crops = [];
        if (marker != null) { 
            mymap.removeLayer(marker); 
        }
        marker = new L.Marker(latlng); 
        marker.addTo(mymap);
        getInfo(latlng.lat, latlng.lng, (data) => {
            document.getElementById("soilDetail").innerHTML = data.data.kieu;
            document.getElementById("locationDetail").innerHTML = data.data.type_2 + " " + data.data.name_2 + ", " + data.data.name_1;
            getCrop(data.data.domsoil, (cropsData)=>{
                document.getElementById("crops").innerHTML = cropsData.data.name;
            })
        });

    }
    
    mymap.on('click', onMapClick);

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