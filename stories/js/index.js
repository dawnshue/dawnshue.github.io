// Read page's URL variables and return them as an associative array.
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
//Pull the title variable.
var name = getUrlVars()["title"];
//console.log(title);

//Determine the JSON file url to use based on name variable
var jsonfile = null;
//The stories data is loaded from the storylist.js via index.html
//console.log(stories);
$.each(groups, function(key, array) {
    array.forEach(function(n) {
        if(name==n) {
            jsonfile = '/characters/json/'+key+'/'+name+'.json';
        }
    });
});
console.log(jsonfile);

//JQUERY: Pull the JSON file from the URL
$.getJSON(jsonfile, function(newdata) {
    //console.log(newdata);
    //console.log(JSON.stringify(newdata));
    
    //NAME HEADER
    document.getElementById("character_name").innerHTML = newdata.names["Name"];
    //BASICS
    var basics = document.getElementById("character_basics");
    basics.innerHTML+=("<br/><b>Full Name:</b> "+newdata.names["Full Name"]);
    basics.innerHTML+="<br/><b>Other Names:</b> ";
    newdata.names["Other Names"].forEach(function(n) {
        basics.innerHTML+=(n+", ");
    });
    $.each(newdata.basics, function(key, val) {
        basics.innerHTML+=("<br/><b>"+key+":</b> "+val);
    });
    //APPEARANCE
    var appearance = document.getElementById("character_appearance");
    $.each(newdata.appearance, function(key, val) {
        appearance.innerHTML+=("<br/><b>"+key+":</b> "+val);
    });
    //PERSONALITY
    var personality = document.getElementById("character_personality");
    $.each(newdata.personality, function(key, val) {
        personality.innerHTML+=("<br/><b>"+key+":</b> "+val);
    });
    //SKILLS
    var skills = document.getElementById("character_skills");
    $.each(newdata.skills, function(key,val) {
        skills.innerHTML+=("<br/><b>"+key+":</b> "+val);
    })
    $.each(newdata.hobbies, function(key,val) {
        skills.innerHTML+=("<br/><b>"+key+":</b> "+val);
    })
    //LIKES
    var likes = document.getElementById("character_likes");
    likes.innerHTML+=("<br/><b>Likes:</b> ");
    newdata.likes.forEach(function(n) {
        likes.innerHTML+=(n+", ");
    });
    likes.innerHTML+=("<br/><b>Dislikes:</b> ");
    newdata.dislikes.forEach(function(n) {
        likes.innerHTML+=(n+", ");
    });
    //STORY
    document.getElementById("character_story").innerHTML+=newdata.story;
    //RELATIONSHIPS
    var relationships = document.getElementById("character_relationships");
    newdata.relationships.forEach(function(n) {
        var temphtml = "";
        temphtml+=("<br/><b>");
        if(n.url) { temphtml+=('<a href="'+n.url+'">'); }
        temphtml+=(n.name);
        if(n.url) { temphtml+=("</a>"); }
        temphtml+=(":</b> "+n.description+"</li>");
        relationships.innerHTML+=temphtml;
    });
});
