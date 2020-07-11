$(document).ready(init);

function init() {
    console.log('js + jQ');
    //---------
    $('.js-add-new-task').on('submit', createNewTask);
    $('#jsList').on('click', '.js-ctrl-status', changeStatus);
    $('#jsList').on('click', '.js-delete-task', deleteTask);

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

function changeStatus() {
    console.log($(this).parent().data('id'));
}

function deleteTask() {
    console.log('In delete task.');
}

function render(tasks) {
    console.log(`in render`);
    $('#jsList').empty();
    for (let task of tasks) {
        $('#jsList').append(`
        <div class="card bg-light m-3 flex-column" 
        style="max-width: 18rem;">
            <div class="card-header" data-id="${task.id}">
                <button class="btn btn-sm btn-success js-ctrl-status">complete</button>
                <button class="btn btn-sm btn-outline-danger js-delete-task">delete</button>
            </div>
            <div class="card-body">
              <h5 class="card-title js-task-title">${task.title}</h5>
              <p class="card-text js-task-description">${task.description}</p>
            </div>
        </div>
        `);
    }
}