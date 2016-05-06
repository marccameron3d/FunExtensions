//Global URL variable
var tabURL = "";


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnUmb').addEventListener('click', Umbraco);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnSocial').addEventListener('click', OpenSocialTabs);
});

function Umbraco() {
    console.log("umbraco tab");
   //Get current Tab url
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            tabURL = tabs[0].url;
            console.log("Grabbed URL : " + tabURL);

            //check if in back-office
            if (tabURL.indexOf("umbraco") > -1) {
                //if found						
                var newURL = extractDomain(String(tabURL));
                console.log("Extracted URL: " + newURL);

                var finalUrl = "http://" + newURL;
                console.log("Final URL: " + finalUrl);

                chrome.tabs.create({ url: finalUrl });
            }
            else {
                //if not found
                var newURL = extractDomain(String(tabURL));
                console.log("Extracted URL: " + newURL);

                var finalUrl = "http://" + newURL + "/umbraco/"
                console.log("Final URL: " + finalUrl);

                chrome.tabs.create({ url: finalUrl });
            }
        });
        //console.log(tabURL);
 
}

function OpenSocialTabs() {

    var newURLs = [
        "http://www.facebook.com",
        "https://www.linkedin.com/ ",
        "https://www.gmail.com",
        "http://themorningbrew.net/",
        "https://news.ycombinator.com/",
        "https://twitter.com/"
    ];
    for(var i =0; i < newURLs.length; i++) {
        chrome.tabs.create({ url: newURLs[i] });
    }

}



////Get Domain from the url
function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}