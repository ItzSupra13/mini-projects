let lists = document.getElementsByClassName("list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");

for(list of lists){
    list.addEventListener("dragstart", (e) => {
        let selected = e.target;
        rightBox.addEventListener("dragover", (e) => {
            e.preventDefault();
        })
        rightBox.addEventListener("drop", (e) => {
            rightBox.appendChild(selected);
            selected = null;
            let newList = document.createElement("div");
        })
        leftBox.addEventListener("dragover", (e) => {
            e.preventDefault();
        })
        leftBox.addEventListener("drop", (e) => {
            leftBox.appendChild(selected);
            selected = null;
            let newList = document.createElement("div");
        })
    })
}

//3rd Real World Project of the day. 
// This wasnt so much self doing as I learned about "drop", "dragover" and "dragstart" event, but oh well, atleast I learned!

// Let's aim for 5 simple Real World projects for the day (I'm jobless)