const sayHello = (greeting = 'Hello', name) => {return`${greeting}, ${name}`};


console.log(sayHello(undefined, 'Jeremiah'));


const checkInput = (cb, ...strings) => {

  for(s in strings) {
    if(s) {
      return;
    }
  }

  cb();
}

checkInput(() => {console.log('No Empties')}, 'a', '', 'c');