function page()
{
	var app = document.querySelector(".app");
	app.innerHTML = "";
	var tasks = document.createElement("p");
	tasks.innerHTML = "this is a test";
	app.appendChild(tasks);
	tasks.innerHTML = "this is another test";
	writetasks(tasks);
}	

function writetasks(elem)
{
	elem.innerHTML = "";
	var table = document.createElement("table");
	elem.appendChild(table);
	var tr = document.createElement("tr");
	tr.innerHTML = "<th>task</th> <th>urgency</th> <th>whatever</th>";
	table.appendChild(tr);
	tr = document.createElement("tr");
	tr.innerHTML = "<td>refill my basketballs</td> <td>very</td> <td>thankyou</td>";
	table.appendChild(tr);
}