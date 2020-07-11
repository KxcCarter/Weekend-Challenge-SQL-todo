$(document).ready(init);

function init() {
    console.log('js + jQ');
    //---------
    $('.js-add-new-task').on('submit', createNewTask);

    // on load render todo-list
    getTasks();
}

function createNewTask(event) {
    event.preventDefault();
    console.log('in createNewTask');

    const newTask = {
        title: $('#jsInputTitle').val(),
        description: $('#jsInputDescription').val(),
    };
    postNewTask(newTask);
}

function postNewTask(newTask) {
    console.log('in postNewTask');
    $.ajax({
            type: 'POST',
            url: '/todo',
            data: newTask,
        })
        .then((response) => {
            console.log(response);
            clearInputs();
            getTasks();
        })
        .catch((err) => {
            console.log(err);
        });
}

function clearInputs() {
    $('.js-add-new-task').trigger('reset');
}

function getTasks() {
    // GETs data from database

    $.ajax({
        type: 'GET',
        url: '/todo',
    }).then((response) => {
        console.log(response);
        render(response);
    });
}

function render(tasks) {
    console.log(`in render`);
    $('#js-list').empty();
    for (let task of tasks) {
        $('#js-list').append(`
        <div class="card bg-light m-3 flex-column" 
        style="max-width: 18rem;" data-id="${task.id}">
            <div class="card-header">
                <button class="btn btn-sm btn-primary">options</button>
            </div>
            <div class="card-body">
              <h5 class="card-title js-task-title">${task.title}</h5>
              <p class="card-text js-task-description">${task.description}</p>
            </div>
        </div>
        `);
    }
}