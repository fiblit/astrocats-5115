//call at window load
function __init() {
    app.initialize();
    build_page(page1);
}

//given the page (array of HTMLElements) it will build it into the app.
function build_page(page) {
    var app = document.querySelector(".app");
    app.innerHTML = "";
    //app.appendChild(page());//given that a page returns an HTMLElement. 
    var pageElements = page();//given that a page returns an array of HTMLElements.
    for (var i = 0; i < pageElements.length; i++) {
        app.appendChild(pageElements[i]);
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
    return navbar;
}

// Function for creating the sidebar
function sidebar() {    
    var sidebar = document.createElement("div");
    sidebar.appendChild(link_button("Profile", profile));
    sidebar.appendChild(link_button("Tasks", tasks));
    sidebar.appendChild(link_button("Updates", updates));
    sidebar.appendChild(link_button("Settings", settings));
    back = self_button(null, function() {
        box.parentNode.removeChild(box);
    });
    back.className = "back";
    sidebar.appendChild(back);
    sidebar.className = "sidebar";
    var box = popout(sidebar, 0.65);
    return box;
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
        internal = document.createTextNode(internal);
    }
    if (internal) {
        button.appendChild(internal);
    }
    button.onclick = callback;
    return button;
}


//todo: make this better
// Placeholder for function for animated popout box
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
