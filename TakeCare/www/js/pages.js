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
    
    // Create buttons div with button linking to page 1
    var buttons = document.createElement("div");
    buttons.appendChild(link_button("button2", page1));
    elems.push(buttons);

    return elems;
}

function login() {
    //create the array to store returned HTMLElements
    var elems = [];

    // Create navbar element
    var navbar = menubar();
    elems.push(navbar);

    // Create input area for (fake) login/password
    var input_area = document.createElement("div");
    input_area.innerHTML = ""+
    "<div id=\"username\">"+
        "<label>Login</label>"+
        "<input type=\"text\" name=\"username\" required/>" +
    "</div>"+
    "<div id =\"password\">"+
        "<label>Password</label>"+
        "<input type=\"password\" name=\"password\" required/>"+
    "</div>";

    //Create login button
    var buttons = document.createElement("div");
    buttons.appendChild(self_button("Login", function () {
        var user = input_area.getElementById("username").getElementsByTagName("input")[0].value;
        var pass = input_area.getElementById("password").getElementsByTagName("input")[0].value;
        if (database["persons"][user]["password"] === pass) {
            database['current_user'] = user;
            build_page(landing);
        }
        else if(!input_area.getElementById("error")) {
            input_area.appendChild(document.createTextNode("Password is incorrect."))
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

    console.log(database);
    
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

// Placeholder for tasks page
function tasks() {
    var elems = [];
    
    var pagename = document.createElement("p");
    pagename.innerHTML = "Tasks page";
    elems.push(pagename);
    
    var returnbutton = link_button("Return", page1);
    elems.push(returnbutton);
    
    return elems;
}

// Placeholder for updates page
function updates() {
    var elems = [];
    
    var pagename = document.createElement("p");
    pagename.innerHTML = "Updates page";
    elems.push(pagename);
    
    var returnbutton = link_button("Return", page1);
    elems.push(returnbutton);
    
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
