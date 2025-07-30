let tasks = [];

const addtask = () => {
    const input = document.getElementById("input-box");
    const text = input.value.trim();

    if (text !== "") {
        tasks.push({ text: text, completed: false });
        input.value = "";
        update();
    }
};

function update() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");


        const radio = document.createElement("input");
        radio.type = "radio";
        radio.checked = task.completed;
        radio.addEventListener("change", () => {
            tasks[index].completed = radio.checked;
            update();
        });

    
        const span = document.createElement("span");
        span.textContent = task.text;
        span.style.flex = "1";
        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        }

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.style.margin = "0 5px";
        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit task:", task.text);
            if (newText !== null && newText.trim() !== "") {
                tasks[index].text = newText.trim();
                update();
            }
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            update();
        });

        li.appendChild(radio);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateProgress();
}

function updateProgress() {
    const completedCount = tasks.filter(task => task.completed).length;
    const total = tasks.length;

    document.getElementById("numbers").textContent = `${completedCount} / ${total}`;

    const progressBar = document.getElementById("progress");
    const percentage = total === 0 ? 0 : (completedCount / total) * 100;
    progressBar.style.width = `${percentage}%`;
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        addtask();
    });
});
