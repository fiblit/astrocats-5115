// Sample/test function for loading a different page
function testing() {
    //create the array to store returned HTMLElements
    var elems = [];

    // Create paragraph element saying "this is page 2!"
    var pagenum = document.createElement("p");
    pagenum.innerHTML = "This is page 2";
    elems.push(pagenum);

    // create a button that opens a popup
    var popbutton = self_button("popup", function () {
        var stuff = document.createElement("div");
        stuff.style.width = "30vw";
        stuff.style.height = "20vh";
        stuff.innerHTML = "This is an alert box.\nYou have been alerted.";
        var box = popup(stuff);
        document.querySelector(".app").appendChild(box);
        dim();
    });

	// create a button that opens an error popup
	var errorbutton = self_button("error", function () {
        var stuff = document.createElement("div");
        stuff.style.width = "30vw";
        stuff.style.height = "20vh";
        stuff.innerHTML = "This is an error box.\nYou have been errored.";
        var box = errorpopup(stuff);
        document.querySelector(".app").appendChild(box);
        dim();
    });

	var confirmbutton = self_button("confirmation", function () {
        var stuff = document.createElement("div");
        stuff.style.width = "30vw";
        stuff.style.height = "20vh";
        stuff.innerHTML = "This is an confirm box.\nYou have been confirmed.";
        var box = confirmationpopup(stuff, function() {
			var cool = document.createElement("div");
			cool.innerHTML = "COOL";
			document.querySelector(".app").appendChild(cool);
		});
        document.querySelector(".app").appendChild(box);
        dim();
    });

	// Create a confirmation button that either does the thing you want or lets you cancel


    // Create buttons div with button linking to page 1
    var buttons = document.createElement("div");
    buttons.appendChild(link_button("landing",landing));
    buttons.appendChild(popbutton);
	buttons.appendChild(errorbutton);
	buttons.appendChild(confirmbutton);
    elems.push(buttons);

    return elems;
}

function login() {
    //create the array to store returned HTMLElements
    var elems = [];


    var logo = document.createElement('img');
    logo.id = "login_logo";
    logo.setAttribute("src","img/FULL_LOGO.png");
    elems.push(logo);

    // Create input area for (fake) login/password
    var input_area = document.createElement("div");
    input_area.innerHTML = ""+
    "<table>"+
        "<tr id=\"username\">"+
            "<td><label>Login</label></td>"+
            "<td><input type=\"text\" name=\"username\" required/></td>"+
        "</tr>"+
        "<tr id=\"password\">"+
            "<td><label>Password</label></td>"+
            "<td><input type=\"password\" name=\"password\" required/></td>"+
        "</tr>"+
    "</table>";

    //Create login button
    var buttons = document.createElement("tr");
    var td = document.createElement('td');
    td.appendChild(self_button("Login", function () {
        var user = input_area.querySelector("#username input").value;
        var pass = input_area.querySelector("#password input").value;
        if (database["persons"][user] && //null check
            database["persons"][user]["password"] === pass) {

            database['current_user'] = user;
            build_page(landing);
        }
        else if(!input_area.querySelector("#error")) {
            var p = document.createElement("div");
            p.innerHTML = "Password is incorrect.";
            p.id = "error";
            p.style.width = "250px";
            p.style.height = "125px";
            document.querySelector(".app").appendChild(errorpopup(p));
            dim();
        }
    }));
    td.setAttribute("colspan", 2);
    buttons.appendChild(td);
    input_area.firstChild.firstChild.appendChild(buttons);
    input_area.className = "inputarea";
    elems.push(input_area);

    return elems;
}

function landing() {
    //create the array to store returned HTMLElements
    var elems = [];

    // Create navbar element
    var navbar = menubar();
    elems.push(navbar);

    // Create paragraph element saying "this is page 1!"
    var pagenum = document.createElement("p");
    //pagenum.innerHTML = "CareTeams";
    elems.push(pagenum);


    /* you may want to make the next line a div which will have ownedTeams in it */
    var h = document.createElement("p");
    h.innerHTML = "CareTeams You Help Manage";
    elems.push(h);

    /**** get the ownedTeams datalist *****/
    var ownedTeams = ufilter(database['teams'] , function(e, name) {
        return (database['persons'][database['current_user']]['teams'].hasOwnProperty(name) &&
               database['persons'][database['current_user']]['teams'][name]['own']);
    }, true,  false, "CareTeam");
    var ownedTeams_list = data_list(ownedTeams);

    /* turn Careteam column into buttons linking to their page */
    [].slice.call(ownedTeams_list.querySelectorAll(".data_CareTeam")).map( function (e) {
        var team = e.innerText;
        e.onclick =  function () {
            database['current_team'] = team;

            /* current user's teams */
            var cut = database['persons'][database['current_user']]['teams'];
            /* if owned */
            if (cut.hasOwnProperty(team) && cut[team]['own']) {
                build_page(owned_careteam);
            }
            else {
                build_page(friend_careteam);
            }
        };
        return e;
    });
    elems.push(ownedTeams_list);

    //TODO should be div
    var h = document.createElement("p");
    h.innerHTML = "CareTeams You Follow";
    elems.push(h);

    /**** get the followed teams data_list ****/
    var followedTeams = ufilter(database['teams'] , function(e, name) {
        return (database['persons'][database['current_user']]['teams'].hasOwnProperty(name) &&
               !database['persons'][database['current_user']]['teams'][name]['own']);
    }, true, false, "CareTeam" );
    var followedTeams_list = data_list(followedTeams);

    [].slice.call(followedTeams_list.querySelectorAll(".data_CareTeam")).map( function (e) {
        var team = e.innerText;
        e.onclick =  function () {
            database['current_team'] = team;

            /* current user's teams */
            var cut = database['persons'][database['current_user']]['teams'];
            /* if owned */
            if (cut.hasOwnProperty(team) && cut[team]['own']) {
                build_page(owned_careteam);
            }
            else {
                build_page(friend_careteam);
            }
        };
        return e;
    });

    elems.push(followedTeams_list);

    var buttons = document.createElement("div");
    buttons.appendChild(link_button("testing", testing));
    elems.push(buttons);

    return elems;
}

// Placeholder for owned careteam
function owned_careteam() {
    var elems = [];

            // Create navbar element
    var navbar = menubar();
    elems.push(navbar);


    /* these next few things may want to be in a "content" div */
    /* image & title */
    elems.push(profile_title());

    /* buttttons */
    var buttonBar = document.createElement("div");

    /* invite teammates button */
    var inviteTeammates = self_button("Invite Teammates", function() {
        var p = document.createElement("div");
        p.innerHTML = "I'm sorry, this is currently unimplemented.";
        p.id = "error";
        p.style.width = "250px";
        p.style.height = "125px";
        document.querySelector(".app").appendChild(errorpopup(p));
        dim();
    });
    inviteTeammates.id = "invite";
    buttonBar.appendChild(inviteTeammates);

    /* add update button */
    var newupdate = link_button("<img src=\"img/update_icon.jpg\" style=\"width:2em;height2em;\">Add Update", addupdate);
    newupdate.id = "add_update";
    buttonBar.appendChild(newupdate);

    buttonBar.id = "button_bar";
    elems.push(buttonBar);

    /* tasks preview + view all button */
    elems.push(preview_tasks());

    return elems;
}

// Placeholder for careteam
function friend_careteam() {
    var elems = [];

    // Create navbar element
    var navbar = menubar();
    elems.push(navbar);

    /* these next few things may want to be in a "content" div */
    /* image & title bar */
    elems.push(profile_title());

    /* most recent update + view all */
    elems.push(most_recent_update());

    /* tasks preview + view all */
    elems.push(preview_tasks());

    return elems;
}

// Tasks page
function tasks() {
    var elems = [];

    // Create navbar element
    var navbar = menubar();
    elems.push(navbar);

    var pagename = document.createElement("p");
    pagename.innerHTML = "Tasks page";
    pagename.className = "taskpage";
    elems.push(pagename);

    var followedTeams = database['persons'][database['current_user']]['teams'];

    var followedTasks = [];
    for (var team in followedTeams) {
    	var name = document.createElement("div");
    	name.innerHTML = team;
    	name.className = "taskteamname";
	elems.push(name);
        for (var task in database['teams'][team]['tasks']) {

            followedTasks.push(database['teams'][team]['tasks'][task]);
        }
    

    followedTasks.map(function( e ) {
        var d = new Date(e['time']);
        e['time'] = d.toLocaleString();
        return e;
    });
    var taskdiv = document.createElement("div");
    var task_list = data_list(followedTasks);
    taskdiv.appendChild(task_list);
    taskdiv.className = "viewtasks";
    elems.push(taskdiv);
}
    //only show "Add a new task" button for CM UI
    var ownedTeams = ufilter(database['teams'] , function(e, name) {
        return (followedTeams.hasOwnProperty(name) &&
                followedTeams[name]['own']);
    }, true, false );

    //If you own SOME team, then you are a CM.
    if (ownedTeams.length > 0){
        var buttons = document.createElement("div");
        buttons.appendChild(link_button("Add a new task",addtasks));
        buttons.className = "addtaskbutton";
        elems.push(buttons);
    }

    return elems;
}

function addtasks() {
     var elems = [];

        // Create navbar element
    var navbar = menubar();
    elems.push(navbar);

    var pagename = document.createElement("p");
    pagename.innerHTML = "Add a new task";
    pagename.className = "addtaskpage";
    elems.push(pagename);

    //create input area for task, need to add importance buttons
    var text_area = document.createElement("div");
    text_area.innerHTML = 
    "<div id=\"careteam\">"+
    /* we should change this to a dropdown */
        "<label>Care Team: <span class=\"required\">*</span> </label>"+
        "<select name=\"careteam\" required/>" +
        "</select>"+
    "</div>"+
    "<div id=\"taskname\">"+
        "<label>Task Name: <span class=\"required\">*</span> </label>"+
        "<input type=\"text\" name=\"taskname\" required/>"+
    "</div>"+
    "<div id=\"date\">"+
        "<label>Date: <span class=\"required\">*</span> </label>"+
        "<input type=\"date\" name=\"date\" required/>"+
    "</div>"+
     "<div id=\"time\">"+
        "<label>Time: <span class=\"required\">*</span> </label>"+
        "<input type=\"time\" name=\"time\" required/>"+
    "</div>"+
    "<div id=\"importance\">"+
        "<label>Importance:</label>"+
        "<div><input type=\"radio\" name=\"importance\" value=\"urgent\">Urgent</div>"+
        "<div><input type=\"radio\" name=\"importance\" value=\"helpful\" checked>Helpful</div>"+
    "</div>"+
     "<div id=\"location\">"+
        "<label>Location: </label>"+
        "<input type=\"text\" name=\"location\" optional/>"+
    "</div>"+
         "<div id=\"description\">"+
        "<label>Description:</label>"+
        "<textarea class=\"description\" rows=\"10\" optional/></textarea>"+
    "</div>";

    //create dropdown options
    var ownedTeams = ufilter(database['teams'] , function(e, name) {
        return (database['persons'][database['current_user']]['teams'].hasOwnProperty(name) &&
                database['persons'][database['current_user']]['teams'][name]['own']);
    }, true, false, 'name' );
    var dropdown = text_area.querySelector('select[name=\"careteam\"]');
    for (var team in ownedTeams) {
        var o = document.createElement("option");
        o.value = ownedTeams[team]['name'];
        o.innerHTML = o.value;
        dropdown.appendChild(o);
    }

    //create buttons
    var cancelButton = self_button("Cancel", back);
    cancelButton.className = "cancel";
    text_area.appendChild(cancelButton);

    //Create post button
    var postButton = self_button("Post", function () {
        var careteam = text_area.querySelector("#careteam > select").value;
        var taskname = text_area.querySelector("#taskname > input").value;
        var date = text_area.querySelector("#date > input").value;
        var time = text_area.querySelector("#time > input").value;
        if (careteam == null || taskname == null || date == null || time == null 
            || careteam.trim()=="" || taskname.trim()=="" || date.trim()=="" || time.trim()=="") {
            var p = document.createElement("div");
            p.innerHTML = "Please fill all the fields.";
            p.id = "error";
            p.style.width = "250px";
            p.style.height = "125px";
            document.querySelector(".app").appendChild(errorpopup(p));
            dim();
        }
        else {
            database['teams'][careteam]['tasks'].push({
                "name": taskname,
                "time": Date.parse(date+" "+time),
                "location": text_area.querySelector("#location > input").value,
                "own": null,
                "description": text_area.querySelector("#description > textarea").value
            });
            build_page(tasks);
        }
    });
    postButton.className = "post";
    text_area.appendChild(postButton);
    
    text_area.className = "textarea";
    elems.push(text_area);

    return elems;
}

// Accept Task page
function accepttask() {
	var elems = [];

    var pagename = document.createElement("p");
    pagename.innerHTML = "Accept a task";
    elems.push(pagename);

    // Create navbar element
    var navbar = menubar();
    elems.push(navbar);

	var taskbutton = document.createElement("div");
	taskbutton.appendChild(self_button("Accept Task", function(){

	}));
	elems.push(taskbutton)

	var taskinfo = document.createElement("div");

    // Find the info about the task we're accepting from the database
	var care_team = database["current_care_team"];
	var current_task = database["current_task"];
    // now that we've grabbed them, delete the temporary variables;
	database["current_care_team"] = undefined;
	database["current_task"] = undefined;

	var taskobj = database["teams"][care_team]["tasks"][current_task];  // just for copying information without having to retype this

	var d = new Date(taskobj["time"]);
	var strTime = formattime(d);

	var careteam = document.createElement("p");
	careteam.innerHTML = "Care Team: " + careteam;
	taskinfo.appendChild(careteam);

	var taskname = document.createElement("p");
	taskname.innerHTML = "Task Name: " + taskobj["name"];
	taskinfo.appendChild(taskname);

	var monthday = document.createElement("p");
	monthday.innerHTML = "Date: " + d.getMonth() + "/" + d.getDate();
	taskinfo.appendChild(monthday);

	var timeofday = document.createElement("p");
	timeofday.innerHTML = "Time: " + strTime;
	taskinfo.appendChild(timeofday);

	if (taskobj["location"] != undefined && taskobj["location"].trim() != "")
	{
	    var address = document.createElement("p");
	    address.innerHTML = "Location: " + taskobj["location"];
	    taskinfo.appendChild(address);
	}

	var importance = document.createElement("p");
	importance.innerHTML = "Importance: " + taskobj["importance"];
	taskinfo.appendChild(importance);

	var description = document.createElement("p");
	description.innerHTML = "Description: " + taskobj["description"];
	taskinfo.appendChild(description);

	var buttons = document.createElement("div");
    //create cancel button
	var cancelbutton = self_button("Cancel", back);
	cancelbutton.className = "cancel";
	buttons.appendChild(cancelbutton);
    //Create send update button
	var acceptbutton = self_button("Accept Task", function () {
	    var d = document.createElement("div");
	    d.innerHTML = "Are you sure you want to accept the task" +
            taskobj["name"] + "?";
	    d.style.width = "60vw";
	    d.style.height = "40vh";
	    var box = confirmationpopup(d, function () {
	        database["teams"][care_team]["tasks"][current_task]["own"] = current_user;
	        build_page(tasks);
	    });
	    document.querySelector(".app").appendChild(box);
	    dim();
	});
	buttons.appendChild(acceptbutton);
	taskinfo.appendChild(buttons);

	elems.push(taskinfo);
    database["current"]


    return elems;
}

// Updates page
function updates() {
    var elems = [];


    // Create navbar element
    var navbar = menubar();
    elems.push(navbar);

    var pagename = document.createElement("p");
    pagename.innerHTML = "Updates";
    pagename.className = "updatepage";
    elems.push(pagename);

    //only add "Add a new update" button if user is care manager

    var followedTeams = database['persons'][database['current_user']]['teams'];

    /* add the updates data list (not most recent) */
    var followedUpdates = [];
    for (var team in followedTeams) {
        for (var update in database['teams'][team]['updates']) {

            followedUpdates.push(database['teams'][team]['updates'][update]);
        }
    }
    followedUpdates.map(function( e ) {
        var d = new Date(e['time']);
        e['time'] = d.toLocaleString();
        return e;
    });
    var update_list = data_list(followedUpdates);
    elems.push(update_list);
    
    //only show "Add a new task" button for CM UI
    var ownedTeams = ufilter(database['teams'] , function(e, name) {
        return (followedTeams.hasOwnProperty(name) &&
                followedTeams[name]['own']);
    }, true, false );

    //If you own SOME team, then you are a CM.
    if (ownedTeams.length > 0){
        var addupdatebutton = document.createElement("div");
        var addbutton = link_button("Add a new update",addupdate);
        addupdatebutton.appendChild(addbutton);
        elems.push(addupdatebutton)
        addupdatebutton.className = "addupdatebutton";
    }
    return elems;
}

function addupdate() {
    var elems = [];
    
    // Create navbar element

    var navbar = menubar();
    elems.push(navbar);

    var pagename = document.createElement("p");
    pagename.innerHTML = "Add a new update";
    pagename.className = "addupdatepage";
    elems.push(pagename);

    //create input area for task, need to add importance buttons
    var text_area = document.createElement("div");

    var update = document.createElement("div");
    update.id = "update";
    var lab = document.createElement("label");
    lab.innerHTML = "Care Team: *";
    update.appendChild(lab);

    var selector = document.createElement("select");
    selector.name = "careteam";

    var carepages = ufilter(database['persons'][database['current_user']]['teams'], function(e, team) {
        return database['persons'][database['current_user']]['teams'][team].hasOwnProperty('own') &&
               database['persons'][database['current_user']]['teams'][team]['own'];
    }, true, false, 'name').map(function(obj) {
        return obj['name'];
    });

    //I changed this because it's supposedly faster from what I've read.
    //feel free to change it back to:
    //for (var team in carepages) {
    for (var i = 0; i < carepages.length; i++) {
        var option = document.createElement("option");
        option.value = carepages[i];//and these to carepages[team]
        option.innerHTML = carepages[i];
        selector.appendChild(option);
    }


    update.appendChild(selector);
    text_area.appendChild(update);

    var title = document.createElement("div");
    title.id = "title";
    lab = document.createElement("label");
    lab.innerHTML = "Title: *";
    title.appendChild(lab);
    var titlebox = document.createElement("input");
    titlebox.type = "text";
    title.appendChild(titlebox);
    text_area.appendChild(title);

    var message = document.createElement("div");
    message.id = "message";
    lab = document.createElement("label");
    lab.innerHTML = "Message: *";
    message.appendChild(lab);
    var messagebox = document.createElement("textarea");
    messagebox.name = "message";
    messagebox.rows = "5";
    message.appendChild(messagebox);
    text_area.appendChild(message);
     

    var buttons = document.createElement("div");
    //create cancel button
    var cancelbutton = self_button("Cancel", back);
    cancelbutton.className = "cancel";
    buttons.appendChild(cancelbutton);
    //Create send update button
    var postbutton = self_button("Send Update", function () {
        var careteam = selector.options[selector.selectedIndex].textContent;
        var titletext = text_area.querySelector("#title > input").value;
        var messagetext = text_area.querySelector("#message > textarea").value;
        if (careteam == null || titletext == null || messagetext == null || careteam.trim() == "" || titletext.trim() == "" || messagetext.trim() == "") {
            var d = document.createElement("div");
            d.innerHTML = "Error: Please enter a Care Team, a title, and a message.";
            d.style.width = "40vw";
            d.style.height = "20vh";
            var box = errorpopup(d);
            document.querySelector(".app").appendChild(box);
            dim();
        }
        else {
            var d = document.createElement("div");
            d.innerHTML = "Create update for Care Team page " + careteam + "?";
            d.style.width = "60vw";
            d.style.height = "40vh";
            var box = confirmationpopup(d, function () {
                database["teams"][careteam]["updates"].push({
                    "title": titletext,
                    "time": Date.now(),
                    "html": messagetext
                })
                build_page(updates);
            });
            document.querySelector(".app").appendChild(box);
            dim();
        }
    });
    postbutton.className = "post";
    buttons.appendChild(postbutton);
    text_area.appendChild(buttons);
    text_area.className = "textarea";
    elems.push(text_area);
    return elems;
}

// Placeholder for settings page
function settings() {
    var elems = [];

    var navbar = menubar();
    elems.push(navbar);

    var pagename = document.createElement("p");
    pagename.innerHTML = "Settings page";
    elems.push(pagename);

    return elems;
}
