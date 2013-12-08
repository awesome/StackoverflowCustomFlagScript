Stackoverflow Custom Flag Script
=============================

Due to the recent implementation of the 'topbar' on all StackExchange sites, the review numbers have been removed for 10k users. After seeing [this request](http://meta.stackoverflow.com/questions/209998/bring-back-review-numbers-to-the-top-bar) to have the feature back, I decided to create a custom script.

Here is an example of what the custom script does:

![alt tag](http://i.stack.imgur.com/iGwgU.png)

**Base CSS** - based on the image above

    #review-tools-link span {
        color: #fff!important;
        background-color: #0077dd;
        font-size: 90%;
        font-weight: bold;
        margin-right: 5px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        margin: 0;
        padding: 3px;
    }
    
    #review-items span {
        color: #fff!important;
        background-color: red;
        font-size: 90%;
        font-weight: bold;
        margin-right: 5px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        margin: 0;
        padding: 3px;
    }

**Other options..**

![alt tag](http://i.stack.imgur.com/CBJB7.png)

    #review-tools-link span {
        background: #2f2f2f!important;
        font-size: 16px!important;
    }

![alt tag](http://i.stack.imgur.com/AWTHZ.png)

    #review-tools-link span {
        background: orange!important;
        color: black!important;
        padding: 0 6px!important;
    }
    #review-items span {
        padding: 0 6px!important;
    }
    
![alt tag](http://i.stack.imgur.com/MZzE3.png)

    #review-tools-link span {
        background: orange!important;
        color: white!important;
        padding: 0 6px!important;
    }
    #review-items span {
        padding: 0 6px!important;
    }
    
The JavaScript:

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
        var rcount = $(result).find('.review-dashboard-mainbar div:nth-child(2) .dashboard-num').text();
    rcount = 12;
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
        $('#review-tools-link').attr('href',tools_url).children('span').html(tcount);
      });
    }
    
    });
