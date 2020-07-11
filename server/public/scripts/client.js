$(document).ready(init);

function init() {
    console.log('js + jQ');
    //---------
    $('.js-add-new-task').on('submit', createNewTask);
    $('#jsList').on('click', '.js-ctrl-status', completeTask);
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
            console.log('POST error!', err);
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
        })
        .then((response) => {
            render(response);
        })
        .catch((err) => {
            console.log('GET error!', err);
        });
}

function completeTask() {
    console.log('in completeTask');
    const id = $(this).parent().data('id');
    let status = $(this).parent().data('completed');

    // this should toggle the status
    changeStatus(id, !status);
}

function changeStatus(id, status) {
    console.log('in changeStatus');

    $.ajax({
            type: 'PUT',
            url: `/todo/${id}`,
            data: { status: status },
        })
        .then((response) => {
            getTasks();
        })
        .catch((err) => {
            console.log('PUT error!', err);
        });
}

function deleteTask() {
    console.log('In delete task.');
    const id = $(this).parent().data('id');

    removeFromTable(id);
}

function removeFromTable(id) {
    $.ajax({
            type: 'DELETE',
            url: `/todo/${id}`,
        })
        .then((response) => {
            console.log('Task deleted from database');
            getTasks();
        })
        .catch((err) => {
            console.log('DELETE error!', err);
        });
}

function render(tasks) {
    console.log(`in render`);
    $('#jsList').empty();
    for (let task of tasks) {
        let status = null;
        if (task.completed === true) {
            status = 'bg-info';
        } else {
            status = 'bg-light';
        }

        $('#jsList').append(`
        <div class="card ${status} m-3 flex-column"
        style="width: 15rem;">
            <div class="card-header" data-id="${task.id}" data-completed="${task.completed}">
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