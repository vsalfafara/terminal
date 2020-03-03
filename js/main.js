
const commands = [
    {
        command: 'help',
        output: () => {
            let node = document.createElement('p')
            let br = document.createElement('br')
            node.appendChild(document.createTextNode('Here are the available commands:'))
            node.append(br)
            node.appendChild(document.createTextNode('HELP ------------------> Shows available commands'))
            node.append(br.cloneNode(true))
            node.appendChild(document.createTextNode('HISTORY -------------> Shows command history'))
            node.append(br.cloneNode(true))
            node.appendChild(document.createTextNode('CLEAR ----------------> Clears the terminal'))
            node.append(br.cloneNode(true))
            node.appendChild(document.createTextNode('SUDO {command} --> Give it a try!'))
            
            output.appendChild(node)
        }
    },
    {
        command: 'history',
        output: () => {
            history.map((command) => {
                let node = document.createElement('p')
                node.appendChild(document.createTextNode(command))
                output.appendChild(node)
            })
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
            
            output.appendChild(node)
        }
    }
]

let history = []
let historyNavigation = history.length;

let terminal = document.querySelector('#terminal')
let output = document.querySelector('#body');
let outputCopy = output.cloneNode(true)
let count = 0;

function execute(e) {
    if (e.key === 'Enter' && e.target.value){
        let commandChain = e.target.value.split(' ');
        commandChain.map((commandText) => {
            if (commandText == 'clear') 
                output.innerHTML = ''
            else {
                let commandOutput = commands.find((command) => command.command == commandText.toLowerCase())
                if (commandOutput) 
                    commandOutput.output()
                else {
                    let node = document.createElement('p')
                    node.appendChild(document.createTextNode('Command not found. Try help'))
                    output.appendChild(node)
                }
            }
        })
        moveToBottom(e)

        history.push(e.target.value)
        if (history.length > 10)
            history.shift()
        historyNavigation = history.length
    }
}

function getHistory(e) {
    let input = document.querySelector(`#input${count}`).querySelector('input')
    
    if (e.keyCode == 38) {
        if (historyNavigation > 0 ) 
            input.value = history[--historyNavigation]
    }
    else if (e.keyCode == 40) {
        if (historyNavigation < history.length-1 ) 
            input.value = history[++historyNavigation]
    }
}

function moveToBottom(e) {
    let copy = document.querySelector(`#input${count}`)

    if (copy) {
        copy = copy.cloneNode(true)
        e.target.disabled = true
    
        copy.id = `input${++count}`
        copy.querySelector('input').value = ''
        copy.querySelector('input').addEventListener('keypress', execute)
        copy.querySelector('input').addEventListener('keydown', getHistory)
        output.appendChild(copy)
        copy.querySelector('input').focus()
        copy.querySelector('input').autocomplete = 'off'
    }
    else {
        copy = document.createElement('div')
        let p = document.createElement('p')
        let span = document.createElement('span')
        let input = document.createElement('input')

        span.className = "terminal__body__input--highlight"
        span.appendChild(document.createTextNode('guest'))

        p.appendChild(document.createTextNode('guest@vsalfafara.github.io:~ '))
        p.appendChild(span)
        p.appendChild(document.createTextNode('$'))

        input.type = 'text'
        input.id = 'input'
        input.spellcheck = false
        input.autocomplete = 'off'

        copy.className = 'terminal__body__input'
        copy.id = 'input0'
        copy.appendChild(p)
        copy.appendChild(input)

        output.appendChild(copy)
        input.focus()
        input.addEventListener('keypress', execute)
        input.addEventListener('keydown', getHistory)
        count = 0
    }
}

function init() {
    let input = document.querySelector('input')
    input.addEventListener('keypress', execute)
    input.addEventListener('keydown', getHistory)
}

init()