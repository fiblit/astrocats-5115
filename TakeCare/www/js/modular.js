//call at window load
function __init() {
    app.initialize();
    database['stack'] = [];
    database['last_page'] = null;
    build_page(login);
}

//given the page (array of HTMLElements) it will build it into the app.
function build_page(page) {
    var app = document.querySelector(".app");
    app.innerHTML = "";
    app.id = page.name+'_page';
    database['stack'].push(database['last_page']);
    database['last_page'] = page;

    // add the dimmer div
    var dimmer = document.createElement("div");
    dimmer.className = "dimmer";
    dimmer.onclick = function() {
        undim();
    };
    app.appendChild(dimmer);

    //app.appendChild(page());//given that a page returns an HTMLElement. 
    var pageElements = page();//given that a page returns an array of HTMLElements.
    for (var i = 0; i < pageElements.length; i++) {
        app.appendChild(pageElements[i]);
    }
}

function back() {
    if (database['stack'].length > 1) {
        build_page(database['stack'].pop());
        database['stack'].pop();
    }
    else {
        var p = document.createElement("div");
        p.innerHTML = "No more pages to go back to.";
        p.id = "error";
        p.style.width = "250px";
        p.style.height = "125px";
        document.querySelector(".app").appendChild(errorpopup(p));
        dim();
    }
}

// Sample/test function for making a table and appending it to a given element
function writetasks() {
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    tr.innerHTML = "<th>task</th> <th>urgency</th> <th>whatever</th>";
    table.appendChild(tr);
    tr = document.createElement("tr");
    tr.innerHTML = "<td>refill my basketballs</td> <td>very</td> <td>thankyou</td>";
    table.appendChild(tr);
    return table;
}

// Function for creating the navbar that contains the menu button
function menubar() {
    var navbar = document.createElement("nav");
    var menubutton = self_button("Menu", function () {
        var app = document.querySelector(".app");
        if (!document.querySelector(".sidebar")) {
            app.appendChild(sidebar());
        }
        else {
            app.removeChild(app.querySelector(".sidebar").parentNode);
        }
    });
    navbar.appendChild(menubutton);
    var backbutton = self_button("Back", function () {
        back();
    });
    backbutton.id = "backbutton";
    navbar.appendChild(backbutton);
    return navbar;
}

// Function for creating the sidebar
function sidebar() {    
    var sidebar = document.createElement("div");
    sidebar.appendChild(link_button("Profile", landing));
    sidebar.appendChild(link_button("Tasks", tasks));
    sidebar.appendChild(link_button("Updates", updates));
    sidebar.appendChild(link_button("Settings", settings));
    sidebar.appendChild(link_button("Log out", login));
    sidebar.className = "sidebar";
    var box = popout(sidebar, 0.65);
    dim();
    return box;
}

//goes on the two careteam pages
function preview_tasks() {
    var _container = document.createElement("div");
    _container.className = "taskpreview";
    _container.innerHTML = 
    "<table style=\"width:100%;overflow-x:scroll;\">" + /* this was admittedly hacky */
        "<tr class=\"header\">"+
            "<td><p>Tasks Preview</p></td>"+
        "</tr>"+
        "<tr class=\"nest\">"+
        "</tr>"+
    "</table>";

    var view = link_button("View all", tasks)
    view.id = "view_all";
    _container.querySelector(".header > td").appendChild(view);

    var followedTasks = [];
    for (var task in database['teams'][database['current_team']]['tasks']) {
            followedTasks.push(database['teams'][database['current_team']]['tasks'][task]);
    }
    followedTasks.map( function (e) {
        var d = new Date(e['time']);
        e['time'] = d.toLocaleString();
        return e;
    });
    _container.querySelector(".nest").appendChild(data_list(followedTasks));
    return _container;
}

function most_recent_update() {
    /* I should probably put this in a function */
    var mostrecent = document.createElement("div");
    mostrecent.className = "mostrecent";
    mostrecent.innerHTML = 
    "<table style=\"width:100%;overflow-x:scroll;\">" + /* this was admittedly hacky */
        "<tr class=\"header\">"+
            "<td><p>Most Recent Update</p></td>"+
        "</tr>"+
        "<tr class=\"nest\">"+
        "</tr>"+
    "</table>";

    var view = link_button("View all Updates", updates)
    view.id = "view_all";
    mostrecent.querySelector(".header > td").appendChild(view);

    var followedUpdates = [];
    for (var update in database['teams'][database['current_team']]['updates']) {
            followedUpdates.push(database['teams'][database['current_team']]['updates'][update]);
    }
    var mostrecenttime = Number.MAX_VALUE;
    for (var update in followedUpdates) {
        /* check for recency */
        if ( followedUpdates[update]['time'] < mostrecenttime ) {
            mostrecenttime = followedUpdates[update]['time'];
        }
    }

    //create most recent update
    followedUpdates.map(function (e) {
        if (e['time'] === mostrecenttime) {
            var d = new Date(e['time']);
            e['time'] = d.toLocaleString();
            return e;
        }
    });

    //create the data "list"
    mostrecent.querySelector(".nest").appendChild(data_list(followedUpdates));
    return mostrecent;
}

function profile_title() {
    var head = document.createElement("div");
    head.innerHTML =
    "<table>"+
    "<tr>"+
        "<td><img id=\"profilepic\" src=\"img/default_profile_icon.jpg\"></td>"+
        "<td id=\"right_data\"><p>"+database['current_team']+"'s CareTeam Page</p></td>"+
    "</tr>"+
    "</table>";
    head.id = "head";
    return head;
}

function preview_all_tasks() {
    var _contain = document.createElement("div");
    _contain.className = "taskpagepreview";
    _contain.innerHTML = 
    "<table style=\"width:100%;overflow-x:scroll;\">" + /* this was admittedly hacky */
        "<tr class=\"header\">"+
            "<td><p> task </p></td>"+
        "</tr>"+
        "<tr class=\"taskTable\">"+
        "</tr>"+
    "</table>";

            for (var task in database['teams'][team]['tasks']) {

            followedTasks.push(database['teams'][team]['tasks'][task]);
        }

    followedTasks.map(function( e ) {
        var d = new Date(e['time']);
        e['time'] = d.toLocaleString();
        return e;
    });
    _contain.querySelector(".taskTable").appendChild(data_list(followedTasks));
    return _contain;
}

// link_button
// Simple function to write a button with an javascript onclick function
// First argument is the text that appears on button
// Second is the onclick function (the object, not its name)
function link_button(button_text, page) {
    var link_button = self_button(button_text, function () {
        build_page(page);
    });
    return link_button;
}

// self_button
// takes internal Element/Text/Null to be put inside the self_button
//   and a callback function as input
// creates and returns a button whose onclick value is the callback function
function self_button(internal, callback) {
    var button = document.createElement("button");
    button.type = "button";
    if (typeof(internal) === "string") {
        button.innerHTML = internal;
        internal = null;
    }
    if (internal) {
        button.appendChild(internal);
    }
    button.onclick = callback;
    return button;
}

// Function for animated popout box
// internal = what to popout
// time = how long it takes to popout "internal"
function popout(internal, time) {
    var box = document.createElement("div");
    box.className = "popout";
    box.style.width = internal.style.width;
    box.style.height = internal.style.height;
    internal.style.animation = "popout "+time+"s";
    box.appendChild(internal);
    return box;
}

// Function for making an alert/confirmation box in the middle of the screen
function popup(internal) {
    var box = document.createElement("div");
    box.className = "alert";
    box.style.width = internal.style.width;
    box.style.height = internal.style.height;
    box.appendChild(internal);
    return box;
}

// Extension of popup for error boxes
function errorpopup(internal) {
	var buttons = document.createElement("div");
	buttons.appendChild(self_button("Ok", function() {
		undim();
	}));
	internal.appendChild(buttons);
	
	var box = popup(internal);
    return box;
}

// Extension of popup for confirmation boxes
function confirmationpopup(internal, confirmedfunction) {
	var buttons = document.createElement("div");
	buttons.appendChild(self_button("Cancel", function() {
		undim();
	}));
	buttons.appendChild(self_button("Ok", function() {
		confirmedfunction();
		undim();
	}));
	internal.appendChild(buttons);
	
	var box = popup(internal);
	return box;
}

// Function for activating the dimmer div
function dim() {
    var dimmer = document.querySelector(".dimmer");
    dimmer.style.display = "block";
}

// Function for deactivating the dimmer div
function undim() {
	var popouts = document.querySelectorAll(".popout, .alert");
	for (var i = 0; i < popouts.length; i++) {
		popouts[i].parentNode.removeChild(popouts[i]);
	}
    
    var dimmer = document.querySelector(".dimmer");
    dimmer.style.display = "none";
}

// Function for getting a string in the format "12:30 PM" from a date object
/* I don't think we need this */
/* see: 
var d = new Date(atimestamp);
var formattedtime = d.toLocaleString(); */
function formattime(d) {
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}


//NOTE: javascript has map, reduce (a.k.a. fold left), reduceRight (a.k.a. fold right), and filter.
//  This may be useful for creating dataToList
//dataToList is an array of objects with key:value pairs.
function data_list(dataToList) {

    /* SHOULD PROBABLY CHANGE THE TABLE FORMAT TO DIVS FOR THE SAKE OF STYLING */

    var dataListed = document.createElement("table");
    var row = document.createElement("tr");
    for (var k in dataToList[0]) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(k));
        th.className = "head_"+k;
        row.appendChild(th);
    }
    dataListed.appendChild(row);
    for (var i = 0; i < dataToList.length; i++) {
        row = document.createElement("tr");
        for (var k in dataToList[i]) {
            var col = document.createElement("td");
            col.innerHTML = dataToList[i][k];
            //col.appendChild(document.createTextNode(dataToList[i][k]));
            col.className = "data_"+k;
            row.appendChild(col);
        }
        dataListed.appendChild(row);
    }
    return dataListed;
}

function data_list2(dataToList) {

    /* SHOULD PROBABLY CHANGE THE TABLE FORMAT TO DIVS FOR THE SAKE OF STYLING */
var pic = document.createElement('img');
    pic.id = "profile_pic";
    pic.setAttribute("src","img/FULL_LOGO.png");

    var dataListed = document.createElement("table");
//    var row = document.createElement("tr");
 //   for (var k in dataToList[0]) {
 //       var th = document.createElement("th");
//        th.appendChild(document.createTextNode(k));
//        th.className = "head_"+k;
//        row.appendChild(th);
///    }
//    dataListed.appendChild(row);
    for (var i = 0; i < dataToList.length; i++) {
        row = document.createElement("tr");
        for (var k in dataToList[i]) {
            var col = document.createElement("td");
            col.innerHTML = dataToList[i][k];
            //col.appendChild(document.createTextNode(dataToList[i][k]));
            col.className = "data_"+k;
            row.appendChild(col);
        }
        dataListed.appendChild(row);
    }
    return dataListed;
}

// this filter works on assoc and non-assoc arrays/objects AFAIK.
//Will optionally return either an array of {"key","val"} objects, or just an array of the val's
//  obj:: object 
//      the object/assoc array to be filted;
//  fun:: function(elem, key)
//      describes the filter where elem is the current element value being filter, and key is its key;
//  withKey:: boolean 
//      whether the returned array objects have the key wrapper;
//  withVal:: boolean
//      same as withKey but for val; only takes affect if withKey == true.
function ufilter(obj, fun, withKey=true, withVal=true, keyName="key") {
    var result = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && fun(obj[key], key)) {
            var objToPush = [];
            if (typeof(obj[key])) {
                for (var i in obj[key]) { /*unwraps objects*/
                    objToPush.push({"key":i, "val":obj[key][i]});
                }
            }
            else {
                objToPush.push(obj[key]);
            }
            if (withKey) {
                var o = {};
                o[keyName] = key;
                if (withVal) {
                    for (var j in objToPush) {
                        o[objToPush[j]["key"]] = objToPush[j]["val"];
                    }
                }
                result.push(o);
            }
            else {
                var o = {};
                for (var j in objToPush) {
                    o[objToPush[j]["key"]] = objToPush[j]["val"];
                }
                result.push(o);
            }   
        }
    }

    return result;
}

/************ probably don't need this
/* source: 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
This is for compatibility with all browsers */
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}
