// data Initial//////////////

const inpuTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

// events////////////////////

btnTarefa.addEventListener('click', () => {
  if (inpuTarefa.value === '') {
    return
  } else {
    addNewTask(inpuTarefa.value)
  }
})

inpuTarefa.addEventListener('keypress', e => {
  if (e.code === 'Enter' && inpuTarefa.value !== '') {
    addNewTask(inpuTarefa.value)
  }
})

//Evento de apagar
document.addEventListener('click', e => {
  const el = e.target
  if (el.classList.contains('delete')) {
    el.parentElement.remove()
    salveTask()
  }
})

// functions/////////////////

function addNewTask(tarefa) {
  const li = createLi()
  li.innerText = tarefa
  tarefas.appendChild(li)
  createBtnDelete(li)
  cleanInput()
  salveTask()
}

function createLi() {
  const li = document.createElement('li')
  return li
}

function cleanInput() {
  inpuTarefa.value = ''
  inpuTarefa.focus()
}

function createBtnDelete(li) {
  const btnDelete = document.createElement('button')
  btnDelete.innerText = 'Apagar'
  li.innerText += '  '
  li.appendChild(btnDelete)
  btnDelete.setAttribute('class', 'delete')
}

function salveTask() {
  const liTarefas = tarefas.querySelectorAll('li')
  let listaTarefas = []

  for (let tarefas of liTarefas) {
    let textTarefas = tarefas.innerText
    textTarefas = textTarefas.replace('Apagar', ' ').trim()
    listaTarefas.push(textTarefas)
  }

  const tarefasJSON = JSON.stringify(listaTarefas)
  localStorage.setItem('tarefas', tarefasJSON)
}

function addTaskSalved() {
  const tarefas = localStorage.getItem('tarefas')
  const listaDeTarefas = JSON.parse(tarefas)

  for (let tarefa of listaDeTarefas) {
    addNewTask(tarefa)
  }
}

addTaskSalved()
