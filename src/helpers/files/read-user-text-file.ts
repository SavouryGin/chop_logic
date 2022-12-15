export function readUserTextFile(file: File): Promise<string | undefined> {
  const reader = new FileReader();
  reader.readAsText(file);

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Parsing file error.'));
    };

    reader.onload = () => {
      resolve(reader.result?.toString());
    };
  });
}
