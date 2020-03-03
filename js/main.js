
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
            node.appendChild(document.createTextNode('PROJECT -------------> Shows projects'))
            node.append(br.cloneNode(true))
            node.appendChild(document.createTextNode('CONTACT ------------> Shows email address and contact number'))
            node.append(br.cloneNode(true))
            node.appendChild(document.createTextNode('SUDO {command} ---> Give it a try!'))
            node.append(br.cloneNode(true))
            node.appendChild(document.createTextNode('CLEAR -----------------> Clears the terminal (actually refreshes the page)'))
            return node
        }
    },
    {
        command: 'project',
        output: () => {
            let node = document.createElement('p')
            node.appendChild(document.createTextNode('No projects yet. Stay tuned!'))
            return node
        }
    },
    {
        command: 'contact',
        output: () => {
            let node = document.createElement('p')
            let br = document.createElement('br')
            node.appendChild(document.createTextNode('Email Address: alfafara.vm@gmail.com'))
            node.appendChild(br)
            node.appendChild(document.createTextNode('Contact Number: n/a'))
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
        let commandChain = e.target.value.split(' ');
        commandChain.map((commandText) => {
            if (commandText == 'clear') {
                window.location.reload(false)
                return
            }
            
            let commandOutput = commands.find((command) => command.command == commandText.toLowerCase())
            if (commandOutput) 
                output.appendChild(commandOutput.output())
            else {
                let node = document.createElement('p')
                node.appendChild(document.createTextNode('Command not found. Try help'))
                output.appendChild(node)
            }
        })
        moveToBottom(e)
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