<script>
jQuery(function($) {
    // Debug flag
    var debugMode = true;
    
    // Change this selector to match the main content element of your site, e.g. '#content' or '.entry-content'
    var contentElement = '.entry-content';

    // Default time delay before checking location
    var callBackTime = 100;

    // # px before tracking a reader
    var readerLocation = 150;

    // Set some flags for tracking & execution
    var timer = 0;
    var scroller = false;
    var endContent = false;
    var didComplete = false;

    // Set some time variables to calculate reading time
    var startTime = new Date();
    var beginning = startTime.getTime();
    var totalTime = 0;
    
    // Get some information about the current page
    var pageTitle = document.title;

    // Track the aticle load
    if (!debugMode) {
        window.dataLayer.push({
            'event' : 'scrollEvent',
            'scrollCategory' : 'Reading',
            'scrollAction' : 'ArticleLoaded',
            'scrollLabel' : pageTitle,
            'scrollValue' : undefined,
            'scrollNonInteraction' : 1,
            'scrollMetric1' : undefined,
            'scrollMetric2' : undefined,
            'scrollMetric3' : undefined,
            'scrollDimension' : undefined
        });
    } else {
        alert('The page has loaded. Woohoo.');    
    }

    // Check the location and track user
    function trackLocation() {
        bottom = $(window).height() + $(window).scrollTop();
        height = $(document).height();

        // If user starts to scroll send an event
        if (bottom > readerLocation && !scroller) {
            currentTime = new Date();
            scrollStart = currentTime.getTime();
            timeToScroll = Math.round((scrollStart - beginning) / 1000);
            if (!debugMode) {
                window.dataLayer.push({
                    'event' : 'scrollEvent',
                    'scrollCategory' : 'Reading',
                    'scrollAction' : 'StartReading',
                    'scrollLabel' : pageTitle,
                    'scrollValue' : timeToScroll,
                    'scrollNonInteraction' : 0,
                    'scrollMetric1' : timeToScroll,
                    'scrollMetric2' : undefined,
                    'scrollMetric3' : undefined,
                    'scrollDimension' : undefined
                });
            } else {
                alert('started reading ' + timeToScroll);
            }
            scroller = true;
        }

        // If user has hit the bottom of the content send an event
        if (bottom >= $(contentElement).scrollTop() + $(contentElement).innerHeight() && !endContent) {
            currentTime = new Date();
            contentScrollEnd = currentTime.getTime();
            timeToContentEnd = Math.round((contentScrollEnd - scrollStart) / 1000);
            if (!debugMode) {
                var readerType; 
                if (timeToContentEnd < 60) {
                    readerType = 'Scanner'; 
                } else {
                    readerType = 'Reader';
                }
                window.dataLayer.push({
                    'event' : 'scrollEvent',
                    'scrollCategory' : 'Reading',
                    'scrollAction' : 'ContentBottom',
                    'scrollLabel' : pageTitle,
                    'scrollValue' : timeToContentEnd,
                    'scrollNonInteraction' : 0,
                    'scrollMetric1' : undefined,
                    'scrollMetric2' : timeToContentEnd,
                    'scrollMetric3' : undefined,
                    'scrollDimension' : readerType
                });
            } else {
                alert('end content section '+timeToContentEnd);
            }
            endContent = true;
        }

        // If user has hit the bottom of page send an event
        if (bottom >= height && !didComplete) {
            currentTime = new Date();
            end = currentTime.getTime();
            totalTime = Math.round((end - scrollStart) / 1000);
            if (!debugMode) {
                window.dataLayer.push({
                    'event' : 'scrollEvent',
                    'scrollCategory' : 'Reading',
                    'scrollAction' : 'PageBottom',
                    'scrollLabel' : pageTitle,
                    'scrollValue' : totalTime,
                    'scrollNonInteraction' : 0,
                    'scrollMetric1' : undefined,
                    'scrollMetric2' : undefined,
                    'scrollMetric3' : totalTime,
                    'scrollDimension' : undefined
                });  
            } else {
                alert('bottom of page '+totalTime);
            }
            didComplete = true;
        }
    }

    // Track the scrolling and track location
    $(window).scroll(function() {
        if (timer) {
            clearTimeout(timer);
        }

        // Use a buffer so we don't call trackLocation too often.
        timer = setTimeout(trackLocation, callBackTime);
    });
});
