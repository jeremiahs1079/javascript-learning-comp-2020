const taskOne = document.getElementById('task-1');

taskOne.style.backgroundColor = 'black';
taskOne.style.color = 'white';

const head = document.querySelector('head');
const title = head.querySelector('title');
const h1 = document.querySelector('h1');

head.title = 'Assignment - Solved!';

console.log(head.title);

title.innerText = 'Assignment - Solved!';
h1.innerText = title.innerText;
