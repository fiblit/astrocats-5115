// Sample/test function for loading a page
function page1() {
    //create the array to store returned HTMLElements
    var elems = [];

    // Create navbar element
    var navbar = menubar();
    elems.push(navbar);

    // Create paragraph element saying "this is page 1!"
    var pagenum = document.createElement("p");
    pagenum.innerHTML = "This is page 1";
    elems.push(pagenum);

    // Create tasks table
    var tasks = document.createElement("div");
    tasks.appendChild(writetasks());
    elems.push(tasks);

    // Create buttons div with button linking to page 2
    var buttons = document.createElement("div");
    buttons.appendChild(link_button("button1", page2));
    elems.push(buttons);

    return elems;
}

// Sample/test function for loading a different page
function page2() {
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
    buttons.appendChild(link_button("button2", page1));
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

    //*** SETH ***//
    /* you may want to make the next line a div which will have ownedTeams in it */
    var h = document.createElement("p");
    h.innerHTML = "CateTeams You Help Manage";
    elems.push(h);
    var ownedTeams = data_list(ufilter(database['teams'] , function(e, name) {
        return (database['persons'][database['current_user']]['teams'].hasOwnProperty(name) &&
               database['persons'][database['current_user']]['teams'][name]['own']);
    }, true,  true, "team", "details_press_f12"));
    elems.push(ownedTeams);

    //*** SETH ***//
    /* you may want to make the next line a div which will have unownedTeams in it */
    var h = document.createElement("p");
    h.innerHTML = "CareTeams You Follow";
    elems.push(h);
    var followedTeams = data_list(ufilter(database['teams'] , function(e, name) {
        return (database['persons'][database['current_user']]['teams'].hasOwnProperty(name) &&
               !database['persons'][database['current_user']]['teams'][name]['own']);
    }, true, false ));
    elems.push(followedTeams);
    //** the above is rather broken **//


    // Create buttons div with button linking to page 2
    var buttons = document.createElement("div");
    buttons.appendChild(link_button("button1", page2));
    elems.push(buttons);

    return elems;
}

// Placeholder for profile page
function profile() {
    var elems = [];

    var pagename = document.createElement("p");
    pagename.innerHTML = "Profile page";
    elems.push(pagename);

    var returnbutton = link_button("Return", page1);
    elems.push(returnbutton);

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

    var returnbutton = link_button("Return", page1);
    elems.push(returnbutton);
    var followedTeams = database['persons'][database['current_user']]['teams'];

    var followedTasks = [];
    for (var team in followedTeams) {
        for (var task in database['teams'][team]['tasks']) {
            followedTasks.push(database['teams'][team]['tasks'][task]);
        }
    }
    console.log(followedTasks);

    var task_list = data_list(followedTasks);
    elems.push(task_list);

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
    text_area.innerHTML = ""+
    "<div id=\"careteam\">"+
    /* we should change this to a dropdown */
        "<label>Care Team: * </label>"+
        "<input type=\"text\" name=\"careteam\" required/>" +
    "</div>"+
    "<div id=\"taskname\">"+
        "<label>Task Name: * </label>"+
        "<input type=\"text\" name=\"taskname\" required/>"+
    "</div>"+
    "<div id=\"date\">"+
        "<label>Date: * </label>"+
        "<input type=\"date\" name=\"date\" required/>"+
    "</div>"+
     "<div id=\"time\">"+
        "<label>Time: * </label>"+
        "<input type=\"time\" name=\"time\" required/>"+
    "</div>"+
     "<div id=\"location\">"+
        "<label>Location: (optional) </label>"+
        "<input type=\"text\" name=\"location\" optional/>"+
    "</div>"+
         "<div id=\"description\">"+
        "<label>Description: (optional) </label>"+
        "<textarea class=\"description\" rows=\"5\" optional/></textarea>"+
    "</div>";

    //create buttons
    text_area.appendChild(link_button("Cancel", tasks));
    text_area.className = "textarea";
    elems.push(text_area);

     //Create post button
    text_area.appendChild(self_button("Post", function () {
        var careteam = text_area.querySelector("#careteam > input").value;
        var taskname = text_area.querySelector("#taskname > input").value;
        var date = text_area.querySelector("#date > input").value;
        var time = text_area.querySelector("#time > input").value;
        if (careteam == null || taskname == null || date == null || time == null || careteam.trim()=="" || taskname.trim()=="" || date.trim()=="" || time.trim()=="") {
            var p = document.createElement("div");
            p.innerHTML = "Please fill all the fields.";
            p.id = "error";
            p.style.width = "250px";
            p.style.height = "125px";
            document.querySelector(".app").appendChild(errorpopup(p));
            dim();
        }
        else {
            var ownedTeams = ufilter(database['teams'] , function(e, name) {
                return (database['persons'][database['current_user']]['teams'].hasOwnProperty(name) &&
                database['persons'][database['current_user']]['teams'][name]['own']);
            }, true, false ).map(function(e) {
                return e['key'];
            });
            if (!(careteam in ownedTeams)) {
                var p = document.createElement("div");
                p.innerHTML = "I'm sorry, you do not own that careteam or it does not exist.";
                p.id = "error";
                p.style.width = "250px";
                p.style.height = "125px";
                document.querySelector(".app").appendChild(errorpopup(p));
                dim();
            }
            build_page(tasks);
        }
    }));

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
	var current_care_team = database["current_care_team"];
	var current_task = database["current_task"];
    // now that we've grabbed them, delete the temporary variables;
	database["current_care_team"] = undefined;
	database["current_task"] = undefined;

	var taskobj = database["teams"][current_care_team]["tasks"][current_task];  // just for copying information without having to retype this
	var careteam = database["current_care_team"];                                                       // same here

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
	var cancelbutton = link_button("Cancel", tasks);
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
	        database["teams"][current_care_team]["tasks"][current_task]["own"] = current_user;
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

    var returnbutton = link_button("Return", page1);
    elems.push(returnbutton);

   //only add "Add a new update" button if user is care manager
   var addupdatebutton = document.createElement("div");
   var isFriend = false; //remove after isFriend is implemented
    if (!isFriend) {
    var addbutton = link_button("Add a new update",addupdate);
    addupdatebutton.appendChild(addbutton);
    }
    elems.push(addupdatebutton)
    addupdatebutton.className = "addupdatebutton";
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
        return database['persons'][database['current_user']]['teams'][team].hasOwnProperty('own');
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
    var cancelbutton = link_button("Cancel", updates);
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

    var pagename = document.createElement("p");
    pagename.innerHTML = "Profile page";
    elems.push(pagename);

    var returnbutton = link_button("Return", page1);
    elems.push(returnbutton);

    return elems;
}
