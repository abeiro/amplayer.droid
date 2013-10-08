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
function _getCachedData(i, durl, ret) 
{
    var request = $.ajax({
        url : durl, type : "GET", dataType : "text" 
    });
    request.done(function (rawdata) 
    {
        xml = xml2array($.parseXML(rawdata));
        ret(xml);
    });
}


function _getCachedDataXML(i, durl, ret) 
{
    var request = $.ajax({
        url : durl, type : "GET", dataType : "text" ,
		error:function(XMLHttpRequest,textStatus, errorThrown) {     
			alert("Error status :"+textStatus);  
			alert("Error type :"+errorThrown);  
			alert("Error message :"+XMLHttpRequest.responseXML);  
		}
    });
    request.done(function (rawdata) 
    {
		xmldata=$.parseXML( rawdata )
		console.log(xmldata);
        ret(xmldata);
    });
}