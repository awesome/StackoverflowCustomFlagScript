function loader(g) {
    var script = document.createElement("script");
    script.textContent = "(" + g.toString() + ")()";
    document.body.appendChild(script).parentNode.removeChild(script);
};

loader(function () {
var tools_url = 'http://' + window.location.host + '/tools';
var review_url = 'http://' + window.location.host + '/review';
var rep = $('.links-container .reputation').text(); rep = rep.replace(/,/g,'');

if (rep>2000){
  $.get(review_url, function(result) {
    var rcount = $(result).find('.review-dashboard-mainbar div:nth-child(3) .dashboard-num').text();
    if (rcount.length !== 0) {
      $('.topbar-menu-links [href="/review"]').after('<a id="review-items"><span></span></a>');
      $('#review-items').attr('href',review_url).children('span').html(rcount);
    }
  });
}

if (rep>10000){
  $.get(tools_url, function(result) {
    var tcount = $(result).find('.bounty-indicator-tab').text();
    $('.topbar-menu-links').prepend('<a id="review-tools-link"><span></span></a>');
    $('#review-tools-link').attr('href',tools_url).children('span').html(tcount-1);
  });
  if(window.location.href.indexOf(tools_url) > -1) {
    $('.tools-rev h1').append('<a id="toggleFlag">Toggle Sort function</a>');
    $('#toggleFlag').click(function(){
      $('tr[id*="flagged"]:not(:has(.item-multiplier-count))').toggleClass('removed_reviews');
    });
  }
}

});
