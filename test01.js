
var page = require("webpage").create();
page.open("https://www.reddit.com", function(status) {
    var date = getDate();
    console.log("Status: " + status);
    if(status === "success") {
        console.log(page.title);
    }
    phantom.exit();
});