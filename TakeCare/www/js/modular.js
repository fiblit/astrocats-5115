// Sample/test function for loading a page
function page1()
{
	// First find the main app element
	var app = document.querySelector(".app");
	
	// Now clear the page
	app.innerHTML = "";
	
	// Create paragraph element saying "this is page 1!"
	var pagenum = document.createElement("p");
	pagenum.innerHTML = "This is page 1";
	app.appendChild(pagenum);
	
	// Create tasks table
	var tasks = document.createElement("div");
	writetasks(tasks);
	app.appendChild(tasks);
	
	// Create buttons div with button linking to page 2
	var buttons = document.createElement("div");
	buttons.appendChild(self_button("button1", page2)); 
	app.appendChild(buttons);
}	

// Sample/test function for loading a different page
function page2()
{
	// First find the main app element
	var app = document.querySelector(".app");
	
	// Now clear the page
	app.innerHTML = "";
	
	// Create paragraph element saying "this is page 2!"
	var pagenum = document.createElement("p");
	pagenum.innerHTML = "This is page 2";
	app.appendChild(pagenum);
	
	// Create buttons div with button linking to page 1
	var buttons = document.createElement("div");
	buttons.appendChild(self_button("button2", page1)); 
	buttons.appendChild(self_button("button2", onclick_test));
	app.appendChild(buttons);
}

// Sample/test function for making a table and appending it to a given element
function writetasks(elem)
{
	var table = document.createElement("table");
	elem.appendChild(table);
	var tr = document.createElement("tr");
	tr.innerHTML = "<th>task</th> <th>urgency</th> <th>whatever</th>";
	table.appendChild(tr);
	tr = document.createElement("tr");
	tr.innerHTML = "<td>refill my basketballs</td> <td>very</td> <td>thankyou</td>";
	table.appendChild(tr);
	elem.appendChild(table);
}

// alink_button
// Simple function to write a button with an anchor element to link to another page
// First argument is the text that appears on button
// Second is url being linked to
function alink_button(button_text, link_location)
{
	var a_elem = document.createElement("a");
	a_elem.href = link_location;
	var link_button = document.createElement("input");
	link_button.type = "button";
	link_button.value = button_text;
	a_elem.appendChild(link_button);
	return a_elem;
}

// jlink_button
// Simple function to write a button with an javascript onclick function
// First argument is the text that appears on button
// Second is the onclick function (the object, not its name)
function jlink_button(button_text, link_function)
{
	var link_button = document.createElement("input");
	link_button.type = "button";
	link_button.value = button_text;
	link_button.onclick = link_function;
	return link_button;
}

// self_button
// takes button text and a callback function as input
// creates and returns a button whose onclick value is the callback function
function self_button(button_text, link_function)
{
	var link_button = document.createElement("input");
	link_button.type = "button";
	link_button.value = button_text;
	link_button.onclick = link_function;
	return link_button;
}

function onclick_test()
{
	alert("clicked");
}