document.addEventListener("DOMContentLoaded", function() {
  const addServiceBtn = document.getElementById('addNewService');
  const modal = document.getElementById('taskModal');
  const closeModalBtn = document.querySelector('.close-btn');
  const saveTaskBtn = document.getElementById('saveTask');
  const taskTitleInput = document.getElementById('taskTitle');
  const taskDescriptionInput = document.getElementById('taskDescription');
  const taskResponsibleInput = document.getElementById('taskResponsible');
  const taskPriorityInput = document.getElementById('taskPriority');
  const taskDueDateInput = document.getElementById('taskDueDate');
  const deleteTaskBtn = document.getElementById('deleteTask');
  const exitModalBtn = document.getElementById('exitModal');
  const limparBtn = document.getElementById('limparBtn'); // Botão "Limpar"

 
      function formatDate(date) {
          let day = date.getDate();
          let month = date.getMonth() + 1; 
          return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}`;
      }
  
      
      function getWeekNumber(date) {
          const startDate = new Date(date.getFullYear(), 0, 1); 
          const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000)); 
          return Math.ceil((days + startDate.getDay() + 1) / 7); 
      }
  
      
      const today = new Date();
      
      
      const weekNumber = getWeekNumber(today);
  
   
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() + 1); 
      
     
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); 
  
      
      const weekNumberElement = document.getElementById('weekNumber');
      weekNumberElement.textContent = `SEMANA ${weekNumber}`;
  
     
      const weekPeriodElement = document.getElementById('weekPeriod');
      weekPeriodElement.textContent = `${formatDate(startOfWeek)} a ${formatDate(endOfWeek)}`;
 
  


  const taskContainers = {
      inspection: document.getElementById('inspectionTasks'),
      maintenance: document.getElementById('maintenanceTasks'),
      ok: document.getElementById('okTasks')
  };

  let editingTask = null;  


  function limparCampos() {
      taskTitleInput.value = '';
      taskDescriptionInput.value = '';
      taskResponsibleInput.value = '';
      taskPriorityInput.value = '';
      taskDueDateInput.value = '';
  }

  limparBtn.addEventListener('click', limparCampos);


 
  addServiceBtn.addEventListener('click', function() {
      modal.style.display = "block";
      editingTask = null;  
      limparCampos();
  });

  
  closeModalBtn.addEventListener('click', function() {
      modal.style.display = "none";
  });

  
  exitModalBtn.addEventListener('click', function() {
      modal.style.display = "none";
  });

  
  saveTaskBtn.addEventListener('click', function() {
      const taskTitle = taskTitleInput.value;
      const taskDescription = taskDescriptionInput.value;
      const taskResponsible = taskResponsibleInput.value;
      const taskPriority = taskPriorityInput.value;
      const taskDueDate = taskDueDateInput.value;

      if (taskTitle && taskDescription && taskResponsible && taskPriority && taskDueDate) {
          if (editingTask) {
              
              editingTask.querySelector('.task-title strong').textContent = taskTitle;
              editingTask.querySelector('p:nth-of-type(2)').textContent = `Descrição: ${taskDescription}`;
              editingTask.querySelector('p:nth-of-type(3)').textContent = `Responsável: ${taskResponsible}`;
              editingTask.querySelector('p:nth-of-type(4)').textContent = `Prioridade: ${taskPriority}`;
              editingTask.querySelector('p:nth-of-type(5)').textContent = `Prazo: ${taskDueDate}`;
              setDeadlineColor(editingTask, taskDueDate);

              
          
          updateTaskInLocalStorage(editingTask.dataset.title, {
              title: taskTitle,
              description: taskDescription,
              responsible: taskResponsible,
              priority: taskPriority,
              dueDate: taskDueDate
          });

          editingTask.dataset.title = taskTitle; 
      } else {
         
          const taskCard = createTaskCard(taskTitle, taskDescription, taskResponsible, taskPriority, taskDueDate, "inspection");
          taskContainers.inspection.appendChild(taskCard);
          saveTaskToLocalStorage(taskTitle, taskDescription, taskResponsible, taskPriority, taskDueDate);
      }
      modal.style.display = "none";
      limparCampos(); 
  } else {
      alert('Por favor, preencha todos os campos!');
  }
});


function updateTaskInLocalStorage(oldTitle, newTaskData) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(task => {
      if (task.title === oldTitle) {
          return { ...task, ...newTaskData };
      }
      return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

  
  function createTaskCard(title, description, responsible, priority, dueDate, column) {
      const taskCard = document.createElement('div');
      taskCard.classList.add('task-card');
      taskCard.draggable = true;

      taskCard.innerHTML = `
          <p class="task-title"><strong>${title}</strong></p>
          <p><strong>Descrição:</strong> ${description}</p>
          <p><strong>Responsável:</strong> ${responsible}</p>
          <p><strong>Prioridade:</strong> ${priority}</p>
          <p><strong>Prazo:</strong> ${dueDate}</p>
          <button class="edit-btn">Editar</button>
          <button class="delete-btn">Excluir</button>
      `;

     
      setDeadlineColor(taskCard, dueDate, column);

      
      taskCard.addEventListener('dragstart', function(e) {
          e.dataTransfer.setData('text', title);
      });

      
      taskCard.querySelector('.delete-btn').addEventListener('click', function() {
          taskCard.remove();
          deleteTaskFromLocalStorage(title);  
      });

      
      taskCard.querySelector('.edit-btn').addEventListener('click', function() {
          
          taskTitleInput.value = title;
          taskDescriptionInput.value = description;
          taskResponsibleInput.value = responsible;
          taskPriorityInput.value = priority;
          taskDueDateInput.value = dueDate;
          modal.style.display = "block";
          editingTask = taskCard;  
      });

      return taskCard;
  }

 
  function setDeadlineColor(card, dueDate, column) {
      const today = new Date();
      const deadline = new Date(dueDate);
      const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

      if (column === "ok") {
          card.style.borderRight = "10px solid green";
      } else if (diffDays > 3) {
          card.style.borderRight = "10px solid blue";
      } else if (diffDays > 0) {
          card.style.borderRight = "10px solid yellow";
      } else {
          card.style.borderRight = "10px solid red";
      }
  }

 
 function saveTaskToLocalStorage(title, description, responsible, priority, dueDate) {
  const task = { title, description, responsible, priority, dueDate };
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function deleteTaskFromLocalStorage(title) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.title !== title);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
      const taskCard = createTaskCard(task.title, task.description, task.responsible, task.priority, task.dueDate);
      taskContainers.inspection.appendChild(taskCard);
  });
}


loadTasksFromLocalStorage();


document.querySelectorAll('.kanban-column').forEach(function(column) {
  column.addEventListener('dragover', function(e) {
      e.preventDefault();
  });

  column.addEventListener('drop', function(e) {
      e.preventDefault();
      const title = e.dataTransfer.getData('text');
      const taskCards = document.querySelectorAll('.task-card');
      let droppedTaskCard;

      taskCards.forEach(function(taskCard) {
          const titleElement = taskCard.querySelector('p strong');
          if (titleElement && titleElement.textContent === title) {
              droppedTaskCard = taskCard;
          }
      });

      if (droppedTaskCard) {
          column.querySelector('.task-container').appendChild(droppedTaskCard);
      }
  });
});
});
