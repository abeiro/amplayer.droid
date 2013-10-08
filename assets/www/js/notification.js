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
function showPopup(thumb, title, body) 
{
    if (!window.webkitNotifications) {
        return;
    }
    if (window.webkitNotifications.checkPermission() == 0) 
    {
        var popup = window.webkitNotifications.createNotification(thumb, title, body);
        //Show the popup
        popup.show();
        //set timeout to hide it
        setTimeout(function () 
        {
            popup.cancel();
        }, 5000);
    }
    else {
        window.webkitNotifications.requestPermission();
    }
}


document.head || (document.head = document.getElementsByTagName('head')[0]);

function changeFavicon(src) 
{
    var link = document.createElement('link'), oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = src;
    if (oldLink) {
        document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
}
