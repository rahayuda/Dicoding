const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/sw.js');
    console.log('service worker registered');
  } else {
    console.log('Service worker not supported');
  }
};

export default swRegister;
