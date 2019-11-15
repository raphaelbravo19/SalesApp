export async function requestPost(path, data) {
  //alert(JSON.stringify(data));
  return fetch('https://emiliaapp-8b756.firebaseio.com' + path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function requestGet(path) {
  //alert(path);
  return fetch('https://emiliaapp-8b756.firebaseio.com' + path).then(function(
    response
  ) {
    return response.json();
  });
}
