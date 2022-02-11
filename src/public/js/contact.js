const form = document.getElementById("formContact");
const inputToken = document.getElementsByClassName("token");
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputComments = document.getElementById("comments");
const inputPhone = document.getElementById("phone");
const canva = document.getElementsByClassName("contactForm");

window.onload = function () {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const { value: name } = inputName;
    const { value: email } = inputEmail;
    const { value: comments } = inputComments;
    const { value: phone } = inputPhone;
    const { value: csrf } = inputToken;

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

    axios
      .post(
        "/process/contact",
        { name, email, comments, phone },
        {
          headers: {
            "CSRF-Token": csrf,
            "Content-Type": "application/json",
          },
        }
      )
      .then(({ data }) => {
        console.log("[DEBUG] Result:", data);

        if (data.status) {
          canva[0].innerHTML =
            "<p>&nbsp;</p><h2><strong>¡Muchas gracias!</strong></h2> <h3><span class='text-primary'>Nos pondremos en contacto a la brevedad.</span></h3><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>";
        } else {
          canva[0].innerHTML =
            "<p>&nbsp;</p><h3 class='text-danger'><strong>¡Ups! :(</strong></h3> <h5><span class='text-secondary'>Algo salio mal intentalo más tarde.</span></h5><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>";
        }
      })
      .catch((err) => {
        console.error("[Browser][Error] when send data:", err.message);
        console.error("[Browser][Error] Data:", name, email, phone, comments);

        canva[0].innerHTML =
          "<p>&nbsp;</p><h3 class='text-danger'><strong>¡Ups! :(</strong></h3> <h5><span class='text-secondary'>Algo salio mal intentalo más tarde.</span></h5><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>";
      });
  });
};
