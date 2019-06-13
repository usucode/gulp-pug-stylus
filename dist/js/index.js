const box = document.querySelector(".box")

box.addEventListener("click", event => {
  box.innerHTML = `Click count: ${event.detail}`
})

document.write("hello world")
