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
var currentLayerGroup;
var markerToCreate = {
    id_user: "",
    name: "",
    lat: "",
    lng: "",
    id_crop: "",
    sanluong: "",
    don_vi: ""
}
var crops;
$(document).ready(function () {
    if (localStorage.getItem('login') == 'false')
        window.location.href = '/'
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
        onMapClick(e);
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
        markerToCreate.lat = latlng.lat;
        markerToCreate.lng = latlng.lng;
        if (marker != null) {
            mymap.removeLayer(marker);
        }
        marker = new L.Marker(latlng);
        marker.addTo(mymap);
        getInfo(latlng.lat, latlng.lng, (data) => {
            console.log(latlng)
            document.getElementById("soilDetail").innerHTML = data.data.kieu;
            document.getElementById("locationDetail").innerHTML = data.data.type_2 + " " + data.data.name_2 + ", " + data.data.name_1;
            getCrop(data.data.domsoil, (cropsData) => {
                document.getElementById("crops").innerHTML = cropsData.data.name;
            })
        });

    }

    mymap.on('click', onMapClick);
    currentLayerGroup = L.featureGroup();
    currentLayerGroup.addTo(mymap);
    getAllCrop((res) => {

        crops = res.data;
        console.log("crops", crops)
        var ddCrops = document.getElementById("ddCrops");
        var ddCropsFilter = document.getElementById("ddCropsFilter");
        //mảng dữ liệu cho dropdown
        for (var i = 0; i < crops.length; i++) {
            var option = document.createElement("OPTION");

            option.innerHTML = crops[i].name;

            option.value = crops[i].id_crop;

            ddCropsFilter.options.add(option);
        }
        for (var i = 0; i < crops.length; i++) {
            var option = document.createElement("OPTION");

            option.innerHTML = crops[i].name;

            option.value = crops[i].id_crop;

            ddCrops.options.add(option);
        }
        //hàm xử lý sự kiện click nút Lọc
        $("#btnFilter").click(function () {
            //lấy giá trị của dropdown
            var id_crop = $("#ddCropsFilter").find(":selected")[0].value;
            var sanLuong = $("#inputFilterSL").val();

            //xóa layer cũ
            currentLayerGroup.eachLayer(function (layer) {
                layer.remove();
            })
            filter(id_crop, sanLuong, (res) => {

                var markers = res.data;
                markers.forEach(marker => {
                    L.marker([marker.lat, marker.lng]).addTo(currentLayerGroup);
                });
            })

        })
    });

    $("#btnAddMarker").click(function () {
        console.log($("#inputName").val())
        markerToCreate.name = $("#inputName").val();
        console.log(markerToCreate)
    })
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