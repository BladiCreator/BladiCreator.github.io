const signOffElement = document.querySelector("#sign-off-link");

signOffElement.addEventListener("click", () => {
  localStorage.removeItem("credential");
});
