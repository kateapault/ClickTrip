export function jsonToArray (json) {
    let keys = Object.keys(json)
    let arr = keys.map(key => json[key])
    return arr
}

export function getCheckedRadioValue() {
    let radiosHTML = document.querySelectorAll('input[type="radio"]')
    let radios = []
    for (let i=0;i<radiosHTML.length;i++) {
        radios.push(radiosHTML[i])
    }
    let checked = radios.find(radio => radio.checked).value
    return JSON.parse(checked)
}