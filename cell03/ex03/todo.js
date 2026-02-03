const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('newBtn');

window.onload = function() {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todos='));
    if (todoCookie) {
        const tasks = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
        tasks.reverse().forEach(task => addTaskToDOM(task));
    }
};

function saveToCookie() {
    const tasks = [];
    ftList.querySelectorAll('div').forEach(div => tasks.push(div.innerText));
    const d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(tasks)) + ";expires=" + d.toUTCString() + ";path=/";
}

function addTaskToDOM(text) {
    const div = document.createElement('div');
    div.innerText = text;
    
    div.onclick = function() {
        if (confirm("Do you really want to remove this TO DO?")) {
            div.remove();
            saveToCookie();
        }
    };
    
    ftList.prepend(div);
}

newBtn.onclick = function() {
    const task = prompt("Enter your new TO DO:");
    if (task && task.trim() !== "") {
        addTaskToDOM(task);
        saveToCookie();
    }
};