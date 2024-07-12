const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const xlsx = require('xlsx');
const os = require('os');
const lark = require('@larksuiteoapi/node-sdk');
const cwd = process.cwd();
const FILE_TOKEN = 'OB6isDeqshRGGNtTdCJuCtHcszb';

const I18NXLSXPATH = path.resolve(
  process.env.npm_config_cache /* istanbul ignore next */ ||
    (process.env.APPDATA ? path.join(process.env.APPDATA, 'npm-cache') : path.join(os.homedir(), '.npm')),
  './i18n.xlsx',
);
const getCryptValue = (str) => {
  const cipher = crypto.createDecipher('aes-256-cbc', process.env.npm_config_encrypt_key);
  const buffer = Buffer.concat([cipher.update(Buffer.from(str, 'hex')), cipher.final()]);
  return buffer.toString();
};
const client = new lark.Client({
  appId: getCryptValue(process.env.npm_config_encrypt_id),
  appSecret: getCryptValue(process.env.npm_config_encrypt_sec),
});
const config = (() => {
  const args = process.argv;
  const config = {};
  for (const item of args) {
    if (/^[\w\d\W]+=[\w\W\d]+$/.test(item)) {
      const [key, value] = item.split('=');
      config[key] = value;
    }
  }
  return config;
})();

function mkdirDeepSync(dirPath) {
  if (fs.existsSync(dirPath)) {
    return true;
  } else {
    if (mkdirDeepSync(path.dirname(dirPath))) {
      fs.mkdirSync(dirPath);
      return true;
    }
  }
}
const LOCALPATH = path.resolve(cwd, config.output);

function createTreeLocale(outputPath, localeObject) {
  const data = {};
  for (const locale in localeObject) {
    const target = localeObject[locale];
    if (!data[locale]) {
      data[locale] = {};
    }
    const obj = data[locale];
    for (const mkey in target) {
      const [namespace, ...rest] = mkey.split('.');
      if (!obj[namespace]) {
        obj[namespace] = {};
      }
      obj[namespace][rest.join('.')] = target[mkey];
    }
  }
  for (const locale in data) {
    const dir = path.resolve(outputPath, locale.toLocaleLowerCase());
    fs.mkdirSync(dir);
    const a = data[locale];
    for (const namespace in a) {
      const filePath = path.resolve(dir, `${namespace}.json`);
      fs.writeFileSync(
        filePath,
        JSON.stringify(a[namespace], (k, v) => v, 2),
      );
    }
  }
}

function createNormalLocale(outputPath, localeObject) {
  for (const locale in localeObject) {
    const filePath = path.resolve(outputPath, `${locale}.json`);
    fs.writeFileSync(
      filePath,
      JSON.stringify(localeObject[locale], (k, v) => v, 2),
    );
  }
}

async function buildLocales() {
  try {
    console.log('start create locales');
    const workbook = xlsx.readFile(I18NXLSXPATH);
    const sheelts = Object.keys(workbook.Sheets);
    clearFolder(LOCALPATH);
    if (!fs.existsSync(LOCALPATH)) {
      mkdirDeepSync(LOCALPATH);
    }
    for (const sheeltKey of sheelts) {
      const type = sheeltKey.toLocaleLowerCase();
      if (type !== config.type) {
        continue;
      }
      const sheelt = workbook.Sheets[sheeltKey];
      const json = xlsx.utils.sheet_to_json(sheelt);
      const localeObject = {};
      for (const item of json) {
        const messageKey = item.key;
        for (const key of Object.keys(item)) {
          const result = key.match(/(?<=\[).+(?=\])/);
          if (result?.length) {
            const localeKey = result[0];
            if (!localeObject[localeKey]) {
              localeObject[localeKey] = {
                [messageKey]: item[key],
              };
            } else {
              localeObject[localeKey][messageKey] = item[key];
            }
          }
        }
      }
      console.log('create locale:', type);
      if (config.stragery === 'tree') {
        createTreeLocale(LOCALPATH, localeObject);
      } else {
        createNormalLocale(LOCALPATH, localeObject);
      }
      console.log(`build ${type} success`);
    }
    console.log('build finished');
  } catch (e) {
    throw e;
  }
}

const getExortToken = (ticket) => {
  let timer = null;
  return new Promise((resolve, reject) => {
    const fn = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(async () => {
        try {
          const tenantToken = await client.tokenManager.getTenantAccessToken();
          const res = await client.drive.exportTask.get(
            {
              params: { token: FILE_TOKEN },
              path: { ticket },
            },
            lark.withTenantToken(tenantToken),
          );
          if (res.data.result.file_token) {
            resolve(res.data.result.file_token);
          } else {
            fn();
          }
        } catch (e) {
          reject(e);
        }
      }, 1000);
    };
    fn();
  });
};
const startExportTask = async () => {
  try {
    const tenantToken = await client.tokenManager.getTenantAccessToken();
    const {
      data: { ticket },
    } = await client.drive.exportTask.create(
      {
        data: {
          file_extension: 'xlsx',
          type: 'sheet',
          token: FILE_TOKEN,
        },
      },
      lark.withTenantToken(tenantToken),
    );
    console.log('create export task:', ticket);
    const file_token = await getExortToken(ticket);
    console.log('start download file:', file_token);
    const res = await client.drive.exportTask.download({ path: { file_token } });
    const result = await res.writeFile(I18NXLSXPATH);
    console.log('download success:', result);
    return result;
  } catch (e) {
    throw e;
  }
};

const clearFolder = (fpath) => {
  if (fs.existsSync(fpath)) {
    const stats = fs.statSync(fpath);
    if (stats.isDirectory()) {
      const dirs = fs.readdirSync(fpath);
      for (const f of dirs) {
        const fp = path.resolve(fpath, f);
        clearFolder(fp);
      }
      fs.rmdirSync(fpath);
    } else {
      fs.unlinkSync(fpath);
    }
  }
};

const startInstall = async () => {
  await startExportTask();
  await buildLocales();
};
startInstall();
