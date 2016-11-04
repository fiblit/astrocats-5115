function page()
{
	var app = document.querySelector(".app");
	app.innerHTML = "";
	var tasks = document.createElement("p");
	tasks.innerHTML = "this is a test";
	app.appendChild(tasks);
	tasks.innerHTML = "this is another test";
}