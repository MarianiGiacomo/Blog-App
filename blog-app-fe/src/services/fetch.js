export const postReq = (url, data, authToken) => {
  return new Request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
			'Authorization': authToken
    })
  })
}

export const putReq = (url, data, authToken) => {
  return new Request(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
			'Authorization': authToken
    })
  })
}

export const deleteReq = (url, authToken) => {
  return new Request(url, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
			'Authorization': authToken
    })
  })
}

export const responseOrThrow = async (response) => {
  if (response.ok) {
		try {
			return await response.json()
		} catch (exception) {
			console.log('Exception handling response', exception)
			return response
		}
  } else {
    throw new Error(response.statusText)
  }
}