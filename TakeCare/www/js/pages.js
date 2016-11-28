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

    // Create input area for (fake) login/password
    var input_area = document.createElement("div");
    input_area.innerHTML = ""+
    "<div id=\"username\">"+
        "<label>Login</label>"+
        "<input type=\"text\" name=\"username\" required/>" +
    "</div>"+
    "<div id=\"password\">"+
        "<label>Password</label>"+
        "<input type=\"password\" name=\"password\" required/>"+
    "</div>";

    //Create login button
    var buttons = document.createElement("div");
    buttons.appendChild(self_button("Login", function () {
        var user = input_area.querySelector("#username > input").value;
        var pass = input_area.querySelector("#password > input").value;
        if (database["persons"][user] && //null check
            database["persons"][user]["password"] === pass) {

            database['current_user'] = user;
            build_page(landing);
        }
        else if(!input_area.querySelector("#error")) {
            var p = document.createElement("p");
            p.innerHTML = "Password is incorrect.";
            p.id = "error";
            input_area.appendChild(p);
        }
    }));
    input_area.appendChild(buttons);
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
    pagenum.innerHTML = "This is landing page (WIP)";
    elems.push(pagenum);

    //** the following is rather broken **//
    var ownedTeams = data_list(function () {
        var list = [];
        for (let k of Object.keys(database['teams']).filter(function(elem, i, arr) {
                return (database['persons'][database['current_user']]['teams'][elem] && //null check
                       database['persons'][database['current_user']]['teams'][elem]['own']);
            })) {
            list.push(database['teams'][k])
        }
        return list;
    }());
    var followedTeams = data_list(function () {
        var list = [];
        for (let k of Object.keys(database['teams']).filter(function(elem, i, arr) {
                return (database['persons'][database['current_user']]['teams'][elem] && //null check
                       database['persons'][database['current_user']]['teams'][elem]['own']);
            })) {
            list.push(database['teams'][k])
        }
        return list;
    }());
    elems.push(ownedTeams);
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
    
    var pagename = document.createElement("p");
    pagename.innerHTML = "Tasks page";
    elems.push(pagename);
    
    // Create navbar element
    var navbar = menubar();
    elems.push(navbar);
    
    var returnbutton = link_button("Return", page1);
    elems.push(returnbutton);
    
    var isFriend = false; //delete after ifFriend is implemented
    //only show "Add a new task" button for CM UI
    if (!isFriend){ //Dalton to implement isFriend
    var addbutton = link_button("Add a new task",addtasks);
    elems.push(addbutton);
    }
    return elems;
}

function addtasks() {
     var elems = [];
    
    var pagename = document.createElement("p");
    pagename.innerHTML = "Add a new task";
    elems.push(pagename);
    
    // Create navbar element
    var navbar = menubar();
    elems.push(navbar);

    
    //create input area for task, need to add importance buttons
    var text_area = document.createElement("div");
    text_area.innerHTML = ""+
    "<div id=\"careteam\">"+
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
    
     //Create post button
    var buttons = document.createElement("div");
    buttons.appendChild(self_button("Post", function () {
        var careteam = text_area.querySelector("#careteam > input").value;
        var taskname = text_area.querySelector("#taskname > input").value;
        var date = text_area.querySelector("#date > input").value;
        var time = text_area.querySelector("#time > input").value;
        if (careteam == null || taskname == null || date == null || time == null || careteam.trim()=="" || taskname.trim()=="" || date.trim()=="" || time.trim()=="") {
            var p = document.createElement("p");
            p.innerHTML = "Error: Field is required.";
            p.id = "error";
            text_area.appendChild(p);
        }
        else {
        var popbutton = self_button("popup", function () {
        var stuff = document.createElement("div");
        stuff.style.width = "30vw";
        stuff.style.height = "20vh";
        stuff.innerHTML = "This is an alert box.\nYou have been alerted.";
        var box = popup(stuff);
        document.querySelector(".app").appendChild(box);
        dim();
});
        var confirmbutton = self_button("confirmation", function () {
        var stuff = document.createElement("div");
        stuff.style.width = "30vw";
        stuff.style.height = "20vh";
        stuff.innerHTML = "Are you sure you want to post this task?";
        var box = confirmationpopup(stuff, function() {
			var cool = document.createElement("div");
			cool.innerHTML = "Task has been posted.";
			document.querySelector(".app").appendChild(cool);
		});
        document.querySelector(".app").appendChild(box);
        dim();
});
 	var buttons = document.createElement("div");
 	buttons.appendChild(popbutton);
		buttons.appendChild(confirmbutton);
    	elems.push(buttons);
        }
    }));
    //create cancel button
    buttons.appendChild(link_button("Cancel", tasks));
    text_area.appendChild(buttons);
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
	
	var d = new Date();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	
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
    
    var pagename = document.createElement("p");
    pagename.innerHTML = "Updates";
    elems.push(pagename);
    
    // Create navbar element
    var navbar = menubar();
    elems.push(navbar);
    
    var returnbutton = link_button("Return", page1);
    elems.push(returnbutton);
    
   //only add "Add a new update" button if user is care manager
   var isFriend = false; //remove after isFriend is implemented
    if (!isFriend) {
    var addbutton = link_button("Add a new update",addupdate);
    elems.push(addbutton);
    }
    return elems;
}

function addupdate(){
    var elems = [];
    
    // Create navbar element
    var navbar = menubar();
    elems.push(navbar);
    
     //create input area for updates
    var text_area = document.createElement("div");
    text_area.innerHTML = ""+
    "<div id=\"update\">"+
        "<label>Send update to: * </label>"+
        "<input type=\"text\" name=\"update\" required/>" +
    "</div>"+
    "<div id=\"message\">"+
        "<label>Message: * </label>"+
        "<input type=\"text\" name=\"message\" required/>" +
    "</div>";
    
     //Create send update button
    var buttons = document.createElement("div");
    buttons.appendChild(self_button("Send Update", function () {
        var update = text_area.querySelector("#update > input").value;
        var message = text_area.querySelector("#message > input").value;
        if (update == null || message == null || update.trim()=="" || message.trim()=="") {
            var p = document.createElement("p");
            p.innerHTML = "Error: Field is required.";
            p.id = "error";
            text_area.appendChild(p);
        }
        else {
         build_page(updates);
        }
    }));
    //create cancel button
    buttons.appendChild(link_button("Cancel", updates));
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
