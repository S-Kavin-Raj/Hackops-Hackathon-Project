var overlay = document.querySelector(".overlay");
var background = document.querySelector(".overlay-background");
var addButton = document.querySelector(".new-button");
var cancelButton = document.querySelector("#cancel-button");
var saveButton = document.querySelector(".save-button");
var barsContainer = document.getElementById("bars");

addButton.addEventListener("click", function () {
    overlay.style.display = "block";
    background.style.display = "block";
});

cancelButton.addEventListener("click", function () {
    overlay.style.display = "none";
    background.style.display = "none";
});

saveButton.addEventListener("click", function () {
    var titleValue = document.getElementById("note-title").value;
    var paragraphValue = document.getElementById("note-content").value;
    var div = document.createElement("div");
    div.setAttribute("class", "bar");
    div.innerHTML = `
        <h1 class="title">${titleValue}</h1>
        <p class="paragraph">${paragraphValue}</p>
        <button class="delete">Delete</button>
    `;

    div.querySelector(".delete").addEventListener("click", function () {
        div.remove();
    });

    barsContainer.appendChild(div);

    overlay.style.display = "none";
    background.style.display = "none";
    document.getElementById("note-title").value = "";
    document.getElementById("note-content").value = "";
});
document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            btn.closest('.bar').remove();
        });
    });
});