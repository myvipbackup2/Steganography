// 引入sjcl加密库
const sjcl = require('./sjcl');

// 初始化
window.onload = function () {
  // 注册图片输入事件
  let input = document.getElementById('file');
  input.addEventListener('change', importImage);

  // 注册加密事件
  let encodeButton = document.getElementById('encode');
  encodeButton.addEventListener('click', encode);

  // 注册解密事件
  let decodeButton = document.getElementById('decode');
  decodeButton.addEventListener('click', decode);
};

// 限制文本大小
const maxMessageSize = Infinity;

// 把图片放入canvas画布
const importImage = function (e) {

  const reader = new FileReader();

  reader.onload = function ({ target }) {

    // 图片预览
    document.getElementById('preview').style.display = 'block';
    document.getElementById('preview').src = target.result;

    // 清空所有输入
    document.getElementById('message').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password2').value = '';
    document.getElementById('messageDecoded').innerHTML = '';

    // 把图片信息读取到canvas
    const img = new Image();
    img.onload = function () {
      let ctx = document.getElementById('canvas').getContext('2d');
      ctx.canvas.width = img.width;
      ctx.canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      decode();
    };
    img.src = target.result;
  };

  reader.readAsDataURL(e.target.files[0]);
};

// 编码图像并保存
let encode = function () {
  let message = document.getElementById('message').value;
  let password = document.getElementById('password').value;
  let output = document.getElementById('output');
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  // 如果有密码则加密信息
  if (password.length > 0) {
    message = sjcl.encrypt(password, message);
  } else {
    message = JSON.stringify({ 'text': message });
  }

  // 如果加密信息后图像过大则终止
  let pixelCount = ctx.canvas.width * ctx.canvas.height;
  if ((message.length + 1) * 16 > pixelCount * 4 * 0.75) {
    alert('加密后图像过大！');
    return;
  }

  // 如果加密信息超过最大限制则终止
  if (message.length > maxMessageSize) {
    alert('Message is too big.');
    return;
  }

  // 用输入的密码加密信息
  let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  encodeMessage(imgData.data, sjcl.hash.sha256.hash(password), message);
  ctx.putImageData(imgData, 0, 0);

  output.src = canvas.toDataURL();

  // 加密成功
  alert('信息加密成功！右键另存为加密后的图像');

};

// 如果有信息的话解密信息并展示
let decode = function () {
  let password = document.getElementById('password2').value;
  let passwordFail = '密码不正确或没有加密的信息';

  // 用提供的密码解码消息
  let ctx = document.getElementById('canvas').getContext('2d');
  let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  let message = decodeMessage(imgData.data, sjcl.hash.sha256.hash(password));

  // try to parse the JSON
  let obj = null;
  try {
    obj = JSON.parse(message);
  } catch (e) {

    // display the "choose" view
    document.getElementById('choose').style.display = 'block';
    document.getElementById('reveal').style.display = 'none';

    if (password.length > 0) {
      alert(passwordFail);
    }
  }

  // 显示解密按钮
  if (obj) {
    document.getElementById('choose').style.display = 'none';
    document.getElementById('reveal').style.display = 'block';

    // 必要时解密
    if (obj.ct) {
      try {
        obj.text = sjcl.decrypt(password, message);
      } catch (e) {
        alert(passwordFail);
      }
    }

    // 转义特殊字符
    const escChars = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#x2F;',
      '\n': '<br/>'
    };
    let escHtml = function (string) {
      return String(string).replace(/[&<>"'\/\n]/g, function (c) {
        return escChars[c];
      });
    };
    document.getElementById('messageDecoded').innerHTML = escHtml(obj.text);
  }
};

// 返回位置中的二进制 0或1
const getBit = function (number, location) {
  return ((number >> location) & 1);
};

// 设置位置中的二进制 0或1
const setBit = function (number, location, bit) {
  return (number & ~(1 << location)) | (bit << location);
};

// 为一个2个字节的数字返回一个1和0的数组
const getBitsFromNumber = function (number) {
  let bits = [];
  for (let i = 0; i < 16; i++) {
    bits.push(getBit(number, i));
  }
  return bits;
};

// 返回下一个2个字节的数字
const getNumberFromBits = function (bytes, history, hash) {
  let number = 0, pos = 0;
  while (pos < 16) {
    let loc = getNextLocation(history, hash, bytes.length);
    let bit = getBit(bytes[loc], 0);
    number = setBit(number, pos, bit);
    pos++;
  }
  return number;
};

// 为需要加密的信息返回一个1和0的数组
const getMessageBits = function (message) {
  let messageBits = [];
  for (let i = 0; i < message.length; i++) {
    let code = message.charCodeAt(i);
    messageBits = messageBits.concat(getBitsFromNumber(code));
  }
  return messageBits;
};

// 获取下一个位置以存储一个bit
const getNextLocation = function (history, hash, total) {
  let pos = history.length;
  let loc = Math.abs(hash[pos % hash.length] * (pos + 1)) % total;
  while (true) {
    if (loc >= total) {
      loc = 0;
    } else if (history.indexOf(loc) >= 0) {
      loc++;
    } else if ((loc + 1) % 4 === 0) {
      loc++;
    } else {
      history.push(loc);
      return loc;
    }
  }
};

/**
 * 接受要隐藏的数据以及隐藏的颜色通道，然后对原图进行操作，修改图片该通道分量的最低位，如果有文字信息，则最低位置为1，否则为0。
 * 从最文章开头的结论知道，RGB的三个通道可以分别隐藏不同信息。
 */
const encodeMessage = function (colors, hash, message) {
  // 根据信息创建二进制信息
  let messageBits = getBitsFromNumber(message.length);
  messageBits = messageBits.concat(getMessageBits(message));

  // 存储我们已经修改的颜色值
  let history = [];

  // 将这些bit编码成像素
  let pos = 0;
  while (pos < messageBits.length) {
    // set the next color value to the next bit
    let loc = getNextLocation(history, hash, colors.length);
    colors[loc] = setBit(colors[loc], 0, messageBits[pos]);

    // 将此像素中的Alpha值设置为255, 因为浏览器会预乘alpha
    // example: http://stackoverflow.com/q/4309364
    while ((loc + 1) % 4 !== 0) {
      loc++;
    }
    colors[loc] = 255;

    pos++;
  }
};

// 返回在 CanvasPixel Array 'colors' 中编码的消息
const decodeMessage = function (colors, hash) {
  // 存储我们已经读取的颜色值
  let history = [];

  // 获取消息大小
  let messageSize = getNumberFromBits(colors, history, hash);

  if ((messageSize + 1) * 16 > colors.length * 0.75) {
    return '';
  }

  if (messageSize === 0 || messageSize > maxMessageSize) {
    return '';
  }

  // 把每个字符放入一个数组中
  let message = [];
  for (let i = 0; i < messageSize; i++) {
    let code = getNumberFromBits(colors, history, hash);
    message.push(String.fromCharCode(code));
  }

  return message.join('');
};