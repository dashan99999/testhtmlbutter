const fs = require('fs');
const path = require('path');
const os = require('os');
const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (err) {
    /* istanbul ignore next */
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
};
const cachePath = function () {
  const npmCachePath =
    process.env.npm_config_cache /* istanbul ignore next */ ||
    (process.env.APPDATA ? path.join(process.env.APPDATA, 'npm-cache') : path.join(os.homedir(), '.npm'));
  return npmCachePath;
};
function copyFile(sourcePath, destinationPath) {
  fs.readFile(sourcePath, (err, data) => {
    if (err) throw err;
    fs.writeFile(destinationPath, data, (err) => {
      if (err) throw err;
    });
  });
}
// const filename = ['libvips-8.14.5-win32-x64.tar.br', 'libvips-8.14.5-linuxmusl-x64.tar.br'];
// filename.forEach((f) => {
//   copyFile(path.resolve(__dirname, `./resource/${f}`), path.resolve(cachePath(), f));
// });
mkdirSync(path.resolve(cachePath(), './resource'));
copyFile(path.resolve(process.cwd(), `./resource/du.zip`), path.resolve(cachePath(), './resource/du.zip'));
