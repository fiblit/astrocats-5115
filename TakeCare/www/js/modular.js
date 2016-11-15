// Sample/test function for loading a page
function page1() {
    //create the array to store returned HTMLElements
    var elems = [];

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
    buttons.appendChild(self_button("button1", page2)); 
    elems.push(buttons);

    return elems
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
    buttons.appendChild(self_button("button2", page1)); 
    buttons.appendChild(self_button("button2", onclick_test));
    elems.push(buttons);

    return elems
}

// Placeholder for profile page
function profile() {
    var elems = [];
    
    var pagename = document.createElement("p");
    pagename.innerHTML = "Profile page";
    elems.push(pagename);
    
    var returnbutton = link_button("Return", page1());
    elems.push(returnbutton);
    
    return elems;
}

// Placeholder for tasks page
function tasks() {
    var elems = [];
    
    var pagename = document.createElement("p");
    pagename.innerHTML = "Tasks page";
    elems.push(pagename);
    
    var returnbutton = link_button("Return", page1());
    elems.push(returnbutton);
    
    return elems;
}

// Placeholder for updates page
function updates() {
    var elems = [];
    
    var pagename = document.createElement("p");
    pagename.innerHTML = "Updates page";
    elems.push(pagename);
    
    var returnbutton = link_button("Return", page1());
    elems.push(returnbutton);
    
    return elems;
}

// Placeholder for settings page
function settings() {
    var elems = [];
    
    var pagename = document.createElement("p");
    pagename.innerHTML = "Profile page";
    elems.push(pagename);
    
    var returnbutton = link_button("Return", page1());
    elems.push(returnbutton);
    
    return elems;
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

// link_button
// Simple function to write a button with an javascript onclick function
// First argument is the text that appears on button
// Second is the onclick function (the object, not its name)
function link_button(button_text, page) {
    link_button = self_button(button_text, function () {
        build_page()
    });
    return link_button;
}

function __init() {
    build_page(page1);
}

function build_page(page) {
    var app = document.querySelector(".app");
    app.innerHTML = "";
    //app.appendChild(page());//given that a page returns an HTMLElement. 
    pageElements = page();//given that a page returns an array of HTMLElements.
    for (int i = 0; i < pageElements.length; i++) {
        app.appendChild(pageElements[i]);
    }
}

// self_button
// takes button text and a callback function as input
// creates and returns a button whose onclick value is the callback function
function self_button(button_text, callback) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = button_text;
    button.onclick = callback;
    return button;
}

// Function for creating the navbar that contains the menu button
function menubar() {
    var navbar = document.createElement("nav");
    var menubutton = self_button("Menu", function() {
        var app = document.querySelector(".app");
        app.appendChild(sidebar());
}

// Function for creating the sidebar
function sidebar() {
    var box = slideout();
    box.appendChild(link_button("Profile", profile()));
    box.appendChild(link_button("Tasks", tasks()));
    box.appendChild(link_button("Updates", updates()));
    box.appendChild(link_button("Settings", settings()));
    return box;
}

// TODO: This
// Placeholder for function for animated slideout box
function slideout() {
    var box = document.createElement("div");
    return box;
}

function onclick_test() {
    alert("clicked");
}