function loader(g) {
  var script = document.createElement("script");
  script.textContent = "(" + g.toString() + ")()";
  document.body.appendChild(script).parentNode.removeChild(script);
};

loader(function() {
var rep = $('.links-container .reputation').text().replace(/,/g,'');

if (rep > 2000){
  $.get('/review', function(result) {
    var rcount = $(result).find('.review-dashboard-mainbar .dashboard-item:has(.dashboard-title a[href="/review/suggested-edits"]) .dashboard-num').text();
    if (rcount.length !== 0) {
      $('.topbar-menu-links [href="/review"]').after('<a id="review-items"><span></span></a>');
      $('#review-items').attr('href',review_url).children('span').html(rcount);
    }
  });
}

if (rep > 10000){
  $.get('/tools', function(result) {
    var tcount = $(result).find('.bounty-indicator-tab').text();
    $('.topbar-menu-links').prepend('<a id="review-tools-link"><span></span></a>');
    $('#review-tools-link').attr('href',tools_url).children('span').html(tcount);
  });
}

});
