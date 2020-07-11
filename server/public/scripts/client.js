$(document).ready(init);

function init() {
    console.log('js + jQ');

    // on load render todo-list
    getTasks();
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
        <div class="card bg-light m-3 flex-column" style="max-width: 18rem;" data-id="${task.id}">
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