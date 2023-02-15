// Thanks chatGPT
// convert base64 image to file
export function convertBase64ToFile(base64Data, fileName) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    var byteString = atob(base64Data);

    // separate out the mime component
    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});

    // come up with a new name for the file
    var newFile = new File([blob], fileName, { type: mimeString });

    return newFile;
}

