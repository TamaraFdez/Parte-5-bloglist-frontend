import axios from 'axios'


const baseUrl = '/api/blogs'

const instance = axios.create({
  baseURL: baseUrl,
})


let token = null


const setToken = (newToken) => {
  token = newToken
  instance.defaults.headers['Authorization'] = `Bearer ${token}`
}

// obtener todos los blogs
const getAll = async () => {
  const response = await instance.get('/')
  return response.data
}

// crear un nuevo blog
const create = async (newBlog) => {
  const response = await instance.post('/', newBlog)
  return response.data
}

// eliminar un blog
const remove = async (id) => {
  const response = await instance.delete(`/${id}`)
  return response.data
}


const update = async (id, updatedBlog) => {
  const response = await instance.put(`/${id}`, updatedBlog)
  return response.data
}

export default {
  getAll,
  create,
  remove,
  update,
  setToken, 
}
