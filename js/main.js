
const commands = [
    {
        command: 'help',
        output: () => {
            let node = document.createElement('p')
            node.appendChild(document.createTextNode('This is the Help output'))
            return node
        }
    },
    {
        command: 'sudo',
        output: () => {
            let node = document.createElement('p')
            let childNodeWarning = document.createElement('span')

            childNodeWarning.className = "terminal__body--warning"
            
            childNodeWarning.appendChild(document.createTextNode('HOL\'UP! '))
            node.appendChild(childNodeWarning)
            node.appendChild(document.createTextNode('You tryna execute a command with sudo!'))
            return node
        }
    }
]

let terminal = document.querySelector('#terminal')
let output = document.querySelector('#body');
let outputCopy = output.cloneNode(true)
let count = 0;

function listener(e) {
    if (e.key === 'Enter'){
        // if (/\s/.test(e.target.value)) {
        //     let 
        // }

        if (e.target.value == 'clear') {
            window.location.reload(false)
        }

        if (e.target.value.includes('sudo')) {
            let command = commands.find((command) => command.command == 'sudo')

            output.appendChild(command.output())
            moveToBottom(e)
            return
        }

        let command = commands.find((command) => command.command == e.target.value)

        if (command){
            output.appendChild(command.output())
            moveToBottom(e)
            return
        }
        else {
            let node = document.createElement('p')
            node.appendChild(document.createTextNode('Command not found. Try help'))
            output.appendChild(node)
            moveToBottom(e)
            return
        }
    }
}

function moveToBottom(e) {
    let copy = document.querySelector(`#input${count}`).cloneNode(true)
    e.target.disabled = true

    copy.id = `input${++count}`
    copy.querySelector('input').value = ''
    copy.addEventListener('keypress', listener)
    output.appendChild(copy)
    copy.querySelector('input').focus()
}

function init() {
    document.querySelector('input').addEventListener('keypress', listener)
}

init()