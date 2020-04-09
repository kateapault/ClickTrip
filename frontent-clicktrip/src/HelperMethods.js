export function jsonToArray (json) {
    let keys = Object.keys(json)
    let arr = keys.map(key => json[key])
    return arr
}

function htmlCollectionToArray(htmlColl) {
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