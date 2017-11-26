$.get( _api + "group/listl", function( data ) {
  listdata = JSON.parse(data);
  console.log(listdata);
});
