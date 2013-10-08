/********************************************************************************************
Copyright 2012 Augusto Beiro
This file is part of Foobar.
Foobar is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the 
Free Software Foundation, either version 3 of the License, 
or (at your option) any later version.
Ampache Player is distributed in the hope that it will be useful, 
but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or 
FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with Ampache Player. 
If not, see http://www.gnu.org/licenses/.
/********************************************************************************************/




function publishOnFaceBook() {

	if (ACCESS_TOKEN==null)
		return;
	if (USER_PAGE==null)
		return;
	$("#cLike").fadeOut();
	try {
		a=conn._songs.root.song[currentSong];
		if (a.fanart) 
			picture=a.fanart;
		else
			picture="";

		if (a.mbid)
			link="http://musicbrainz.org/recording/"+a.mbid+"?inc=artist-credits+isrcs+releases";
		else
			link="";

		$.post( "https://graph.facebook.com/"+USER_PAGE+"/feed", 
			{ 
			'message':"Just listened "+a.title+" ("+a.artist+")  via Ampache Player",
			'picture':picture,
			'link':link,
			'access_token':ACCESS_TOKEN

			} 
		).done(function() {
				$("#cLike").get(0).style.backgroundColor="white"
				$("#cLike").fadeIn();
				
		}).fail(function() {
				$("#cLike").get(0).style.backgroundColor="black"
				$("#cLike").fadeIn()
		});
	} catch (e) {

	}

}

function InitFB() {

	client_id='576853419017449';

	if (browserApi) {
		try {
		MY_FACEBOOK_OAUTH_URL='https://www.facebook.com/dialog/oauth?client_id='+client_id+'&redirect_uri=https://'+chrome.runtime.id+'.chromiumapp.org/bast&scope=publish_actions,publish_stream&response_type=token';
		console.log(MY_FACEBOOK_OAUTH_URL);
		chrome.identity.launchWebAuthFlow({
			url: MY_FACEBOOK_OAUTH_URL,
			interactive: true

		}, function(e){ 
			console.log(e);
			if (typeof e == 'undefined' )
				console.log("Couldn't get feisbuk token:"+e);
			else {
				ACCESS_TOKEN=e.split("#")[1].split("=")[1].split("&")[0];	
				$.get( "https://graph.facebook.com/debug_token?input_token="+ACCESS_TOKEN+"&access_token="+ACCESS_TOKEN) 
				.done(function(fdata) {
						console.log(fdata.data);
						USER_PAGE=fdata.data.user_id;
					})

				}
			}
		);
		} catch (feisbukunava) {
			console.log("Not a chrome app, so no facebook (atm)");
		}
	} else {
		MY_FACEBOOK_OAUTH_URL='https://www.facebook.com/dialog/oauth?client_id='+client_id+'&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=publish_actions,publish_stream&response_type=token';
		console.log(MY_FACEBOOK_OAUTH_URL);
		//window.location.replace(MY_FACEBOOK_OAUTH_URL);
					
		
		try {

			/*var jqxhr = $.getJSON( MY_FACEBOOK_OAUTH_URL, function() {
				console.log( "success" );
			})
			.done(function(xhr) {
				console.log( "second success" + xhr );
			})
			.fail(function(xhr) {
				console.log( "error" + xhr );
			})
			.always(function(xhr) {
				console.log( "complete" + xhr );
			});*/

			$.ajax({
				type: "GET",
				url: MY_FACEBOOK_OAUTH_URL,
				cache: false,
				dataType: 'JSONP',
				beforeSend: function(xhr){
					xhr.setRequestHeader('X-Test-Header', 'test-value');
						
				},
			}).done ( function(xhr, status, error) {
					debugger;
					console.log("Error:"+xhr);
					
				}
			).fail(function(xhr) {

						console.log(xhr);
				}

			);
		
		}
		catch (Error) {
			alert(Error);
		}
		//debugger;
	}
}



