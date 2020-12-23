import axios from 'axios'

export const getAllEntries = async (cols) => {
    const response = await axios.post(
        'http://127.0.0.1:5000/api/get_all_entries', 
        {
            'column_names': cols,
        }, 
        { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    )

    return response
}

export const getEntriesByParam = async (param) => {
    const response = await axios.post(
        'http://127.0.0.1:5000/api/get_entries_by_param',
        {
            'param': param,
        },
        { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    )

    return response
}

export const getBookInfoByISBN = async (ISBN) => {
    const response = await axios.post(
        'http://127.0.0.1:5000/api/get_book_info_by_ISBN',
        {
            'ISBN': ISBN,
        },
        { headers: { 'Content-Type': 'application/json'}},
        
    )

    return response
}

export const filter_books = async (filter_obj) => {
    const response = await axios.post(
        'http://127.0.0.1:5000/api/filter_books',
        JSON.stringify(filter_obj),
        { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    )

    return response
}
