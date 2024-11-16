// // list check uncheck 
// const list = document.querySelectorAll("li");

// list.forEach((li)=> {
//     li.addEventListener("click", ()=> {
//         li.classList.toggle("checked")
//     })
// })


const inputField = document.querySelector("#inputField");
const taskList = document.querySelector("ul.taskList");

//adding task through Enter Button
inputField.addEventListener("keydown", (e)=>{
    if(e.keyCode == 13) {
        addTask();
    }
})
//so browser gives focus to input field
inputField.focus();  


function addTask() {
    if(inputField.value == '') {
        alert("you must write something!");
        return;
    }

    taskList.classList.remove("hidden");
    var li = document.createElement("li");
    const taskName = inputField.value;
    li.innerHTML = taskName;
    taskList.appendChild(li);
    li.addEventListener("click", ()=> {
        li.classList.toggle("checked");
    })

    var dltBtn = document.createElement("span");
    dltBtn.innerHTML = "\u00d7";
    dltBtn.classList.add("dltBtn");
    li.appendChild(dltBtn);

    dltBtn.addEventListener("click", (event)=> {
        deleteTask(event);
    });

    inputField.value = '';
}

 
function deleteTask(event) {
    const parentElement = event.target.parentElement;
 
    parentElement.remove();

    if(taskList.innerText.length == 0) {
        taskList.classList.add("hidden")
    }

}



