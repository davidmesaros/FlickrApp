$(document).ready(function () {
  // set to the first page
  var page = 0
  
  // search progress is set null/empty to begin the paginated effect
  var search_in_progress = false;
  
  // set up the search function
  var search_flickr = function () {
  	
  	//returns true and stops the per_page 
    if (search_in_progress) {
      return;
    }
		
		search_in_progress = true;
		
		// store the search enquiry 
    var query = $('#search').val();
		var key = '5f5a78b55d0916888526ec3b3eb2e3aa'
    
    
    //process the flickr photos and add to the page
    var process_images = function (data) {
      
      //retrieve the flicker photos
      var images = data.photos.photo;
      // iterate of Flickr Photos
      for (i = 0; i < images.length; i++) {
        var item = images[i];

        // flickrs url to store the object as jpg
        var img_url = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
        // set a img tag
        var $img = $('<img>');
        // add the 'src' and img_url to 'img' tag
        $img.attr('src', img_url);
        // inset the img tag to the div
        $('#images').append($img);
        $img.hide();
        $img.fadeIn(2000);

      };
      //re-set to false, allows to search for more pages
      search_in_progress = false;
      
    };
   // jQuery connverting JSONurl to JSONstring also calling the process image function 
   $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + key + '&text=' + query + '&per_page=16&page=' + page + '&format=json&jsoncallback=?', process_images);
  	

  };
  // set the clear image 
  var clear_flickr = function () {
    $('img').remove();
  };
  ///set up a scroll function 
  $(window).scroll(function () {
    if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
    

      // add a new page when you get to the bottom of the window 
      page++
      // and call the search function 
      search_flickr();
      console.log(page)
    }
  });

 
  $('#search_flickr').on('click', function () { clear_flickr(); search_flickr()});
  $('#clear_images').on('click', clear_flickr);


});



