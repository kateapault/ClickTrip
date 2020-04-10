import { htmlCollectionToArray } from './HelperMethods'

export function getFormData() {
    let data = {}
    let inputFields = htmlCollectionToArray(document.querySelectorAll('input'))
    inputFields.map(input => {
        data[`${input.getAttribute('name')}`] = input.value
    })
    return data
}