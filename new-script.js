// adicionar a função addTask no botão
document.getElementById("addTaskButton").addEventListener("click", addTask);

// local de armazenamento - array task
const tasks = [];

// função adicionar tarefas no array addTask
function addTask(){
    // pega o valor dos inputs
    let taskInput = document.getElementById("taskInput")
    let taskDate = document.getElementById("taskDate")
    let taskTime = document.getElementById("taskTime")
    let taskPriority = document.getElementById("taskPriority")
    let taskValue = taskInput.value.trim()

    // adicionando o objeto dentro do array
    if(taskValue && taskTime.value && taskPriority.value){
        // criando objeto task
        const task = {
            value: taskValue,
            date: taskDate.value,
            time: taskTime.value,
            priority: taskPriority.value,
            completed: false
        }
        // colocarndo o objeto task na array tasks com os valores iniciais zerado
        tasks.push[task]
        taskInput.value = ''
        taskDate.value = ''
        taskTime.value = ''
        taskPriority.selectdIndex = 0

        // renderizando as tarefas
        renderTasks()
    }
}

// função renderizar
function renderTasks(){
    const tasksList = document.getElementById("taskList")
    tasksList.innerHTML = ''

    // reduce = transforma a array em um unico valor, ele precisa de um acumulador/contador = acc
    const groupedTasks = tasks.reduce((acc,task) =>{
        const dateKey = formatDate(task.date)

        // agrupando por data
        if(!acc[dateKey]){
            acc[dateKey] = []
        }

        acc [dateKey].push(task)
        return acc

    }, {})

    for(const date in groupedTasks){

        const dateHeader = document.createElement('h3')
        dateHeader.innerText = 'Date de Entrega: ${date}'
        tasksList.appendChild(dateHeader)

        const ul = document.createElement('ul')
        groupedTasks[date].forEach(task => {
            const li = document.createElement('li')
            li.className = 'task-item'
        li.innerHTML = 
        `
        <span class = "${task.completed ?'completed':''}">
            ${task.value}-${task.time} (Prioridade: ${task.priority})
        </span>

        <div>
            <button class = "edit-button" onclick="editTask(this)">Editar</button>
            <button class = "delete-button" onclick="deleteTask(this)">Remover</button>
            <button class = "complete-button" onclick="completeTask(this)">Concluir</button>
        
        </div>
        
        `
        ul.appendChild(li)
        })

        tasksList.appendChild(ul)
    }

}

// Formatar data
function formatDate(dateString){
    let date = new Date(dateString)
    let day = String(date.getDate()).padStart(2,'0')// formatando a dia
    let month = String(date.getMonth() + 1).padStart(2,'0')
    let year = date.getFullYear()

    return '${day}/${month}/${year}'

}

// Função editar task
function editTask(button){
    const li = button.parentElement.parentElement
    const span = li.querySelector('span')
    const taskIndex = Array.from(li.parentElement.children).indexOf(li)

    const task = task.find(t => t.value === span.indexText.split('-')[0])

    const newTask = prompt('Editar tarefa:',taskValue)
    const newDate = prompt('Editar data da tarefa:',taskDate)
    const newTime = prompt('Editar horário da tarefa:',taskTime)
    const newPriority = prompt('Editar prioridade da tarefa(Alta, Média e Baixa):',task.Priority)
   
    if(newTask){
        task.value = newTask
    }

    if(newDate){
        task.date = newDate
    }

    if(newTime){
        task.time = newTime
    }

    if(newPriority){
        task.priority = newPriority
    }
    
    renderTasks()
    
    
}

// Função deletar tarefa
function deleteTask(button){
    const li = button.parentElement.parentElement
    const taskIndex = Array.from(li.parentElement.children).indexOf(li)
    tasks.splice (taskIndex, 1) // função splice remove item na array, o numero 1 é a quantidade de item
    renderTasks()
}

// Função marcar como concluida
function completeTask(button){
    const li = button.parentElement.parentElement
    const span = li.querySelector('span')
    const task = tasks.find(t => t.value === span.innerText.split('-')[0])
    task.completed = !task.completed
    renderTasks()
}
