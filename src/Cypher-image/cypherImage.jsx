import getKey from "../generateKey";
import Download from "./../download";
function cypherImage() {

    function encrypt() {
        const password = document.getElementById('password').value;
        const image = document.getElementById('image').files[0];
        if (password === '' || image === undefined) {
            alert('Please enter the password and select the image to convert');
            return;
        }
        if (password.length < 5) {
            alert('Please enter a password of length greater than 5');
            return;
        }
        let base64String = "";
        const reader = new FileReader();
        reader.readAsDataURL(image);
        // convert image to base64 .
        reader.onload = function () {
            base64String = reader.result;
            // write this base 64 string to a file and download it
            const key = getKey(password);
            let result = '';
            for (let i = 0; i < base64String.length; i++) {
                let res = base64String.charCodeAt(i) ^ key;
                result += String.fromCharCode(res);
            }
            const name = image.name.split('.')[0] + '.txt';
            Download(result, 'text/txt', name);
        }
    }

    function decrypt() {
        const password = document.getElementById('password').value;
        const file = document.getElementById('file').files[0];
        if (password === '' || file === undefined) {
            alert('Please enter the password and select the file to convert');
            return;
        }
        if (password.length < 5) {
            alert('Please enter a password of length greater than 5');
            return;
        }
        // decrypt the file
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            const key = getKey(password);
            let result = '';
            for (let i = 0; i < reader.result.length; i++) {
                let res = reader.result.charCodeAt(i) ^ key;
                result += String.fromCharCode(res);
            }
            try {
                // check if decryption was sunccessful or not and thorw error.
                const c1 = result.split(':')[0];
                const c2 = result.split(':')[1].split(';')[1].split(',')[0];

                if (c1 == "data" && c2 == "base64") {
                    // convert base64 to it's file type
                    const arr = result.split(',');
                    let u8arr;
                    let bstr;
                    let n;
                    const mime = arr[0].match(/:(.*?);/)[1];
                    bstr = atob(arr[arr.length - 1]),
                        n = bstr.length,
                        u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    // save this image to a file and download it
                    Download(u8arr, mime);
                }
                else
                    alert('Wrong password or data corrupted');
            }
            catch (e) {
                alert('Wrong password or data corrupted');
            }
        }
    }

    return (
        <>
            <h1>Convert image to Encrypt blob file</h1>
            <div>
                <input type="file" id="image" accept="image/*" />
                <br />
                <button id='encrypt' onClick={encrypt}>encrypt</button>
            </div>
            <div>
                <h1>Convert Encrypted blob file to image</h1>
                <input type="file" id="file" accept=".txt" />
                <br />
                <button id="encrypt" onClick={decrypt}>decrypt</button>
            </div>
            <br />
            <input id="password" type="text" placeholder="Enter the Password" />
            <br />
        </>
    )

}

export default cypherImage;