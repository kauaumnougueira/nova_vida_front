const apiUrl = 'http://127.0.0.1:8000';

export default apiUrl

const getObjeto = async (nomeTabela = '', id = '') => {
  const token = localStorage.getItem('accessToken');

  const respostaObjeto = await fetch(`${apiUrl}/api/${nomeTabela}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

  return respostaObjeto
}

export { getObjeto }

const getAll = async (endpoint = '', encodedSearchTerm = '') => {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`${apiUrl}/api/${endpoint}?search=${encodedSearchTerm}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response
}

export { getAll }

const postObjeto = async (endpoint = '', objeto = {}) => {
  const token = localStorage.getItem('accessToken');

  const resposta = await fetch(`${apiUrl}/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(objeto),
  });

  return resposta
}

export { postObjeto }

const putObjeto = async (endpoint = '', objeto = {}, id = '') => {
  const token = localStorage.getItem('accessToken');

  const resposta= await fetch(`${apiUrl}/api/${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(objeto),
  });

  return resposta
}

export { putObjeto }