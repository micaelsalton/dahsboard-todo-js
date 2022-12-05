const todoEl = document.getElementById("todo-input")
const todoList = document.getElementById("todo-list")
let id = 0
let todoArr = [] 

class TodoList {
    constructor(todo) {
        Object.assign(this, todo)
        const { text, id } = this

        this.getTodoHtml = `
     <div class="container" id="container-${id}">
         <div class="hover-div" id="hide-${id}">
             <p id="p-${id}" data-text="${id}">${text}</p>
             <span id="remove">
             <i data-delete="${id}" class="material-icons" style="font-size:18px;color:red">remove_circle_outline</i>
             </span>
         </div>
         <div class="hidden" id="div-${id}">
             <input type="text" value="${text}" id="inp-${id}">
             <button data-edit="${id}">Arrow</button>
         </div>
     </div>`

        const newDiv = document.createElement('div')
        newDiv.innerHTML = this.getTodoHtml
        todoList.append(newDiv)

        this.showEdit = () => {
            document.getElementById(`div-${id}`).classList.toggle("hidden")
            document.getElementById(`hide-${id}`).classList.toggle("hidden")
        }

        newDiv.addEventListener("click", (e) => {
            if (e.target.dataset.text) {
                this.showEdit()
            }
            else if (e.target.dataset.delete) {
                todoArr = todoArr.filter(item => item.id !== id)
                render()
            }
            else if (e.target.dataset.edit) {
                const newText = document.getElementById(`inp-${id}`)
                if (newText.value && !todoArr.some(item => item.text === newText.value)) {
                    const editedObj = todoArr.filter(item => item.id === id)[0]
                    editedObj.text = newText.value
                    render()
                    this.showEdit()
                }
                /* atualizar o valor do input pra se entrar um que não aceita (igual, vazio), ele manter o anterior */
                const editedObj = todoArr.filter(item => item.id === id)[0]
                newText.value = editedObj.text
                this.showEdit()
            }
        })

    }
}

function getInputValue(){
        id++
        let input = todoEl.value
        let todo = {text: input,
                    id: id
                    }
    return todo
}

document.getElementById("todo-btn").addEventListener("click", ()=>{  
    if(todoEl.value && !todoArr.some(item => item.text === todoEl.value)){ 
    let todo = getInputValue()
        todoArr.push(todo)
        render()
        todoEl.value = ""  
    }
})

function render() {
    todoList.innerHTML = "" 
    todoArr.forEach(item => {
        return new TodoList(item)
    })
}

