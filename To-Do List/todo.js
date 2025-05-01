let input = document.getElementById("task");
let addButton = document.getElementById("button");
addButton.addEventListener("click", addTask);

function addTask(){
    console.log("Task added");
    if(input.value === ""){
        console.log("Task added if");
        alert("Please enter a task.");
    }
    else{
        console.log("Task added else");
        let list = document.createElement("li");
        list.innerHTML = input.value;
        document.querySelector("ul").appendChild(list);
        input.value = "";
        let span = document.createElement("span");
        span.innerHTML = "\u00D7";
        list.appendChild(span);
    }
}

let listcontainer = document.querySelector(".items");
listcontainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
}, false);

function storeData(){
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showTask(){
    listcontainer.innerHTML = localStorage.getItem("data");
}

showTask();