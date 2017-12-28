//API untuk walidata http://192.168.100.55:8000/api/
$.get(_api + "group/listl", function(data) {
    listdata = (data);
    //console.log(listdata);
    for (i = 0; i < listdata.length; i++) {
        console.log(listdata[i]);
        $('#walidata-logo-slider').append('<div class="item"><div class="client-face"><img src="data:;base64,' + listdata[i]['logo'] + '" alt="" style="height:80px;"></div><div class="client-text"><a href="pencarian.html?walidata=' + encodeURIComponent(listdata[i]['name']) + '&kategori=&keyword=&bbox="><h4><strong>' + listdata[i]['name'] + ' </strong></h4></a><h6>' + listdata[i]['jumlah_data'] + ' dataset</h6></div></div>');

        $('#lunchBegins2').append('<option>' + listdata[i]['name'] + '</option>');
        $('#basic').append('<option>' + listdata[i]['name'] + '</option>')
        $('#ul_walidata').append('<li><div class="col-md-3 col-sm-3 col-xs-3 blg-thumb p0"><a href="pencarian.html?walidata=' + encodeURIComponent(listdata[i]['name']) + '&kategori=&keyword=&bbox="><img src="data:;base64,' + listdata[i]['logo'] + '" alt="" style="height:80px;"></a></div><div class="col-md-8 col-sm-8 col-xs-8 blg-entry"><h6><a href="pencarian.html?walidata=' + encodeURIComponent(listdata[i]['name']) + '&kategori=&keyword=&bbox=">' + listdata[i]['name'] + '</a></h6><span class="property-price">' + listdata[i]['jumlah_data'] + ' dataset</span></div></li>');
    }

    $('#jumlah_wali_data').text(String(listdata.length));
});

///API untuk Kagori
$.get(_api + "jumlahdataset", function(data) {
    listdata = (data);
    //console.log(listdata);
    for (i = 0; i < listdata.length; i++) {
        console.log(listdata[i]);
        $('#kategori_dataset').append('<div class="col-sm-2 col-xs-6"><div class="count-item"><div class="count-item-circle"><img src="data:;base64,' + listdata[i]['logo'] + '" alt="" style="height:80px;"></div><div class="chart"><h6><a href="pencarian.html?keyword=' + listdata[i]['keywords'] + '&kategori=&walidata=&bbox=">' + listdata[i]['keywords'] + '</a></h6><span class="jumlah_dataset badge badge-pill badge-danger">' + listdata[i]['jumlah'] + '</span></div></div></div>');

        $('#lunchBegins').append('<option>' + listdata[i]['keywords'] + '</option>');

        $('#ul_kategori').append('<li><div class="col-md-12 col-sm-12 col-xs-12"><ul class="footer-menu"><li><a href="pencarian.html?keyword=' + listdata[i]['keywords'] + '&kategori=&walidata=&bbox=">&raquo; ' + listdata[i]['keywords'] + ' </a><span class="jumlah_dataset_pencarian badge badge-pill badge-primary pull-right">' + listdata[i]['jumlah'] + '</span></li></ul></div></li>');
    }
});

var layer = [];


$.get(_api + "listmetalayer", function(data) {
    listdata = (data);
    for (i = 0; i < 4; i++) {
        console.log(listdata[i]);

        array = [];
        str = listdata[i]['identifier'];
        array[0] = str.split(":");
        str2 = listdata[i]['links'];
        image2 = str2.split('^')[1].split(',')[3].split('?')[0];
        image2 = image2 + '/reflect?format=image/png&layers=' + listdata[i]['identifier']
        str3 = listdata[i]['links'];
        download = str3.split('^')[0].split(',')[3];
        download = download + '?service=WFS&version=1.0.0&request=GetFeature&typeName=' + listdata[i]['identifier'] + '&outputFormat=shape-zip';
        // console.log(image2);
        bboxbox = listdata[i].bbox.split(',');
        //console.log(bboxbox)
        minx = parseFloat(bboxbox[0].split(' ')[0].split('(')[1])
        miny = parseFloat(bboxbox[0].split(' ')[1])
        maxx = parseFloat(bboxbox[1].split(' ')[0].split(')')[0])
        maxy = parseFloat(bboxbox[1].split(' ')[1].split(')')[0])
        extent = [minx, miny, maxx, maxy]
            //console.log(extent)
        $('#list-type').append('<div class="col-sm-6 col-md-3 p0"><div class="box-two proerty-item"><div class="item-thumb"><a><img src="' + image2 + '"</a></div><div class="item-entry overflow"><div id="ltitle"><a href="">' + listdata[i]['title'] + ' </a></div><div class="dot-hr"></div><span class="pull-left"><b>' + listdata[i]['keywords'] + '</b></span><span class="proerty-price pull-right"><i id="' + listdata[i]['identifier'] + '" class="material-icons preview" title="Lihat peta"><span class="cursor_pointer">location_on </span><div style="display:none"><div id="ident">' + listdata[i]['identifier'] + '</div><div id="minx">' + minx + '</div><div id="miny">' + miny + '</div><div id="maxx">' + maxx + '</div><div id="maxy">' + maxy + '</div></div></i><i class="material-icons" title="Lihat metadata" data-toggle="modal" data-target="#metaData"><span class="cursor_pointer">info </span></i><i class="material-icons" title="Download" data-toggle="modal" data-target="#downloadModal"><span class="cursor_pointer"> cloud_download</span></i></span><div class="property-icon"><b>' + array[0][0] + '</b></div></div></div>');
    }
});

$("#burgermenu").on('click', function() {
    console.log('BURGER');
    var ext = simpulextent.toString();

    $("#bbox").val("");
    $("#bbox").val(ext);
    if ($("#i_search_map").text() == '') {
        setTimeout(() => {
            i_search_map();
            searchmap.getView().fit(simpulextent, searchmap.getSize());
        }, 1000);
    }
})

var extent;

$(document).ready(function() {

        $(document).on('click', '.proerty-price.pull-right i', function() {
            console.log($(this).find('#minx').text());
            p_id = $(this).attr('id');
            minx = parseFloat($(this).find('#minx').text())
            miny = parseFloat($(this).find('#miny').text())
            maxx = parseFloat($(this).find('#maxx').text())
            maxy = parseFloat($(this).find('#maxy').text())
            window.extent = $(this).find('#minx').text() + ',' + $(this).find('#miny').text() + ',' + $(this).find('#maxx').text() + ',' + $(this).find('#maxy').text()
            try {
                prevmap.removeLayer(preview);
            } catch (error) {

            }
            add_prev_layer(p_id, minx, miny, maxx, maxy);
            $("#viewPeta").modal('show');
        });

        i_search_map();
        searchmap.getView().fit(simpulextent, searchmap.getSize());
    })
    //API untuk sistem info http://192.168.100.55:8000/api/

var simpulextent = [];
var ex = "";

$.get(_api + "sisteminfo", function(data) {
    //listdata = JSON.parse(data);
    console.log(data);
    $('#title-index').text('Home :: Geoportal ' + data['organization']);
    $('#title-jelajah').text('Jelajah :: Geoportal ' + data['organization']);
    $('#title-pencarian').text('Pencarian Data :: Geoportal ' + data['organization']);
    $('#title-kontak').text('Kontak Kami :: Geoportal ' + data['organization']);
    $('#title-login').text('Login :: Geoportal ' + data['organization']);
    $('#title-berita').text('Berita :: Geoportal ' + data['organization']);

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
    var ex = "";
    for (e = 0; e < data['extent'].length; e++) {
        console.log(data['extent'][e])
        window.simpulextent.push(parseFloat(data['extent'][e]));
    }
});

$.ajax({
    url: _api + "frontend",
    async: false,
    success: function(data) {
        items = JSON.parse(data);
        console.log(items)
        slider1 = "<div class='item'><img src='" + items[0].image_1 + "'></div>";
        $("#bg-slider").append(slider1);
        slider2 = "<div class='item'><img src='" + items[0].image_2 + "'></div>";
        $("#bg-slider").append(slider2);
        slider3 = "<div class='item'><img src='" + items[0].image_3 + "'></div>";
        $("#bg-slider").append(slider3);
        $('.Welcome-area').css("background-image", "url(" + items[0].image_4 + ")");
        $('.Welcome-area').css("background-size", "cover");
        $("#tagline").text(items[0].remark_1)
    }
})

$.ajax({
    url: _api + "linkweb/list",
    async: false,
    success: function(data) {
        items = JSON.parse(data);
        console.log(items.length)
        for (i = 0; i < items.length; i++) {
            console.log(items[i]);
            item_html = "<div><a target='_blank' href='" + items[i].url + "'><img data-u='image' src='data:image/jpeg;base64," + items[i].image + "' alt='" + items[i].nama + "'/></a></div>";
            $("#linkweb").append(item_html);
        }
        jssor_1_slider_init();
    }
})

var preview, prevmap, searchmap;

function add_prev_layer(layername, minx, miny, maxx, maxy) {
    window.preview = new ol.layer.Tile({
        visible: true,
        extent: [minx, miny, maxx, maxy],
        source: new ol.source.TileWMS({
            url: _wmsURL,
            params: {
                'LAYERS': layername,
                'TILED': true
            }
        })
    });
}

function i_prev_map() {
    var osm = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    window.prevmap = new ol.Map({
        layers: [osm],
        target: 'i_prev_map',
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [0, 0],
            zoom: 2
        })
    });
}

function i_search_map() {
    var osm = new ol.layer.Tile({
        extent: simpulextent,
        source: new ol.source.OSM()
    });

    window.searchmap = new ol.Map({
        layers: [osm],
        target: 'i_search_map',
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [0, 0],
            zoom: 2
        })
    });

    // searchmap.getView().on('propertychange', function(e) {      
    //     var glbox = map.getView().calculateExtent(map.getSize()); // doesn't look as expected.
    //     var box = ol.proj.transformExtent(glbox,'EPSG:3857','EPSG:4326');
    // });

    // box.toString();
    // $("#bbox").val('');
    // $("#bbox").val(extents);

    searchmap.on("moveend", function(evt) {
        var map = evt.map;
        var extents = map.getView().calculateExtent(map.getSize());

        extents.toString();
        $("#bbox").val('');
        $("#bbox").val(extents);
    });

    // searchmap.getView().on('propertychange', function(e) {      
    //     var glbox = searchmap.getView().calculateExtent(searchmap.getSize()); // doesn't look as expected.
    //     var box = ol.proj.transformExtent(glbox,'EPSG:3857','EPSG:4326');
    //     console.log(box);

    //     box.toString();
    //     $("#bbox").val('');
    //     $("#bbox").val(box);

    // });


}

$(".largesearch-btn").on('click', function() {

    var e = document.getElementById("lunchBegins");
    var lunchBegins = e.options[e.selectedIndex].value;

    var f = document.getElementById("lunchBegins2");
    var lunchBegins2 = e.options[f.selectedIndex].value;

    var katakunci = $(".keyword").val();
    var kategori = lunchBegins;
    var walidata = lunchBegins2;
});

$("#viewPeta").on('shown.bs.modal', function() {
    if ($("#i_prev_map").text() == '') {
        p_id = $("#viewPeta").find('i');
        i_prev_map();
        extent = preview.getExtent();
        prevmap.addLayer(preview);
        prevmap.getView().fit(extent, prevmap.getSize());
    } else {
        extent = preview.getExtent();
        prevmap.addLayer(preview);
        prevmap.getView().fit(extent, prevmap.getSize());
    }
});

$("#viewPeta").on('hide.bs.modal', function() {
    //
});

var searchextent;

$("#searchbtn").submit(function() {
    $("#bbox").val(window.bbox)
    alert(window.bbox)
})