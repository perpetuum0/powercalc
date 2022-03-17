import fs from 'fs';
import path from 'path';

const getTimestamp = () => {
  let date = new Date();
  return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
};

const openLogs = () => {
  log(` --- Log Session started. --- `);
};

const closeLogs = () => {
  log(` --- Log Session ended. --- `);
};

const log = (data: string) => {
  fs.appendFile(
    path.join(__dirname, 'logs.txt'),
    `[${getTimestamp()}] ` + data + '\n',
    function (err) {
      if (err) console.error(err);
    }
  );
};

export { openLogs, closeLogs, log };
