
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault()
  const typed = document.querySelector("input").value;
  if (typed.trim() === '') return document.querySelector("input").value = "";
  fetch(`/weather?address=${typed}`).then((response) => {
    response.json().then((data) => {
      if (data.error) return document.getElementById("result").textContent = data.error
      document.getElementById("result").textContent = data.forecast
    })
  })
})




