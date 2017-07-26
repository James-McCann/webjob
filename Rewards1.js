
var testindex = 0;
var loadInProgress = false;//This is set to true when a page is still loading
 
/*********SETTINGS*********************/
var webPage = require('webpage');
var page = webPage.create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = false;//Script is much faster with this field set to false
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;
/*********SETTINGS END*****************/
 
console.log('All settings loaded, start with execution');
page.onConsoleMessage = function(msg) {
    console.log(msg);
};
/**********DEFINE STEPS THAT FANTOM SHOULD DO***********************/
steps = [
 
  //Step 1 - Open Rewards home page
    function(){
        console.log('Step 1 - Open rewardsaffiliates home page');
        page.open("https://www.rewardsaffiliates.com/default.aspx", function(status){
      
    });
    },
  //Step 2 - Click on the Sign in button
  function(){
        console.log('Step 2 - Populate and submit the login formx');
    page.evaluate(function(){
        document.getElementById("ctl00_HeaderCtrl_txtLoginUsername").value = "thimbamedia";
        document.getElementById("ctl00_HeaderCtrl_txtLoginPassword").value = "Luck0theiri$h";
        document.getElementById("ctl00_HeaderCtrl_ButtonSubmit").click();
     
    });
    },
  //Step 3 - Populate and submit the login form
    function(){
        console.log('Step 3 - Populate and submit the login form');
    page.evaluate(function(){
      document.querySelector('[title="Monthly Report"]').click();

    });
    },
  //Step 4 - Wait Rewards to login user. After user is successfully logged in, user is redirected to home page. Content of the home page is saved to RewardsScrapped.html. You can find this file where phantomjs.exe file is. You can open this file using Chrome to ensure that you are logged in.
    function(){
    console.log("Step 4 - Wait Rewards to login user. After user is successfully logged in, user is redirected to home page. Content of the home page is saved to RewardsScrapped.html. You can find this file where phantomjs.exe file is. You can open this file using Chrome to ensure that you are logged in.");
         var fs = require('fs');
     var result = page.evaluate(function() {
      return document.querySelectorAll("html")[0].outerHTML;
    });
        fs.write('RewardsScrapped.html',result,'w');
    },

     //Step 5 - Select Date -1, to get previous month.
     function(){
        console.log('Step 5 - Select previous Month');
         page.evaluate(function(){

         var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
        
         var d = new Date();
         var month = d.getMonth();
         var year = d.getFullYear();

         console.log("The current Month & Year is: " + monthNames[month] +" "+year);

         document.getElementById("ctl00_ctl00_ContentPlaceHolderBody_ContentPlaceHolderBodyLI_ddlDate").selectedindex = 2;

         // var val = 201601;
         // var sel = document.getElementById('term_input_id');
         //  var opts = sel.options;
         //  for(var opt, j = 0; opt = opts[j]; j++) {
         //      if(opt.value == val) {
         //          sel.selectedIndex = j;
         //          // or:
         //          // opt.selected = true
         //          break;
         //      }
         //  }

         // for (var i = 0; i < month.length; i++) {
         //       console.log(monthName[i]);
         //  }

         //var currentDate = d.getMonth()+1 + "/" + d.getFullYear();
         //console.log(currentDate);
         // d.toDateString();
         // //d.toString('MMMM, yyyy');
         //var d = new Date("");

         // var date = document.querySelector('option[selected="selected"]');
         // console.dir(date);

         });

      },
    
];
/**********END STEPS THAT FANTOM SHOULD DO***********************/
 
//Execute steps one by one
interval = setInterval(executeRequestsStepByStep,50);
 
function executeRequestsStepByStep(){
    if (loadInProgress == false && typeof steps[testindex] == "function") {
        //console.log("step " + (testindex + 1));
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        console.log("test complete!");
        phantom.exit();
    }
}
 
/**
 * These listeners are very important in order to phantom work properly. Using these listeners, we control loadInProgress marker which controls, weather a page is fully loaded.
 * Without this, we will get content of the page, even a page is not fully loaded.
 */
page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('Loading started');
};
page.onLoadFinished = function() {
    loadInProgress = false;
    console.log('Loading finished');
};
page.onConsoleMessage = function(msg) {
    console.log(msg);
};