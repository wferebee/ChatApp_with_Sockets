function getCookie() {
  console.log(document.cookie)
  var bearer = 'Bearer ' + document.cookie;
  fetch('/', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    .then(window.location.href = "/")
    .catch(err => {
      console.log(err)
    })
}