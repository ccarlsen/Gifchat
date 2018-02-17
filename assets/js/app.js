var apiKey = 'NNDVE1MIGV62';

function replace(string) {
  var pattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  var pattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
	return String(string)
  .replace(/ /g, '\u00A0')
	.replace(/&/g, '&amp;')
	.replace(/"/g, '&quot;')
	.replace(/'/g, '&#39;')
	.replace(/</g, '&lt;')
	.replace(/>/g, '&gt;')
  .replace(pattern1, '<a href="$1">$1</a>')
  .replace(pattern2, '$1<a href="http://$2">$2</a>');
}

function chatInputFocus() {
  $('.chat-form-input').focus();
}

function chatScroll() {
  $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
}

function message(content, append) {
  var message;
  if (append) {
    message = '<div class="message-append"><div><time>12:00 PM</time></div><div>'+content+'</div></div>';
    $('.chat-messages .message:last-child').append(message);
  } else {
    message = '<div class="message"><div class="message-first"><div><img src=""></div><div><h5><strong>Name</strong><time>12:00 PM</time></h5>'+content+'</div></div></div>';
    $('.chat-messages').append(message);
  }
  chatScroll();
}

function gifsControl(section) {

  $('.gifs').removeClass(function(index, className) {
    return (className.match (/\bshow-gifs-\S+/g) || []).join(' ');
  });

  $('.gifs').addClass('show-gifs-loading');

  if(section) {
    $('.gifs-'+section).waitForImages().done(function() {

      $('.gifs').removeClass('show-gifs-loading');

      $('.gifs').addClass('show-gifs-'+section);

      if(section == 'trending' || section == 'favourites') {
        $('.gifs-form-input').val('');
      }

    });
  }

  chatInputFocus();

}

// Title
$('.title-icons-minimize').on('click', function(event) {
  event.preventDefault();
  alert('minimize');
});
$('.title-icons-maximize').on('click', function(event) {
  event.preventDefault();
  alert('maximize');
});
$('.title-icons-quit').on('click', function(event) {
  event.preventDefault();
  alert('quit');
});

// Gifs trending
$(function() {

  gifsControl();

  $.getJSON('https://api.tenor.com/v1/categories?key='+apiKey, function(data) {

    $.each(data.tags, function(index, value) {
      if (index == 32) {
        return false;
      }
      $.getJSON(value.path, function(data) {
        $('.gifs-trending').append('<figure><img src="'+data.results[0].media[0].gif.preview+'"><figcaption>'+value.searchterm+'</figcaption></figure>');
      });
    });

    gifsControl('trending');

  });

  $('.gifs-trending').on('click', 'figure', function() {
    $('.gifs-form-input').val($(this).find('figcaption').text());
    $('.gifs-form').submit();
  });

  $('.gifs-form-button-trending').on('click', function() {
    gifsControl('trending');
  });

});

// Gifs favourites/results
$(function() {
  var favourites = '<figure data-webm="https://media.tenor.com/videos/15be33d75b51b8f477f6cabea82cbfc6/webm" data-width="498" data-height="280"><img src="https://media.tenor.com/images/b2034b756388e63aeecc89dc1705d043/tenor.gif"></figure><figure data-webm="https://media.tenor.com/videos/ad31b993f5b5fa232312298a24169ae2/webm" data-width="498" data-height="374"><img src="https://media.tenor.com/images/75491050af5236464061d077827e4bb9/tenor.gif"></figure>';
  $('.gifs-favourites').html(favourites);

  $('.gifs-form-button-favourites').on('click', function() {
    gifsControl('favourites');
  });

  $('.gifs-results, .gifs-favourites').on('click', 'figure', function() {
    var webm = $(this).attr('data-webm');
    var width = $(this).attr('data-width');
    var height = $(this).attr('data-height');
    var content = '<video src="'+webm+'" width="'+width+'" height="'+height+'" autoplay loop muted></video>';
    message(content, true);
    gifsControl('trending');
  });

});

// Gifs form
$('.gifs-form').on('submit', function(event) {
  event.preventDefault();

  var searchTag = $('.gifs-form-input').val();

  if($('.gifs-form-input').val() != '') {
    $.getJSON('https://api.tenor.com/v1/search?q='+searchTag+'&limit=50&key='+apiKey, function(data) {
      if(data.results.length) {
        gifsControl();
        $('.gifs-results').html('');
        $.each(data.results, function(index, value) {
          if(value.media[0].webm.url) {
            $('.gifs-results').append('<figure data-webm="'+value.media[0].webm.url+'" data-width="'+value.media[0].webm.dims[0]+'" data-height="'+value.media[0].webm.dims[1]+'"><img src="'+value.media[0].tinygif.url+'"></figure>');
          }
        });
        gifsControl('results');
      }
    });
  }

  $('.gifs-form-back').on('click', function() {
    gifsControl('trending');
  });

});

// Chat messages
$(function() {

  var messages = '<div class="message"><div class="message-first"><div><img src="https://cdn.pastemagazine.com/www/articles/Trump%20betrays%20Moore%20lead-m.jpg"></div><div><h5><strong>Martin</strong><time>8:57 PM</time></h5>the first message</div></div><div class="message-append"><div><time>8:57 PM</time></div><div>an appended message</div></div><div class="message-append"><div><time>8:57 PM</time></div><div><video src="https://media.tenor.com/videos/f3e092cf078c445146beb22859d80cd8/webm" width="300" height="224" autoplay loop muted></video></div></div></div><div class="message"><div class="message-first"><div><img src="https://cdn.pastemagazine.com/www/articles/Trump%20Pearl%20Harbor%20lead-m.jpg"></div><div><h5><strong>Christopher</strong><time>8:57 PM</time></h5>another first message</div></div><div class="message-append"><div><time>8:57 PM</time></div><div>a message with a link <a href="http://google.com">http://google.com</a></div></div></div><div class="message"><div class="message-first"><div><img src="https://cdn.pastemagazine.com/www/articles/Trump%20betrays%20Moore%20lead-m.jpg"></div><div><h5><strong>Martin</strong><time>8:57 PM</time></h5><video src="https://media.tenor.com/videos/2da72b6b1fca59b08425889b4b868329/webm" width="362" height="268" autoplay loop muted></video></div></div></div>';
  $('.chat-messages').html(messages);

  // Scroll to bottom When all videos are loaded
  $('.chat-messages .message video').each(function(index) {
    $(this).one('canplaythrough', function() {
      chatScroll();
    });
  });

  // If link is clicked
  $('.chat-messages .message').on('click', 'a', function(event) {
    event.preventDefault();
    alert('link clicked ('+$(this).attr('href')+')');
  });

  // If gif is right-clicked
  $('.chat-messages .message').on('contextmenu', 'video', function(event) {
    event.preventDefault();
    alert('gif right-clicked');
  });

});

// Chat users
$(function() {
  var users = '<div><div data-status="online"><img src="https://cdn.pastemagazine.com/www/articles/Trump%20betrays%20Moore%20lead-m.jpg"></div><div><strong>Martin</strong><small>Online - 2 mins</small></div></div><div><div data-status="offline"><img src="https://cdn.pastemagazine.com/www/articles/Trump%20Pearl%20Harbor%20lead-m.jpg"></div><div><strong>Christopher</strong><small>Offline - 1 hour</small></div></div>';
  $('.chat-users').html(users);
});

// Chat form
$(function() {

  // Focus on chat input
  chatInputFocus();

  // When chat form is submitted
  $('.chat-form').on('submit', function(event) {
    event.preventDefault();

    // Run replace() on content
    var content = replace($('.chat-form-input').val());

    // If content is empty or only spaces
    if (content == '' || $.trim(content).length == 0) {
      return false;
    }

    // Clear input and run message()
    else {
      $('.chat-form-input').val('');
      message(content, true);
    }

  });

  $('.chat-form-input').on('input', function() {
    $('.chat-form-typing').show();
  });

});
