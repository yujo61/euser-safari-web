/* Build script: Combines euser-chat-styles.js + euser-chat.js into euser-chat.min.js */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'chat-widget');
const styles = fs.readFileSync(path.join(dir, 'euser-chat-styles.js'), 'utf8');
const logic = fs.readFileSync(path.join(dir, 'euser-chat.js'), 'utf8');

const banner = `/* EuserChat Widget v3.0 | (c) ${new Date().getFullYear()} Euser AI | euserai.com */\n`;
const bundle = banner + styles + '\n' + logic;

fs.writeFileSync(path.join(dir, 'euser-chat.min.js'), bundle, 'utf8');
console.log('Built: public/chat-widget/euser-chat.min.js (' + (bundle.length / 1024).toFixed(1) + ' KB)');
