import axios from 'axios'

const places = axios.create({
 baseURL:'https://servicodados.ibge.gov.br/api/v1/localidades'
})

export default places
