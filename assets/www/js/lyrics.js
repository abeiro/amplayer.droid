 

function extractLyrics() {

	superstring="";
	$("#lyricsCanvas").html(superstring)
	re=/(&#[0-9]{1,4};)/gm;
	$.get("http://lyrics.wikia.com/"+conn._songs.root.song[currentSong].artist.replace(/ /g,"_")+":"+conn._songs.root.song[currentSong].title.replace(/ /g,"_")
	,function (e) {
		pass1=e.replace(/<br[\s\S]\/>/mg,'&#182;')
		
		pass2=pass1.match(re);
		
		for (i=0;i<pass2.length;i++) {
			superstring+=pass2[i]
		};
		pass3=superstring.replace(/&#182;/mg,'<br/>')
		$("#lyricsCanvas").html(pass3)
	} ).fail(function() {
			console.log("No lyrics found");
			$("#lyricsCanvas").html("No lyrics found")
		});

}

