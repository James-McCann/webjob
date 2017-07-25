// 1. https://www.rewardsaffiliates.com/default.aspx
// ctl00_HeaderCtrl_txtLoginUsername
// ctl00_HeaderCtrl_txtLoginPassword
// ctl00_HeaderCtrl_ButtonSubmit
//NAV - H12 - H1202


var page = require('webpage').create();

page.open("https://www.rewardsaffiliates.com/default.aspx", function(status) {

  if (status === "success") {
    page.evaluate(function() {
        document.getElementById("ctl00_HeaderCtrl_txtLoginUsername").value = "-";
        document.getElementById("ctl00_HeaderCtrl_txtLoginPassword").value = "-";
        document.getElementById("ctl00_HeaderCtrl_ButtonSubmit").click();
    });
    window.setTimeout(function() {
        document.getElementById("h12").onhover();
        document.getElementById("h1201").click();

       page.render("page.png");
       phantom.exit();
    }, 5000);
  }
});