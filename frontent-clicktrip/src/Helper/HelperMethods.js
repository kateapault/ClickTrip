export function jsonToArray (json) {
    let keys = Object.keys(json)
    let arr = keys.map(key => json[key])
    return arr
}

export function htmlCollectionToArray(htmlColl) {
    let arr = []
    for (let i=0;i<htmlColl.length;i++) {
        arr.push(htmlColl[i])
    }
    return arr
}

export function getCheckedRadioValue() {
    let radiosHTML = document.querySelectorAll('input[type="radio"]')
    let radios = htmlCollectionToArray(radiosHTML)
    let checked = radios.find(radio => radio.checked).value
    return JSON.parse(checked)
}

export function getCheckedCheckboxValues() {
    let checkboxesHTML = document.querySelectorAll('input[type="checkbox"]')
    let checkboxes = htmlCollectionToArray(checkboxesHTML)
    let checked = checkboxes.filter(checkbox => checkbox.checked)
    let values = checked.map(checkbox => JSON.parse(checkbox.value))
    return values
}

export function getFormData() {
    let data = {}
    let inputFields = htmlCollectionToArray(document.querySelectorAll('input'))
    inputFields.map(input => {
        data[`${input.getAttribute('name')}`] = input.value
    })
    return data
}

export function setJSON(itemName,itemData) {
    window.sessionStorage.setItem(itemName,JSON.stringify(itemData))
    console.log(window.sessionStorage.getItem(itemName))
}

export function getJSON(itemName) {
    return JSON.parse(window.sessionStorage.getItem(itemName))
}

export function getEdit() {
    return window.sessionStorage.getItem('edit')
}

export function setEdit(edit) {
    window.sessionStorage.setItem('edit',edit)
}

export function editBool() {
    return !!parseInt(getEdit())
}