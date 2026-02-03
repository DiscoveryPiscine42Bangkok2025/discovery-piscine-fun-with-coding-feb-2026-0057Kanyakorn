$(document).ready(function() {
    const $ftList = $('#ft_list');
    const $newBtn = $('#newBtn');

    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.trim().startsWith('todos='));
    if (todoCookie) {
        try {
            const tasks = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
            tasks.reverse().forEach(task => addTaskToDOM(task));
        } catch (e) {
            console.error("Cookie parsing error", e);
        }
    }

    function saveToCookie() {
        const tasks = [];
        $ftList.find('div').each(function() {
            tasks.push($(this).text());
        });
        
        const d = new Date();
        d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = "todos=" + encodeURIComponent(JSON.stringify(tasks)) + 
                          ";expires=" + d.toUTCString() + ";path=/";
    }

    function addTaskToDOM(text) {
        const $div = $('<div>').text(text);
        
        $div.click(function() {
            if (confirm("Do you really want to remove this TO DO?")) {
                $(this).remove(); 
                saveToCookie();
            }
        });
        
        $ftList.prepend($div);
    }

    $newBtn.click(function() {
        const task = prompt("Enter your new TO DO:");
        if (task && task.trim() !== "") {
            addTaskToDOM(task);
            saveToCookie();
        }
    });
});