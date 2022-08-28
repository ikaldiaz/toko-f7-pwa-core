/**
 * Decode base64 image
 *.e.g. data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAAPAQMAAABeJUoFAAAABlBMVEX///8AAABVwtN+AAAAW0lEQVQImY2OMQrAMAwDjemgJ3jI0CFDntDBGKN3hby9bWi2UqrtkJAk8k/m5g4vGBCprKRxtzQR3mrMlm2CKpjIK0ZnKYiOjuUooS9ALpjV2AjiGY3Dw+Pj2gmnNxItbJdtpAAAAABJRU5ErkJggg==
 */
 function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    response.type = matches[1];
    // A little late. Works perfectly. 
    //Just change obsolete 'Buffer(matches[2],' to 'Buffer.from(matches[2],'
    // response.data = Buffer.from(matches[2], 'base64');
    response.data = Buffer.from(matches[2], 'base64');
    
    return response;
  }

  //=========================================================

  const readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader();
  
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
  
      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
  
    try {
      const fileContents = await readUploadedFileAsText(file)  
      console.log(fileContents);
    } catch (e) {
      console.warn(e.message)
    }
  }

//=======================================================
const readingFile = (inputFile) => {
    const temporaryFileReader = new FileReader();

    // fr.readAsDataURL(file);
    // fr.addEventListener('loadstart', changeStatus('Start Loading'));
    // fr.addEventListener('load', changeStatus('Loaded'));
    // fr.addEventListener('loadend', loaded);
    // fr.addEventListener('progress', setProgress);
    // fr.addEventListener('error', errorHandler);
    // fr.addEventListener('abort', changeStatus('Interrupted'));

    // abort
    // error
    // load
    // loadend
    // loadstart
    // progress
    const promises = new Promise((resolve, reject) => {
      temporaryFileReader.onerror = (e) => {
        console.log(e);
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      temporaryFileReader.progress = (e) => {
        const fr = e.target;
        const loadingPercentage = 100 * e.loaded / e.total;
        console.log(loadingPercentage);
        resolve(loadingPercentage);
      };
      // temporaryFileReader.readAsText(inputFile);
    }).then((result)=>{
      console.log(result);
      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);

    });
  
    return promises;
  };

  export const handleFile = async (event) => {
    const file = event.target.files[0];
  
    try {
      const fileContents = await readingFile(file)  
      console.log(fileContents);
    } catch (e) {
      console.warn(e.message)
    }
  }






  //====================================================================
  const changeStatus = (status) => {
    // document.getElementById('status').innerHTML = status;
    console.log(status);
  }

  const setProgress = (e) => {
    const fr = e.target;
    const loadingPercentage = 100 * e.loaded / e.total;

    // document.getElementById('progress-bar').value = loadingPercentage;
    console.log(loadingPercentage);
  }

  const loaded = (e) => {
    const fr = e.target;
    let result = fr.result;

    changeStatus('Finished Loading!');
    console.log('Result:', result);
  }

  const errorHandler = (e) => {
    changeStatus('Error: ' + e.target.error.name);
  }

  const processFile = (file) => {
    const fr = new FileReader();

    fr.readAsDataURL(file);
    fr.addEventListener('loadstart', changeStatus('Start Loading'));
    fr.addEventListener('load', changeStatus('Loaded'));
    fr.addEventListener('loadend', loaded);
    fr.addEventListener('progress', setProgress);
    fr.addEventListener('error', errorHandler);
    fr.addEventListener('abort', changeStatus('Interrupted'));
    
  }