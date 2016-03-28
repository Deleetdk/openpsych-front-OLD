// Total number of items in the feeds
var totalODP = 0;
var totalOBG = 0;
var totalOQSPS = 0;

// Function to fetch RSS feed from journals and post to archive
function Archive(journal) {
    // Hide feed until it is populated
    $(id).hide();

    if (journal == 'ODP') {
        var path = '/ODP/feed';
        var id = '#ODP';
        var nid = '#nODP';
    }
    if (journal == 'OBG') {
        var path = '/OBG/feed';
        var id = '#OBG';
        var nid = '#nOBG';
    }
    if (journal == 'OQSPS') {
        var path = '/OQSPS/feed';
        var id = '#OQSPS';
        var nid = '#nOQSPS';
    }

    $.get(path, function (data) {
        var n = 0;
        $(data).find("item").each(function () {
            n += 1

            // find authors and pdf link
            var el = $(this);
            var d = el.find("description").text();
            var author = d.substr(d.indexOf("<author>")+8, d.indexOf("</author>")-8);
            var pdfLink = d.slice(d.indexOf("<link>")+6,-7);

            $(id).append("<p class='archive-item'> \
                                <a class='paper-title' href='"+el.find("link").text()+"'>" + el.find("title").text()+"</a> </br>\
                                <span class='paper-author'>"+author+"</span></br> \
                                <span class='paper-date'>Published on " + el.find("pubDate").text().substring(5,16)+".</span></br> \
                                <hr> \
                                </p>");
        });
        if (journal == 'ODP') {
            totalODP = n;
            $(nid).html("("+totalODP+")")
        };
        if (journal == 'OBG') {
            totalOBG = n;
            $(nid).html("("+totalOBG+")")
        };
        if (journal == 'OQSPS') {
            totalOQSPS = n;
            $(nid).html("("+totalOQSPS+")")
        };

        // Hide the last seperator line
        $(id).children().eq(-2).hide();
    });
};

// Build archive
Archive('ODP')
Archive('OBG')
Archive('OQSPS')
