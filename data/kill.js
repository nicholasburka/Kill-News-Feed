//vars
	//if killTrending, removes trending section
	var killOn = true; //determines whether add-on runs at all
	var killTrending = false;
	var killNewsFeed = true;

function kill() {
	//assumes browser, obviously
	var trending = document.getElementById("pagelet_trending_tags_and_topics");

	if (trending) {
	 // 	if (killTrending) {
		// 	//get trending section and remove it from page
		 	trending.parentNode.removeChild(trending);
		// }

		if (killNewsFeed) {
			//currently removes newsfeed AND status update
			var centerColumn = document.getElementById("stream_pagelet");
			//centerColumn.parentNode.removeChild(centerColumn);
			// var newsFeed = document.querySelector('[id^="topnews_"]').id;
			// newsFeed.parentNode.removeChild(newsFeed);

			//RegExp to find the newsFeed
			var newsMatch = /^feed_stream/i;
			//all child elements of the centerColumn of contents
			var contents = centerColumn.getElementsByTagName('*');
			var len = contents.length;
			var current;
			//for each element of
			for (var i = 0; i < len; i++) {
				current = contents[i];
				if (newsMatch.test(current.id)) {
					current.parentNode.removeChild(current);
				}
			}
		}
	}
}

document.onload = kill();