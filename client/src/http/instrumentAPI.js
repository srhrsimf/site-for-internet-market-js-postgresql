import {$authHost, $host} from "./index";

export const fetchCategories = async() => {
    const {data} = await $host.get('api/category')
    return data
}

export const fetchInstruments = async(categoryId, page, limit) => {
    const { data } = await $host.get('api/instrument', {
        // Axios автоматически отбросит параметры, которые равны null или undefined
        params: {
            categoryId,
            page,
            limit
        }
    });
    return data
}

export const fetchOneInstrument = async(id) => {
    const {data} = await $host.get('api/instrument/' + id)
    return data
}


export const createInstrument = async(instrument) => {
    const {data} = await $authHost.post('api/instrument', instrument)
    return data
}

export const createCategory = async(category) => {
    const {data} = await $authHost.post('api/category', category)
    return data
}

