$(document).ready(function () {
 	// set up the search function
  var search_flickr = function () {
  // getting the value from the input #search
	  var query = $('#search').val();
	  // set the key for the Json Data
	  var key = '5f5a78b55d0916888526ec3b3eb2e3aa'
	  // set to the first page
	  var page = 1
  
	  
  var process_images = function (data) {
  
  	var images = data.photos.photo;
    for (i = 0; i < images.length; i++) {
      	var item = images[i];
        var img_url = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
        var $img = $('<img>');
        // console.log($img)
        $img.attr('src', img_url);
        $('#images').append($img);
        $img.hide();
        $img.fadeIn(2000);
    	};
  };

	var data = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + key + '&text=' + query + '&per_page=48&page=' + page + '&format=json&jsoncallback=?', process_images);

	};

	var clear_flickr = function () {
	  $('img').remove();
	  };

	  $(window).scroll(function () {
	    if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
	      page++;
	      search_flickr();
	    }
	});


  $('#search_flickr').on('click', function () {page = 1; clear_flickr(); search_flickr()});
  $('#clear_images').on('click', clear_flickr);


});



