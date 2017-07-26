// 1. https://www.rewardsaffiliates.com/default.aspx
// ctl00_HeaderCtrl_txtLoginUsername
// ctl00_HeaderCtrl_txtLoginPassword
// ctl00_HeaderCtrl_ButtonSubmit
//NAV - H12 - H1202




var page = require('webpage').create();


page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = false;//Script is much faster with this field set to false
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;



page.open("https://www.rewardsaffiliates.com/default.aspx", function(status) {

  if (status === "success") {
    //------- Step 1 -------//
    page.evaluate(function() {
        document.getElementById("ctl00_HeaderCtrl_txtLoginUsername").value = "-";
        document.getElementById("ctl00_HeaderCtrl_txtLoginPassword").value = "-";
        document.getElementById("ctl00_HeaderCtrl_ButtonSubmit").click();
        //document.getElementById('[title="Monthly Report"]').click();

    });
  
    
    window.setTimeout(function() {
       page.render("page.png");
    }, 5000)
  }

});
// page.open("https://www.rewardsaffiliates.com/members/affiliate/my_account.aspx", function() {

// 	page.includeJs(
// 	  // Include the https version, you can change this to http if you like.
// 	  'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js',
// 	  function() {
// 		    (page.evaluate(function() {
// 		      // jQuery is loaded, now manipulate the DOM
// 		       var $loginForm = $('select[title="Monthly Report"');
// 		              console.log("inside incl js");

// 		       $loginform.click();
// 		    })
// 		    );
// 	    }
// 	);
// });

