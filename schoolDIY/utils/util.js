const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 提示层
const msg = (str,callback,time) => {
  wx.showToast({
    title: str,
    icon: 'none'
  });
  let timeout = time || 0;
  callback && typeof callback === 'function' && setTimeout(() => {
    callback()
  }, timeout);
}

// 有成功打钩的提示层
const success = (str, callback, time) => {
  let title
  let timeout = time || 0;
  if (str) {
    title = str
  }
  wx.showToast({
    title: title || '成功',
    icon: 'success',
    mask: true
  })
  callback && typeof callback === 'function' && setTimeout(() => {
    callback()
  }, timeout);
}

// 警告层
const alert = (str, callback) => {
  wx.showModal({
    title: '提示',
    content: str,
    showCancel: false,
    confirmColor: '#ff3a51',
    success: function (res) {
      if (res.confirm) {
        callback && callback()
      }
    }
  })
}

// 询问层
const confirm = (str, callback) => {
  wx.showModal({
    title: '提示',
    content: str,
    confirmColor: '#ff3a51',
    success: function (res) {
      if (res.confirm) {
        callback && callback()
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  msg: msg,
  success: success,
  alert: alert,
  confirm: confirm
}