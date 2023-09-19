import "./Cypher.css"
import getKey from "../generateKey";
import Downlaod from "./../download";
function Cypher() {

    function helper() {
        const password = document.getElementById('password').value;
        const text = document.getElementById('text').value;
        if (password === '' || text.value === '') {
            alert('Please enter the password and text to convert');
            return;
        }
        if (password.length < 5) {
            alert('Please enter a password of length greater than 5');
            return;
        }
        const key = getKey(password);
        let result = '';
        for (let i = 0; i < text.length; i++) {
            let res = text.charCodeAt(i) ^ key;
            result += String.fromCharCode(res);
        }
        document.getElementById('result').value = result;
        alert('Your result is ready ');
    }
    function downlaod() {
        let value = document.getElementById('result').value;
        if (value === '') {
            alert('No text to download');
            return;
        }
        Downlaod(value);
    }
    return (
        <>
            <h1>Convert text to cypher or vice-versa</h1>
            <input id="password" type="text" placeholder="Enter the Password" />
            <br />
            <textarea id='text' placeholder="Enter the Cypher-text or plain text to convert"></textarea>
            <br />
            <div>
                <textarea readOnly={true} id='result' placeholder="Result"></textarea>
                <button id='copy' onClick={() => navigator.clipboard.writeText(document.getElementById('result').value)}>Copy</button>
                <button onClick={downlaod} >Download file</button>
            </div>
            <br />
            <button id='encrypt' onClick={helper}>Process</button>
        </>
    )
}


export default Cypher