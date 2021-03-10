timelineData = {
    "start": new Date( '2021', '2', '1'),
    "end": new Date( '2021', '2', '31'),
    "events" : [
        { "date": new Date( '2021', '2', '4'), label: "Something else Happening" },
        { "date": new Date( '2021', '2', '1'), label: "Something Happening" },
        { "date": new Date( '2021', '2', '9'), label: "This is a Big Deal" },
        { "date": new Date( '2021', '2', '31'), label: "End of Month" },
    ]
}

// Set up the start and end elements
var start = document.getElementsByClassName("tlstart-label")[0];
var end = document.getElementsByClassName("tlend-label")[0];

start.innerHTML = formatDate( timelineData.start );
end.innerHTML = formatDate( timelineData.end );

// Iterate over all the events and create new dots for them
timelineData.events.forEach( createDot );

function createDot( item, index ) {

    var x = window.innerWidth-40;
    
    var dot = document.createElement("div");
    dot.className = "dot";
    //dot.innerHTML = item.label;

    // Figure out the line position based on the date
    daysBetween = (timelineData.end.getTime() - timelineData.start.getTime()) / (1000*60*60*24);
    difference = (timelineData.end.getTime() - item.date.getTime()) / (1000*60*60*24);
    dayPos = daysBetween - difference;
    leftPos = ((dayPos / daysBetween) * x) + 10;

    // Fix the positioning
    dot.style.left = leftPos + 'px';
    dot.style.transform = "translate( 2px, 3px )";

    // Now draw a line
    var tagline = document.createElement("div");
    tagline.className = "tltagline";

    tagline.style.left = leftPos + 'px';
    tagline.style.transform = "translate( -40px, -45px ) rotate( 90deg ) ";

    // Now add the tag
    var tag = document.createElement("div");
    tag.style.display = "inline-block";
    tag.className = "tltag";
    tag.style.transform = "translate( 5px, -145px ) rotate( -35deg )";
    tag.innerHTML = item.label;

    tagWidth = item.label.length * 6;

    if( (leftPos + tagWidth) >= x ) {
        leftPos = leftPos - tagWidth;
        console.log( "Adjusted tag position at the end to " + leftPos + ", offset width is " + tagWidth );
    }

    tag.style.left = leftPos + 'px';


    document.body.appendChild( tagline )
    document.body.appendChild( tag )
    document.body.appendChild( dot )
}

function formatDate( date ) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    var retdate = mm + '/' + dd + '/' + yyyy;
    return retdate;
}