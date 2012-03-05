$(document).ready(function(){
    var username = getSessionCookie();
    if (username == null) {
        $.get("../signup.html");
    } else {
        $("p").html("Welcome back, " + username);
    }
});

function getSessionCookie() {
    return $.cookie("username");
    alert( $.cookie("username"));
}

// Read a page's URL variables and returns them as an associative array
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
