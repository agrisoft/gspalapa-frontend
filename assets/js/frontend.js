//
$.get( _api + "group/listl", function( data ) {
  listdata = JSON.parse(data);
  //console.log(listdata);
  for (i=0;i < listdata.length; i++){
    console.log(listdata[i]);
    $('#walidata-logo-slider').append('<div class="item"><div class="client-face"><img src="data:;base64,'+listdata[i]['logo']+'" alt="" style="height:80px;"></div><div class="client-text"><a href="#"><h4><strong>'+listdata[i]['name']+' </strong></h4></a><h6>10 dataset</h6></div></div>');
    }
});

//
$.get( _api + "sisteminfo", function( data ) {
  //listdata = JSON.parse(data);
  console.log(data);
  $('#organisasi').text(data['organization']);
  $('#alamat-footer').text(data['address'] + ', ' + data['city']+ ', ' + data['postalcode']+ ', ' + data['country']);
  $('#email-footer').text('Email: ' + data['email']);
  $('#phone').text('Telp: ' + data['phone']);
  $('#fax').text('Fax: ' + data['fax']);
  $('#footer-tentang-kami').text(data['deskripsi']);
});