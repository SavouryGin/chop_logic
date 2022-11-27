// Function to download data to a file
export function createAndSaveFile(data: string, filename: string, type = 'text/xml') {
  const file = new Blob([data], { type: type });
  const nav = window.navigator as any;

  if (nav.msSaveOrOpenBlob) {
    // IE10+
    nav.msSaveOrOpenBlob(file, filename);
  } else {
    // Others
    console.log('Save', nav);
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);

    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
