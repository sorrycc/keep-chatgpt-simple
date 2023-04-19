// ==UserScript==
// @name         Keep ChatGPT Simple
// @namespace    http://sorrycc.com/
// @version      0.1.0
// @description  try to take over the world!
// @author       sorrycc
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ai.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(() => {
  let apiUrl = '/api/auth/session';

  function getRandomNumber() {
    return Math.floor(Math.random() * 11) + 20;
  }

  async function keepChat() {
    const res = await fetch(apiUrl);
    const contentType = res.headers.get('Content-Type');
    const text = await res.text();
    const isJSON = contentType && contentType.includes('application/json');
    const is403 = res.status === 403;
    console.log('[Keep ChatGPT Simple] >', isJSON, is403, text);
    const isValid = isJSON && !is403 && text.includes('expires');
    if (!isValid) {
      throw new Error('Invalid response');
    }
  }

  function run() {
    keepChat().then(() => {
      const random = getRandomNumber();
      console.log('[Keep ChatGPT Simple] Next run in ' + random + ' seconds');
      setTimeout(run, random * 1000);
    }).catch(e => {
      console.error(e.message);
      alert(`Session 失效了，请手动刷新页面重试！`);
    });
  }

  run();
})();
