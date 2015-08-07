// Total number of items in the feeds
var totalODP = 0;
var totalOBG = 0;

// How many items have been displayed
var numFeedsODP = 0;
var numFeedsOBG = 0;

// Function to fetch RSS feed from journals and display on front page
function Feeder(journal, first) {
    // Number of items to display in feed
    var numFeed = 4;
    
    // Hide feed until it is populated
    if (first) $(id).hide();
    
    if (journal == 'ODP') {
        var path = './ODP/feed';
        var id = '#odp-feed';
        var i = numFeedsODP;
        numFeedsODP += 4;
    }
    if (journal == 'OBG') {
        var path = './OBG/feed';
        var id = '#obg-feed';
        var i = numFeedsOBG;
        numFeedsOBG += 4;
    }

    $.get(path, function (data) {
        var j = 0;
        $(data).find("item").each(function () {
            j += 1;

            // Hide load button if all items has been showed in feed
            if (first != true) {
                if (numFeedsOBG >= totalOBG) {
                    if (numFeedsODP >= totalODP) {
                        $("#more").hide();
                    }
                }
            }
            
            if (j>i+numFeed) return false; // have we already displayes numFeed additional papers?

            // find authors and pdf link
            var el = $(this);
            var d = el.find("description").text();
            var author = d.substr(d.indexOf("<author>")+8, d.indexOf("</author>")-8);
            var pdfLink = d.slice(d.indexOf("<link>")+6,-7);
            
            if (j>i) { // only post succesive papers in stead of starting from the top every time
                $(id).append("<p class='feeditem'> \
                                    <a class='paper-title' href='"+el.find("link").text()+"'>" + el.find("title").text()+"</a> </br>\
                                    <span class='paper-author'>"+author+"</span></br> \
                                    <span class='paper-date'>Published on " + el.find("pubDate").text().substring(5,16)+".</span></br> \
                                    <a class='btn btn-default' href='"+pdfLink+"'><small>Download paper</small></a> \
                                    </p>");
            }
        });

        // Show feed and hide loading animation    
        if (first) {
            $(id).fadeIn();
            $("#loader").fadeOut();
        }
        
        $.get(path, function (data) {
            var n = 0;
            $(data).find("item").each(function () {
                n += 1
            });
            if (journal == 'ODP') {
                totalODP = n;
            };
            if (journal == 'OBG') {
                totalOBG = n;
            };
        });
    });
};

// Build feed
Feeder('ODP', true)
Feeder('OBG', true)

// Load additional publications when the button is pressed
$("#more").click(function() {
    Feeder('ODP')
    Feeder('OBG')
});