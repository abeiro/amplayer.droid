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
function ceventFired(evType) 
{
    a = jQuery("div.plButton");
	for (i = 0;
    i < a.length;
    i++) {
        a[i].onclick = function () 
        {
            conn.localplay(this.getAttribute("songnumber"));
        }
    }
}
function loadPlayList() 
{
    songsArray = new Array();
    for (i in conn._songs.root.song) 
    {
        f = conn._songs.root.song[i];
        songsArray[i] = ["<div class='plButton' id='s" + i + "' songnumber='" + i + "'><img src='images/play.png'></div>", 
        f["title"], f["artist"], f["album"] ] 
    }
    $('#playlist').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="playlistContent"></table>' );
    $('#playlistContent') .bind('sort', function () 
    {
        ceventFired( 'Sort' );
    }) .bind('filter', function () 
    {
        ceventFired( 'Filter' );
    }) .bind('page', function () 
    {
        ceventFired( 'Page' );
    }) .dataTable( 
    {
        "aaData" : songsArray, "aoColumns" : [ {
            "sNumber" : "", "sWidth" : "32px" 
        },
        {
            "sTitle" : "Title", "sWidth" : "150px"
        },
        {
            "sArtist" : "Artist" 
        },
        {
            "sAlbum" : "Album" 
        } ] 
    } );
    $("#playlistContent_paginate").on("click", "a", function () 
    {
        ceventFired(null) 
    });
    //$('#playlistContent_paginate').live('click', function(){ ceventFired(null); });
    //$('#playlistContent tbody tr').live('click', function () {ceventFired(null)});
    //document.querySelector(".plButton").onclick=function() {conn.nextSong()}
    conn.loadImage("img/logo.png", _("art"));
    ceventFired(null);
}
function randomizePL() 
{
    asource = new Array();
    for (i in conn._songs.root.song) {
        asource[i] = conn._songs.root.song[i];
    }
    a = shuffleArray(asource);
    conn._songs.root.song = a;
    loadPlayList();
}
function shuffleArray(array) 
{
    for (var i = array.length - 1; i > 0; i--) 
    {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function removeAllChilds(cell) {
    if (cell.hasChildNodes()) {
        while (cell.childNodes.length >= 1) {
            cell.removeChild(cell.firstChild);
        }
    }
}

function changeListModel(element,newopts) {
	removeAllChilds(element);
	i=0;
	for (var k in newopts) {
		element.options[i++] = new Option(newopts[k],k);
	}

}