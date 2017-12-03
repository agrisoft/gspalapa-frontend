//API untuk walidata http://192.168.100.55:8000/api/
$.get( _api + "group/listl", function( data ) {
  listdata = JSON.parse(data);
  //console.log(listdata);
  for (i=0; i < listdata.length; i++){
    console.log(listdata[i]);
    $('#walidata-logo-slider').append('<div class="item"><div class="client-face"><img src="data:;base64,'+listdata[i]['logo']+'" alt="" style="height:80px;"></div><div class="client-text"><a href="#"><h4><strong>'+listdata[i]['name']+' </strong></h4></a><h6>10 dataset</h6></div></div>');
    }
    $('#jml_walidata').text(String(listdata.length));
});

//API untuk sistem info http://192.168.100.55:8000/api/
$.get( _api + "sisteminfo", function( data ) {
  //listdata = JSON.parse(data);
  console.log(data);
  $('#title-index').text('Home :: Geoportal ' + data['organization']);
  $('#title-jelajah').text('Jelajah :: Geoportal ' + data['organization']);
  $('#title-pencarian').text('Pencarian Data :: Geoportal ' + data['organization']);
  $('#title-kontak').text('Kontak Kami :: Geoportal ' + data['organization']);

  $('#organisasi').text(data['organization']);
  $('#organisasi-body').text(data['organization']);
  $('#country').text(data['country'])
  $('#alamat-body').text(data['address'] + ', ' + data['city']+ ', ' + data['postalcode']+ ', ' + data['administrativearea']);
  $('#alamat-footer').text(data['address'] + ', ' + data['city']+ ', ' + data['postalcode']+ ', ' + data['administrativearea'] + ', ' + data['country']);
  $('#email-body').text(data['email']);
  $('#email-footer').text('Email: ' + data['email']);
  $('#phone-body').text('Telp: ' + data['phone']);
  $('#phone').text('Telp: ' + data['phone']);
  $('#fax').text('Fax: ' + data['fax']);
  $('#fax-body').text('Fax: ' + data['fax']);
  $('#footer-tentang-kami').text(data['deskripsi']);
  
  $('#organisasi-logo').empty();
  $('#organisasi-logo').text('EOPORTAL ' + data['organization']);
  $('#logos').attr('src', 'data:;base64,' + data['logo']);

  $('#judul-slider-depan').text('Geoportal ' + data['organization']);
});