const form = document.getElementById("formContact");
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputComments = document.getElementById("comments");

window.onload = function () {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const { value: name } = inputName;
    const { value: email } = inputEmail;
    const { value: comments } = inputComments;

    if (!name) {
      alert("Por favor escriba su nombre!");
      return inputName.focus();
    }
    if (!email) {
      alert("Por favor escriba su correo electronico!");
      return inputEmail.focus();
    }
    if (!comments) {
      alert("Por favor escriba el motivo de su mensaje!");
      return inputComments.focus();
    }

    console.log("[DEBUG] entries:", name, email, comments);

    axios
      .post(
        "/process/contact",
        { name, email, comments },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(({ data }) => {
        // TODO: if status is OK erase form if not show of message
        console.log("[DEBUG] Result:", data);
      });
  });
};
