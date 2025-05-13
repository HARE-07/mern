function showMarksheet() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;

    if (name === "" || roll === "") {
        alert("Please enter your details first.");
        return;
    }

    document.getElementById("student-name").innerText = name;
    document.getElementById("student-roll").innerText = roll;
    
    document.getElementById("details-form").style.display = "none";
    document.getElementById("marksheet").style.display = "block";
}

function generateResult() {
    let math = parseFloat(document.getElementById("math").value) || 0;
    let science = parseFloat(document.getElementById("science").value) || 0;
    let english = parseFloat(document.getElementById("english").value) || 0;

    let total = math + science + english;
    let percentage = (total / 300) * 100;

    document.getElementById("total").innerText = total;
    document.getElementById("percentage").innerText = percentage.toFixed(2) + "%";
}