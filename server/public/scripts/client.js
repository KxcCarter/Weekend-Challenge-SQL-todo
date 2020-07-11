$(document).ready(init);

let orderBy = 'id';

function init() {
    console.log('js + jQ');
    //---------
    $('.js-add-new-task').on('submit', createNewTask);
    $('#jsList').on('click', '.js-ctrl-status', completeTask);
    $('#jsList').on('click', '.js-delete-task', deleteTask);
    $('.js-set-sort').on('click', changeOrderBy);
    // -------

    // on load render todo-list
    getTasks();
}

function changeOrderBy() {
    console.log('in changeOrderBy');
    orderBy = $(this).data('sort');

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
            url: `/todo/?q=${orderBy}`,
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

    Swal.fire({
        title: 'Are you sure you want to delete this task?',
        text: "You won't be able to undo this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: `No, I'm still working on it.`,
    }).then((result) => {
        if (result.value) {
            Swal.fire(removeFromTable(id), 'Deleted!', 'Your file has been deleted.', 'success');
        }
    });
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
        let checkmark = '';
        if (task.completed === true) {
            status = 'bg-info';
            checkmark = '<i class="fas fa-check text-success"></i>';
        } else {
            status = 'bg-light';
        }

        $('#jsList').append(`
        <div class="card  m-3 flex-column"
        style="width: 15rem;">
            <div class="card-header ${status} " data-id="${task.id}" data-completed="${task.completed}">
                <button class="btn btn-sm btn-success js-ctrl-status">complete</button>
                
                <button class="btn btn-sm btn-outline-danger js-delete-task">delete</button>
            </div>
            <div class="card-body">
              <h5 class="card-title js-task-title">${task.title} ${checkmark}</h5>
              <p class="card-text js-task-description">${task.description}</p>
            </div>
            <div class="card-footer text-muted small">
    Created ${task.created}
  </div>
        </div>
        `);
    }
}