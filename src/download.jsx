function downlaod(value, type = 'text/plain', name = 'Cypher') {
    try {
        const element = document.createElement("a");
        const file = new Blob([value], { type });
        element.href = URL.createObjectURL(file);
        const randomNum = Math.floor(Math.random() * 1000000);
        element.download = `Cypher${randomNum}.${type.split('/')[1]}`
        element.click();
    }
    catch (e) {
        alert('Some error occured');
    }
}

export default downlaod;