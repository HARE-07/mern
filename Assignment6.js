function generateResume() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let skills = document.getElementById("skills").value;

    if (name === "" || email === "" || phone === "" || skills === "") {
        alert("Please enter all details.");
        return;
    }

    document.getElementById("res-name").innerText = name;
    document.getElementById("res-email").innerText = email;
    document.getElementById("res-phone").innerText = phone;
    document.getElementById("res-skills").innerText = skills;

    document.getElementById("form-container").style.display = "none";
    document.getElementById("resume-container").style.display = "block";
}