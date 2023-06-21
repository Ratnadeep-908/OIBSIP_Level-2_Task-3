window.addEventListener('load', () => {
    const form = document.querySelector("#task-form");
    const input = document.querySelector("#task-input");
    const pendingTasksList = document.querySelector("#pending-tasks");
    const completedTasksList = document.querySelector("#completed-tasks");

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const task = input.value;

      const taskEl = document.createElement('div');
      taskEl.classList.add('task');

      const taskContentEl = document.createElement('div');
      taskContentEl.classList.add('content');
      taskEl.appendChild(taskContentEl);

      const taskCheckboxEl = document.createElement('input');
      taskCheckboxEl.classList.add('checkbox');
      taskCheckboxEl.type = 'checkbox';
      taskContentEl.appendChild(taskCheckboxEl);

      const taskInputEl = document.createElement('input');
      taskInputEl.classList.add('text');
      taskInputEl.type = 'text';
      taskInputEl.value = task;
      taskInputEl.setAttribute("readonly", "readonly");
      taskContentEl.appendChild(taskInputEl);

      pendingTasksList.appendChild(taskEl);

      input.value = '';

      taskInputEl.addEventListener('click', (e) => {
        taskInputEl.removeAttribute("readonly");
        taskInputEl.focus();
      });

      taskInputEl.addEventListener('blur', (e) => {
        taskInputEl.setAttribute("readonly", "readonly");
      });

      taskEl.addEventListener('dblclick', (e) => {
        taskInputEl.removeAttribute("readonly");
        taskInputEl.focus();
      });

      taskEl.addEventListener('mouseleave', (e) => {
        taskInputEl.setAttribute("readonly", "readonly");
      });

      taskCheckboxEl.addEventListener('change', (e) => {
        if (taskCheckboxEl.checked) {
          pendingTasksList.removeChild(taskEl);
          completedTasksList.appendChild(taskEl);
          addDeleteButton(taskEl);
        } else {
          completedTasksList.removeChild(taskEl);
          pendingTasksList.appendChild(taskEl);
          removeDeleteButton(taskEl);
        }
      });
    });

    function addDeleteButton(taskEl) {
      const deleteBtnEl = document.createElement('button');
      deleteBtnEl.innerText = 'Delete';
      deleteBtnEl.classList.add('delete');
      taskEl.appendChild(deleteBtnEl);

      deleteBtnEl.addEventListener('click', (e) => {
        taskEl.remove();
      });
    }

    function removeDeleteButton(taskEl) {
      const deleteBtnEl = taskEl.querySelector('.delete');
      if (deleteBtnEl) {
        deleteBtnEl.remove();
      }
    }
});
