const { createWorker } = Tesseract;

let worker = undefined;

const initWorker = () => {
  console.log("Initializing worker...");
  try {
    worker = createWorker({
      logger: m => progress(m)
    }); 
    console.log("Worker created successfully");
  } catch(e) {
    console.log(e);
  }
}

const runOCR = async () => {
  initWorker();
  (async () => {
    await worker.load();  
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data: { text } } = await worker.recognize(canvas);
    console.log(text);

    const link = document.getElementById("link");
    const go = document.getElementById("go");

    link.hidden = false;
    go.hidden = false;

    link.value = text;

  })();
}

