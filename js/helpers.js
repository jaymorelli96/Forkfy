import { TIMEOUT_SEC } from './config'

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  



export const getJSON = async function(url) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        //Throw a error in case of a failure
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        //Temp error handling
        throw err;
    }
}