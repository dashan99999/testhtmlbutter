import domToPng from 'dom-to-image';

function createUniqId() {
  return (
    (Math.ceil(Math.random() * 100000000) + 100000000 + new Date().getTime()).toString(32).toUpperCase().substring(3) +
    '-' +
    (Math.ceil(Math.random() * 100000000) + 100000000).toString(32).toUpperCase() +
    '-' +
    (Math.ceil(Math.random() * 100000000) + 100000000).toString(32).toUpperCase() +
    '-' +
    (Math.ceil(Math.random() * 100000000) + 100000000).toString(32).toUpperCase()
  );
}

export function saveImageFromDom(dom: HTMLElement, name = createUniqId()) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      domToPng.toPng(dom).then((res) => {
        const a = document.createElement('a');
        a.href = res;
        a.download = name;
        a.click();
        resolve();
      });
    });
  });
}

export function saveImageFromDomToBlob(dom: HTMLElement, name = createUniqId()) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      domToPng.toBlob(dom).then(function (blob) {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        const blobType = new Blob([blob], {
          type: 'image/png',
        });
        const url = window.URL.createObjectURL(blobType);
        a.href = url;
        a.download = name;
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // 释放url
        resolve();
      });
    });
  });
}

export function saveImageFromDomToJpeg(dom: HTMLElement, name = createUniqId()) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      domToPng.toJpeg(dom, { quality: 0.95 }).then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = name;
        link.href = dataUrl;
        link.click();
        resolve();
      });
    });
  });
}
