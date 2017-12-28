//API untuk walidata http://192.168.100.55:8000/api/

$.ajax({
    url: _api + "sisteminfo",
    async: false
}).success(function(data) {
    window.extent1 = data['extent'];
    console.log(extent1);
});



$('document').ready(function() {

    setTimeout(function() {
        $('#demo').jplist({
            itemsBox: '.list',
            itemPath: '.list-item',
            panelPath: '.jplist-panel'
        });
    }, 2000);

});
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
if (getUrlParameter('keyword')) {
    $(".keyword").val('');
    $(".keyword").val(getUrlParameter('keyword'));
}

jQuery.ajax({
    url: _api + 'group/listl',
    success: function(result) {
        var listdata = (result);

        var selectw = false;

        for (var i = 0; i < listdata.length; i++) {
            //  console.log(listdata[i]);

            if (listdata[i]['name'] == getUrlParameter('walidata')) {
                selectw = true;
            } else {
                selectw = false;
            }
            $('#walidata-logo-slider').append('<div class="item"><div class="client-face"><img src="data:;base64,' + listdata[i]['logo'] + '" alt="" style="height:80px;"></div><div class="client-text"><a href="#"><h4><strong>' + listdata[i]['name'] + ' </strong></h4></a><h6>' + listdata[i]['jumlah_data'] + ' dataset</h6></div></div>');
            $('#basic').append('<option selected=' + selectw + ' value="' + listdata[i]['name'] + '" data-path=".' + listdata[i]['name'] + '">' + listdata[i]['name'] + '</option>');
            $('#ul_walidata').append('<li><div class="col-md-3 col-sm-3 col-xs-3 blg-thumb p0"><a href="pencarian.html?walidata=' + encodeURIComponent(listdata[i]['name']) + '&kategori=&keyword=&bbox="><img src="data:;base64,' + listdata[i]['logo'] + '" alt="" style="height:80px;"></a></div><div class="col-md-8 col-sm-8 col-xs-8 blg-entry"><h6><a href="pencarian.html?walidata=' + encodeURIComponent(listdata[i]['name']) + '&kategori=&keyword=&bbox=">' + listdata[i]['name'] + '</a></h6><span class="property-price">' + listdata[i]['jumlah_data'] + ' dataset</span></div></li>');
        }
        $('#jumlah_wali_data').text(String(listdata.length));

    },
    async: false
});


// $.get( _api + "group/listl", function( data ) {
//   listdata = (data);
//   //console.log(listdata);
//     var selectw=false;
//   for (i=0; i < listdata.length; i++){
//     //console.log(listdata[i]);

//     if(listdata[i]['name']==getUrlParameter('lunchBegins2')){
//       selectw = true;
//     }else{
//       selectw = false;
//     }

//     $('#walidata-logo-slider').append('<div class="item"><div class="client-face"><img src="data:;base64,'+listdata[i]['logo']+'" alt="" style="height:80px;"></div><div class="client-text"><a href="#"><h4><strong>'+listdata[i]['name']+' </strong></h4></a><h6>'+listdata[i]['jumlah_data']+' dataset</h6></div></div>');


//         $('#lunchBegins2').append('<option>'+listdata[i]['name']+'</option>')

//         $('#basic').append('<option selected='+selectw+' value="'+listdata[i]['name']+'" data-path=".'+listdata[i]['name']+'">'+listdata[i]['name']+'</option>');  



//        $('#ul_walidata').append('<li><div class="col-md-3 col-sm-3 col-xs-3 blg-thumb p0"><a href="single.html"><img src="data:;base64,'+listdata[i]['logo']+'" alt="" style="height:80px;"></a></div><div class="col-md-8 col-sm-8 col-xs-8 blg-entry"><h6><a href="single.html">'+listdata[i]['name']+'</a></h6><span class="property-price">'+listdata[i]['jumlah_data']+' dataset</span></div></li>'); 
//     }

//        $('#jumlah_wali_data').text(String(listdata.length));
// });

//API untuk Kagori

jQuery.ajax({
    url: _api + 'jumlahdataset',
    success: function(result) {
        var listdata = (result);

        var select = false;
        var p_kategori = getUrlParameter('kategori');
        console.log(p_kategori);
        for (var i = 0; i < listdata.length; i++) {
            //  console.log(listdata[i]);
            console.log(listdata[i]['keywords']);

            if (listdata[i]['keywords'] == getUrlParameter('kategori')) {
                select = true;
            } else {
                select = false;
            }
            $('#lunchBegins').append('<option selected=' + select + ' value="' + listdata[i]['keywords'] + '" data-path=".' + listdata[i]['keywords'] + '">' + listdata[i]['keywords'] + '</option>');

            $('#kategori_dataset').append('<div class="col-sm-2 col-xs-6"><div class="count-item"><div class="count-item-circle"><img src="data:;base64,' + listdata[i]['logo'] + '" alt="" style="height:80px;"></div><div class="chart"><h6><a href="pencarian.html?kategori=' + listdata[i]['keywords'] + '&keyword=&walidata=&bbox=">' + listdata[i]['keywords'] + '</a></h6><span class="jumlah_dataset badge badge-pill badge-danger">' + listdata[i]['jumlah'] + '</span></div></div></div>');

            $('#ul_kategori').append('<li><div class="col-md-12 col-sm-12 col-xs-12"><ul class="footer-menu"><li><a href="pencarian.html?kategori=' + listdata[i]['keywords'] + '&keyword=&walidata=&bbox=">&raquo; ' + listdata[i]['keywords'] + ' </a><span class="jumlah_dataset_pencarian badge badge-pill badge-primary pull-right">' + listdata[i]['jumlah'] + '</span></li></ul></div></li>');

        }
    },
    async: false
});




//API untuk sistem info http://192.168.100.55:8000/api/
$.get(_api + "sisteminfo", function(data) {
    //listdata = JSON.parse(data);
    console.log(data);
    $('#title-index').text('Home :: Geoportal ' + data['organization']);
    $('#title-jelajah').text('Jelajah :: Geoportal ' + data['organization']);
    $('#title-pencarian').text('Pencarian Data :: Geoportal ' + data['organization']);
    $('#title-kontak').text('Kontak Kami :: Geoportal ' + data['organization']);

    $('#organisasi').text(data['organization']);
    $('#organisasi-body').text(data['organization']);
    $('#country').text(data['country'])
    $('#alamat-body').text(data['address'] + ', ' + data['city'] + ', ' + data['postalcode'] + ', ' + data['administrativearea']);
    $('#alamat-footer').text(data['address'] + ', ' + data['city'] + ', ' + data['postalcode'] + ', ' + data['administrativearea'] + ', ' + data['country']);
    $('#email-body').text(data['email']);
    $('#email-footer').text('Email: ' + data['email']);
    $('#phone-body').text('Telp: ' + data['phone']);
    $('#phone').text('Telp: ' + data['phone']);
    $('#fax').text('Fax: ' + data['fax']);
    $('#fax-body').text('Fax: ' + data['fax']);
    $('#footer-tentang-kami').text(data['deskripsi']);

    $('#organisasi-logo').empty();
    $('#organisasi-logo').text('EOPORTAL ' + data['organization']);
    $('#logos').attr('src', data['logo']);

    $('#judul-slider-depan').text('Geoportal ' + data['organization']);
});


jQuery.ajax({
    type: 'GET',
    url: _api + 'listmetalayer',
    data: {
        'keyword': getUrlParameter('keyword'),
        'kategori': getUrlParameter('kategori'),
        'walidata': getUrlParameter('walidata'),
        'bbox': getUrlParameter('bbox')
    },
    success: function(data) {
        listdata = (data);
        //console.log(listdata);
        // var str = "AGRISOFT:jalan_semarang_320020171126130704";

        var str = "";
        var str2 = "";
        var str3 = "";
        var image2 = "";
        var array = [];;
        //array[1] = str.split(":");
        for (i = 0; i < listdata.length; i++) {
            //console.log(listdata[i]);

            str = "";
            array = [];
            image2 = "";
            str = listdata[i]['identifier'];
            array[0] = str.split(":");
            str2 = "";
            str3 = "";

            str2 = listdata[i]['links'];
            image2 = str2.split('^')[1].split(',')[3].split('?')[0];
            image2 = image2 + '/reflect?format=image/png&layers=' + listdata[i]['identifier']


            download = "";
            str3 = listdata[i]['links'];
            download = str3.split('^')[0].split(',')[3];
            download = download + 'service=WFS&version=1.0.0&request=GetFeature&typeName=' + listdata[i]['identifier'] + '&outputFormat=shape-zip';

            // console.log(image2);
            //    console.log(download);

            $('#list-type').append(' <div class="list-item"> <div class="col-sm-6 col-md-4 p0"><div class="box-two proerty-item"><div class="item-thumb"><a href="#"><img src="' + image2 + '"</a></div><div class="item-entry overflow"><h5><a href="" class="title">' + listdata[i]['title'] + ' </a></h5><div class="dot-hr"></div><span class="pull-left"><b class="' + listdata[i]['keywords'] + '">' + listdata[i]['keywords'] + '</b></span><span class="pull-right"><i class="fa fa-map-marker cursor_pointer" style="font-size:20px" title="Lihat peta" data-toggle="modal" data-target="#viewPeta">&nbsp;</i><i class="fa fa-info-circle cursor_pointer" style="font-size:20px" title="Lihat metadata" data-toggle="modal" data-target="#metaData">&nbsp;</i><i class="fa fa-cloud-download cursor_pointer" style="font-size:20px" title="Download" data-toggle="modal" data-target="#downloadModal">&nbsp;</i></span><p style="display: none;">' + listdata[i]['abstract'] + '</p><div class="property-icon"><b class="' + array[0][0] + '">' + array[0][0] + '</b></div></div></div></div> ');
        }
    },
    async: false
});

// $.get( _api + "listmetalayer", function( data ) {
//   listdata = (data);
//   //console.log(listdata);
//   // var str = "AGRISOFT:jalan_semarang_320020171126130704";

//   var str ="";
//   var str2 = "";
//   var str3 ="";
//   var image2 ="";
//   var array = [];;
//     //array[1] = str.split(":");
//   for (i=0; i < listdata.length; i++){
//     //console.log(listdata[i]);

//      str = "";
//      array =[];
//      image2 = "";
//      str =listdata[i]['identifier'];
//      array[0] = str.split(":");
//      str2 ="";
//      str3 = "";

//      str2 =listdata[i]['links']; 
//      image2 =str2.split('^')[1].split(',')[3].split('?')[0];
//      image2 = image2+'/reflect?format=image/png&layers='+listdata[i]['identifier']


//      download="";
//      str3 =listdata[i]['links'];
//      download=str3.split('^')[0].split(',')[3];
//      download = download + 'service=WFS&version=1.0.0&request=GetFeature&typeName='+listdata[i]['identifier']+'&outputFormat=shape-zip';

//     // console.log(image2);
//   //    console.log(download);

//      $('#list-type').append(' <div class="list-item"> <div class="col-sm-6 col-md-4 p0 wow fadeInUp animated" data-wow-delay="0.2s"><div class="box-two proerty-item"><div class="item-thumb"><a href="#"><img src="'+image2+'"</a></div><div class="item-entry overflow"><h5><a href="property-1.html" class="title">'+listdata[i]['title']+' </a></h5><div class="dot-hr"></div><span class="pull-left"><b class="'+listdata[i]['keywords']+'">'+listdata[i]['keywords']+'</b></span><span class="proerty-price pull-right"><img src="assets/img/maps_look.png" width="20px" height="20px" title="Lihat peta" data-toggle="modal" data-target="#viewPeta" class="cursor_pointer"><img src="assets/img/metadata.png" width="20px" height="20px" title="Lihat metadata" data-toggle="modal" data-target="#metaData" class="cursor_pointer"><img src="assets/img/download.png" width="20px" height="20px" title="Download" data-toggle="modal" data-target="#downloadModal" class="cursor_pointer"></span><p style="display: none;">'+listdata[i]['abstract']+'</p><div class="property-icon"><b class="'+array[0][0]+'">'+array[0][0]+'</b></div></div></div></div> ');


//     }

//     // $('#jumlah_dataset').text(String(listdata.length));
// });



$(".sort-asc").on('click', function() {
    $(".sort-desc").removeClass('active');
    $(".sort-asc").addClass('active');
});

$(".sort-desc").on('click', function() {
    $(".sort-asc").removeClass('active');
    $(".sort-desc").addClass('active');
});

if ($("#lunchBegins option[value='" + getUrlParameter('kategori') + "']").length > 0) {
    // $("#lunchBegins").val('');
    console.log('fdas' + 'exists');
    $("#lunchBegins").val(getUrlParameter('kategori'));
} else {
    $("#lunchBegins").val("");
}

if ($("#basic option[value='" + getUrlParameter('walidata') + "']").length > 0) {
    // $("#lunchBegins").val('');
    console.log('exist');
    $("#basic").val(getUrlParameter('walidata'));
} else {
    $("#basic").val("");
}

$("#bbox").val("");
$("#bbox").val(getUrlParameter('bbox'));
console.log(getUrlParameter('bbox'));

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
        })
    }),
    view: new ol.View({
        //center: ol.proj.fromLonLat([118,5]),
        center: ol.proj.transform([118, 5], 'EPSG:4326', 'EPSG:3857'),
        zoom: 3
    })
});
var bxp = getUrlParameter('bbox');
var bx = "";


if (bxp === undefined) {
    console.log('un');
    extent2 = extent1;
} else {
    console.log('no un');
    bx = getUrlParameter('bbox');
    bx = bx.split(",");
    extent2 = bx;
}


$(document).ready(function() {

    console.log('halo2', extent2);

    // Compute the current extent of the view given the map size


    var minlon = parseInt(extent2[0]);
    var minlat = parseInt(extent2[1]);
    var maxlon = parseInt(extent2[2]);
    var maxlat = parseInt(extent2[3]);

    // Trasnform extent to EPSG:3857
    var extent = [minlon, minlat, maxlon, maxlat];
    extent = ol.extent.applyTransform(extent, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));

    map.getView().fit(extent, map.getSize());
});

map.getView().on('propertychange', function(e) {
    var glbox = map.getView().calculateExtent(map.getSize()); // doesn't look as expected.
    var box = ol.proj.transformExtent(glbox, 'EPSG:3857', 'EPSG:4326');
    console.log(box);

    // box.toString();
    // $("#bbox").val('');
    $("#bbox").val(box);

});
// console.log(box);


function search() {
    alert($("#kata_kunci").val());
    alert($("#lunchBegins").val());
    alert($("#basic").val());

    console.log('search');
    event.preventDefault();
}