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
       document.getElementById("ctl00_HeaderCtrl_txtLoginUsername").value = "-";
        document.getElementById("ctl00_HeaderCtrl_txtLoginPassword").value = "-";
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
  //Step 4 - Selecting Date for Monthly report - Previous Month
    function(){
    console.log("Step 4 - Selecting Date for Monthly report - Previous Month");
         var fs = require('fs');
         page.evaluate(function() {

         var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
        
         var d = new Date();
         var month = d.getMonth();
         var year = d.getFullYear();

          var element = document.getElementById("ctl00_ctl00_ContentPlaceHolderBody_ContentPlaceHolderBodyLI_ddlDate");
          var selectMonth = "01_"+monthNames[month]+"_"+year;
          console.log(selectMonth);
          //element.options[1] = selectMonth;
          //console.log("val is"+ element.options[7].text);
        
         for (var i = 1; i < monthNames.length; i++) {
               //console.log(monthName[i]);
               if(monthNames[i] === monthNames[month]){

                    console.log("looper"+i + "  today"+ monthNames[month]);
                    element.options[1].selected = true;


               }
          } 

          
         //document.getElementById("ctl00_ctl00_ContentPlaceHolderBody_ContentPlaceHolderBodyLI_btnGo").click();
         //console.log("The current Month & Year is: " + monthNames[month] +" "+year);

        

    //     var csv = [];
    // var rows = document.querySelectorAll("table tr");
    
    // for (var i = 0; i < rows.length; i++) {
    //     var row = [], cols = rows[i].querySelectorAll("td, th");
        
    //     for (var j = 0; j < cols.length; j++) 
    //         row.push(cols[j].innerText);
        
    //     csv.push(row.join(","));        
    // }
    // console.dir(csv);
    // return csv;
    

    // Download CSV file
    // downloadCSV(csv.join("\n"), filename);
    //   return document.querySelectorAll("html")[0].outerHTML;
    });
         page.render("page1.png");
        
        // fs.write('scrapped.csv',result, 'w');
    },
      function(){
      console.log("Step 5 - Clicky click");
      page.evaluate(function() {
            document.getElementById("ctl00_ctl00_ContentPlaceHolderBody_ContentPlaceHolderBodyLI_btnGo").click();
      // page.evaluate(function() {
      //   var csv = [];
      //   var rows = document.querySelectorAll("table tr");
        
      //   for (var i = 0; i < rows.length; i++) {
      //       var row = [], cols = rows[i].querySelectorAll("td, th");
            
      //       for (var j = 0; j < cols.length; j++) 
      //           row.push(cols[j].innerText);
            
      //       csv.push(row.join(","));        
      //   }
      //   //console.dir(csv);
      //   return csv;
    

      //   Download CSV file
      //   downloadCSV(csv.join("\n"), filename);
      //   return document.querySelectorAll("html")[0].outerHTML;
      //   });fs.write('scrapped.csv',result, 'w');
        });
    
          
      },
       function(){
                console.log("Step 6 - Clicky hui click");
                page.evaluate(function() {
                     console.log("Step 6 - Clicky hui click");
                
      });
                page.render("page2.png");
   },


    function(){
      console.log("Step 7 - CSV");
      page.evaluate(function() {
            document.getElementById("ctl00_ctl00_ContentPlaceHolderBody_ContentPlaceHolderBodyLI_monthlyEarnings_HyperLinkExportToCSV").click();
      // page.evaluate(function() {
      //   var csv = [];
      //   var rows = document.querySelectorAll("table tr");
        
      //   for (var i = 0; i < rows.length; i++) {
      //       var row = [], cols = rows[i].querySelectorAll("td, th");
            
      //       for (var j = 0; j < cols.length; j++) 
      //           row.push(cols[j].innerText);
            
      //       csv.push(row.join(","));        
      //   }
      //   //console.dir(csv);
      //   return csv;
    

      //   Download CSV file
      //   downloadCSV(csv.join("\n"), filename);
      //   return document.querySelectorAll("html")[0].outerHTML;
      //   });fs.write('scrapped.csv',result, 'w');
        });
    
          
      },

];
/**********END STEPS THAT FANTOM SHOULD DO***********************/
 
//Execute steps one by one
interval = setInterval(executeRequestsStepByStep,50);   vd
 
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