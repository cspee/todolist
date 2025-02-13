
const sectionBtnPlusContainer = document.querySelectorAll('.sectionBtnPlus')
const modal = document.querySelector('.modal')
const modalWindow = document.querySelector('.modal__window')
const bodys = document.querySelectorAll('.body')
const body = document.getElementsByTagName('body')
const itemTemplate = document.querySelector('.item__tamplate')

const modalSelect = document.querySelector('.modal__select')
const modalTittle = document.querySelector('.modal__tittle')
const modalText = document.querySelector('.modal_text')

const editMenu = document.querySelector('.editMenu')
console.log(editMenu);

const modalBtnClose = document.querySelector('.modal__btnClose')
const modalBtnAdd = document.querySelector('.modal__btnAdd')


modal.addEventListener('click', (e) => {
    if (!modalWindow.contains(e.target)) {
        modal.classList.toggle('hidden')
    }
})

sectionBtnPlusContainer.forEach(element => {
    element.addEventListener('click', () => {
        modal.classList.toggle('hidden')
        modal.dataset.id = element.dataset.id
        console.log(modal.dataset.id);
    })
});

modalBtnClose.addEventListener('click', () => {
    modal.classList.toggle('hidden')
})

modalBtnAdd.addEventListener('click', () => {
    const clone = itemTemplate.content.cloneNode(true)

    const modalSelectValue = modalSelect.value
    const modalTittleValue = modalTittle.value
    const modalTextValue = modalText.value

    const cloneType = clone.querySelector('.item__text')
    const clonTittle = clone.querySelector('.item__bodyHeader')
    const clonText = clone.querySelector('.item__bodyText')
    const cloneColor = clone.querySelector('.item__color')
    const cloneItem = clone.querySelector('.item')
    const cloneEditBtn = clone.querySelector('.item__editBtn')
    const cloneEditMenu = clone.querySelector('.editMenu')

    // const cloneTittle = clone.querySelector('.')

    cloneType.innerText = modalSelectValue
    clonTittle.innerText = modalTittleValue
    clonText.innerText = modalTextValue
    cloneColor.style.backgroundColor = getColor(modalSelectValue)


    cloneItem.setAttribute('id', Date.now())
    cloneItem.setAttribute('draggable', true)
    cloneItem.addEventListener('dragstart', drag)
    cloneEditBtn.addEventListener('click', () => {
         
        cloneEditMenu.classList.toggle('hidden')
    })

    
    
    if (modal.dataset.id == 1) {
        bodys[0].append(clone)
    }
    if (modal.dataset.id == 2) {
        bodys[1].append(clone)
    }
    if (modal.dataset.id == 3) {
        bodys[2].append(clone)
    }
    

})

function getColor(type) {
    if (type === "DESIGN SYSTEM") {
        return "#40A737"
    }
    else if (type === "TYPOGRAPHY") {
        return "#18B0FF"
    }
    else if (type === "DEVELOPMENT") {
        return "#FF2473"
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}


bodys.forEach(el => {
    el.addEventListener('drop', drop)
    el.addEventListener('dragover', allowDrop)
})