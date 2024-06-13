import axios from "axios"

const baseUrl = import.meta.env.VITE_BASE_URL

export const getMethod = async (url, token) => {
    let result = {}
    await axios
        .get(baseUrl + url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}

export const postMethod = async (url, data, token) => {
    let result = {}
    await axios
        .post(baseUrl + url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}

export const putMethod = async (url, data, token) => {
    let result = {}
    await axios
        .put(baseUrl + url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}

export const deleteMethod = async (url, token) => {
    let result = {}
    await axios
        .delete(baseUrl + url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}

export const postMethodMultipart = async (url, data, token) => {
    let result = {}
    await axios
        .post(baseUrl + url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}

export const putMethodMultipart = async (url, data, token) => {
    let result = {}
    await axios
        .put(baseUrl + url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}
