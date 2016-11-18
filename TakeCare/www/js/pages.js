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
    
    //create button div with button linking to login page
    var buttons = document.createElement("div");
    buttons.appendChild(link_button("button2",login));
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

// Login page
function login(){
    var elems = [];
    
    var pagename = document.createElement("p");
    pagename.innerHTML = "Login Page";
    elems.push(pagename);
    
    var x = document.createElement("div");
    
    var user = document.createTextNode("Username: ");
    var psw = document.createTextNode("Password: ");
    
    return elems;
}
