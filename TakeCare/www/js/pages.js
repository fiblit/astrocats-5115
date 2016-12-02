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

	var d = new Date(); // TODO: change this to the date stamp stored for the task
	var strTime = formattime(d);

	var careteam = document.createElement("p");
	careteam.innerHTML = "Care Team: " + "PLACEHOLDER TEXT";
	var taskname = document.createElement("p");
	taskname.innerHTML = "Task Name: " + "PLACEHOLDER TEXT";
	var monthday = document.createElement("p");
	monthday.innerHTML = "Date: " + d.getMonth() + "/" + d.getDate();
	var timeofday = document.createElement("p");
	timeofday.innerHTML = "Time: " + strTime;
	var address = document.createElement("p");
	address.innerHTML = "Location: " + "PLACEHOLDER TEXT";
	var importance = document.createElement("p");
	importance.innerHTML = "Importance: " + "Sure";
	var description = document.createElement("p");
	description.innerHTML = "Description: " + "PLACEHOLDER TEXT";

	taskinfo.appendChild(careteam);
	taskinfo.appendChild(taskname);
	taskinfo.appendChild(monthday);
	taskinfo.appendChild(timeofday);
	taskinfo.appendChild(address);
	taskinfo.appendChild(importance);
	taskinfo.appendChild(description);
	elems.push(taskinfo);

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
   var addupdate = document.createElement("div");
   var isFriend = false; //remove after isFriend is implemented
    if (!isFriend) {
    var addbutton = link_button("Add a new update",addupdate);
    addupdate.appendChild(addbutton);
    }
    elems.push(addupdate)
    addupdate.className = "addupdate";
    return elems;
}

function addupdate(){
 var elems = [];

     // Create navbar element
    var navbar = menubar();
    elems.push(navbar);

    var pagename = document.createElement("p");
    pagename.innerHTML = "Add a new update";
    pagename.className = "addupdatepage";
    elems.push(pagename);

    //create input area for task, need to add importance buttons
    var message_area = document.createElement("div");
    message_area.innerHTML = ""+
    "<div id=\"sendto\">"+
    /* we should change this to a dropdown */
        "<label>Send update to: * </label>"+
        "<input type=\"text\" name=\"sendto" required/>" +
    "</div>"+
    "<div id=\"message\">"+
        "<label>Task Message: * </label>"+
        "<input type=\"text\" name=\"message\" required/>"+
    "</div>";

    //create buttons
    message_area.appendChild(link_button("Cancel", updates));
    message_area.className = "messagearea";
    elems.push(message_area);

     //Create post button
    message_area.appendChild(self_button("Post", function () {
        var sendto = text_area.querySelector("#sendto > input").value;
        var message = text_area.querySelector("#message > input").value;
        if (sendto == null || message == null || sendto.trim()=="" || message.trim()=="") {
            var p = document.createElement("div");
            p.innerHTML = "Please fill all the fields.";
            p.id = "error";
            p.style.width = "250px";
            p.style.height = "125px";
            document.querySelector(".app").appendChild(errorpopup(p));
            dim();
        }
        else {
          
            build_page(updates);
        }
    }));

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
