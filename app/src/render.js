const { ipcRenderer } = require('electron')

let blockedExes = JSON.parse(localStorage.getItem('exes')) || []
let blockedWindows = JSON.parse(localStorage.getItem('windows')) || []

document.addEventListener('DOMContentLoaded', () => {
    const fileSelect = document.getElementById('fileInput');
    const windowBtn = document.querySelector('.window-btn')
    const closeBtn = document.querySelector('#close-btn')

    fileSelect.addEventListener('change', e => {
        const splitted = e.target.value.split('\\');
        blockedExes.push(splitted[splitted.length - 1])

        renderItems()
        sendData()
        setLocally()
    });

    const fixedInput = document.getElementById('fixed-input');
    fixedInput.style.display = 'none'

    const saveBtn = document.getElementById('save-btn');
    const inputField = document.getElementById('input-field');

    windowBtn.addEventListener('click', () => {
      fixedInput.style.display = fixedInput.style.display === 'none' ? 'block' : 'none';
    });
    closeBtn.addEventListener('click', () => {
        fixedInput.style.display = 'none';
    });
  

    saveBtn.addEventListener('click', () => {
      const savedValue = inputField.value;
      blockedWindows.push(savedValue)
      fixedInput.style.display = fixedInput.style.display === 'none' ? 'block' : 'none';

      inputField.value = ''
      renderItems()
      sendData()
      setLocally()
    });

    renderItems()
});


const renderItems = () => {
    const listEl = document.querySelector('.list')
    listEl.innerHTML = ''

    blockedExes.forEach(e => {
        listEl.innerHTML += pTag(e)
    })

    blockedWindows.forEach(e => {
        listEl.innerHTML += pTag(e)
    })
}

const pTag = (text) => {
    return `<p>${text}</p>`
}

const sendData = () => {
    ipcRenderer.send("message-from-renderer", { exes: blockedExes, windows: blockedWindows });
}

const setLocally = () => {
    localStorage.setItem('exe', JSON.stringify(blockedExes))
    localStorage.setItem('windows', JSON.stringify(blockedWindows))
}