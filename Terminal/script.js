const inputField = document.getElementById('userInput');
inputField.focus();

inputField.addEventListener('blur', () => setTimeout(() => inputField.focus(), 0));

inputField.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') checkInput();
});

const fileMap = {
  'testimg.jpg': '/old-newTimes/Terminal/content/img/testimg.jpg',
};

async function inetGet(fileName, filePath, mimeType = 'application/octet-stream') {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error('ERROR_NETWORK');
    const content = await response.blob();
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('ERROR_FETCHING_OBJECT:', error);
  }
}

function openFile(filePath) {
  window.open(filePath, '_blank');
}

function checkInput() {
  const userInput = inputField.value.trim().toLowerCase();
  const output = document.getElementById('outputText');

  switch (userInput) {
    case 'help':
      output.innerHTML = 'Available commands: about terminal, inetget, open, showcontent';
      break;
    case 'about terminal':
      output.innerHTML = 'Terminal ver. 0.1; written with CSS/HTML/JS';
      break;
    case 'showcontent':
      output.innerHTML = Object.entries(fileMap).map(([fileName, filePath]) => `${fileName} - path:[${filePath}]<br>`).join('');
      break;
    default:
      if (userInput.startsWith('inetget ')) {
        const fileName = userInput.split(' ')[1];
        const filePath = fileMap[fileName];
        if (filePath) inetGet(fileName, filePath);
        else output.innerHTML = 'Bash: file not found';
      } else if (userInput.startsWith('open ')) {
        const fileName = userInput.split(' ')[1];
        const filePath = fileMap[fileName];
        if (filePath) openFile(filePath);
        else output.innerHTML = 'Bash: file not found';
      } else {
        output.innerHTML = 'Bash: command not found';
      }
  }

  inputField.value = '';
}
