let user = JSON.parse(localStorage.getItem('user'));
let title;
let body = document.querySelector('body');
let overlay = document.querySelector('.overlay');


function setUserName() {
    if (user == undefined) {
        let login = document.querySelector('.login');
        let loginInp = document.querySelector('.loginInp');
        login.style.display = 'flex';
        login.style.pointerEvents = 'auto';
        title = document.querySelector('.title');
        title.style.filter='blur(10px)';
        body.style.backgroundColor = 'gray';
        body.style.pointerEvents = 'none';
        show.style.filter='blur(10px)'
        tasktool.style.filter='blur(10px)'
        todoInp.style.filter='blur(10px)'
        let enterBtn = document.querySelector('.sub').addEventListener('click', () => {
            let loginInf = loginInp.value.trim();
            if (loginInf !== "") {
                user = loginInf;
                localStorage.setItem('user', JSON.stringify(user));
                login.style.display = 'none';
                body.style.backgroundColor = 'white';
                body.style.pointerEvents = 'auto';
                body.style.filter = 'blur(0px)';
                tasktool.style.filter='blur(0px)'
                todoInp.style.filter='blur(0px)'
                show.style.filter='blur(0px)'
                title.style.filter='blur(0px)';
                console.log(user);
                render();
            title.innerHTML = `<h1><span> ${user}'s</span> tasks </h1>`;
        }
        
        });
    }
}


title = document.querySelector('.title').innerHTML = `<h1><span> ${user}'s</span> tasks</h1>`;
setUserName();
let span = document.querySelector('span');
        span.addEventListener('click', () => {
         if (show.style.display !== 'none') {
         user = undefined;
          setUserName();
         capitalize(user);}
});


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let show = document.querySelector('.tasks');
let backButton = document.querySelector('.backbutton');
backButton.style.display = 'none';
let tasktool = document.querySelector('.tasktool');
let index, taskspecifics, taskstate;
let todoInp = document.querySelector('.todoInp');

let addBtn = document.querySelector('.addBtn').addEventListener('click', function add() {
    if (show.style.display !== 'none') {
        let tododate = document.querySelector('.taskdate');
        let todotime = document.querySelector('.tasktime');
        let task = { taskN: todoInp.value, taskD: tododate.value, taskT: todotime.value, taskdone: false };
        todoInp.value = '';
        if (task.taskN !== '') {
            tasks.push(task);
            tododate.value = '';
            todotime.value = '';
        }
        render();
        updatelocalstorage();
    }
});

function render() {
    show.innerHTML = '';
    tasktool.style.gridTemplateColumns = '60% 10% 10% 25%';
    for (index = 0; index < tasks.length; index++) {
        taskName = tasks[index].taskN;
        taskDate = tasks[index].taskD;
        tasktime = tasks[index].taskT;
        taskdone = tasks[index].taskdone;

        if (taskDate != undefined && taskName != undefined) {
            show.innerHTML += `<div class="task">
                <div class='text' data-index='${index}'>${taskName}</div>
                <div class='date'>${taskDate}</div>
                <div class='time'>${tasktime}</div>
                <input type="checkbox" class="checkbox" ${taskdone ? 'checked' : ''}>
                <button class='removeBtn' value=${index}>remove</button>
            </div>`;
        }
    }
    let showingEachTask = document.querySelectorAll('.text' || '.date').forEach(function showing(element) {
        element.addEventListener('click', () => {
            show.style.display = 'none';
            backButton.style.display = 'block';
            todoInp.style.animation = 'none'
            tasktool.style.gridTemplateColumns = '12% 60% 10% 10% 25%';
            tasktool.style.marginLeft = '-12%';
            todoInp.style.pointerEvents = 'none' //i've blocked this temporary till i turn it into add a comment inopt
            let clickedIndex = element.getAttribute('data-index');
            taskspecifics = document.querySelector('.tasksspecifics');
            taskspecifics.style.display = 'block';
            if (tasks[clickedIndex].taskdone == true) { taskstate = 'done' } else { taskstate = 'not yet' }
            if(tasks[clickedIndex].taskD !==''){
               taskspecifics.innerHTML =
                `<h1>${tasks[clickedIndex].taskN}</h1>
                    <div>
                        <p>task day : ${tasks[clickedIndex].taskD}</p>
                        <p> task state : ${taskstate}</p>
                        
                    </div>
                    ` 
            }else{
                taskspecifics.innerHTML =
                `<h1>${tasks[clickedIndex].taskN}</h1>
                    <div>
                        <p> task state : ${taskstate}</p>
                        
                    </div>
                    ` 
            }
            
            if(taskstate = 'not yet'){
                taskspecifics.innerHTML =
                `<h1>${tasks[clickedIndex].taskN}</h1>
                    <div>
                        <p>task day : ${tasks[clickedIndex].taskD}</p>
                        <p> task state : ${taskstate}</p>
                        <p>progress : </p>
                        <input class='prog' type='range'>
                        
                    </div>
                    `
            }

        })
    })
    let removeBtn = document.querySelectorAll('.removeBtn').forEach(element => {
        element.addEventListener('click', () => {
            let indexToRemove = element.value;

            tasks.splice(indexToRemove, 1);
            render();
            updatelocalstorage();
        });
    });

    let checkbox = document.querySelectorAll('.checkbox').forEach((element, index) => {
        element.addEventListener('click', () => {
            tasks[index].taskdone = element.checked;
            updatelocalstorage();
        });
    });

    backButton.addEventListener('click', () => {
        show.style.display = 'block';
        backButton.style.display = 'none';
        tasktool.style.gridTemplateColumns = '60% 10% 10% 25%';
        tasktool.style.marginLeft = 'auto';
        taskspecifics.style.display = 'none';
        todoInp.style.animation = 'shadow 1.5s ease infinite'
        todoInp.style.pointerEvents = 'auto'
    })
}

function updatelocalstorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

render();
