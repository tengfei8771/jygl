/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function parseTime1(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str.substr(0, time_str.length - 3)
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else { len += 0.5 }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function CapitalChinese(data) {
  const Unit = ["拾", "佰", "仟", "万", "亿", "圆", "角", "分"];
  const map = new Map([
    ["0", "零"],
    ["1", "壹"],
    ["2", "贰"],
    ["3", "叁"],
    ["4", "肆"],
    ["5", "伍"],
    ["6", "陆"],
    ["7", "柒"],
    ["8", "捌"],
    ["9", "玖"]
  ]);
  let ChineseStr = "";
  let val = data.toString();
  let arr = [...val];
  let PointIndex = arr.findIndex((value, index, arr) => {
    return value === ".";
  });
  let intNum = 0;
  let PointNum = "0";
  if (PointIndex === -1) {
    intNum = val;
  } else {
    intNum = val.substring(0, PointIndex);
    PointNum = val.substring(PointIndex + 1, val.length);
    //console.log(intNum);
    //console.log(PointNum);
  }
  let Strlen = intNum.length;
  if (Strlen < 6) {
    for (let i = 0; i < Strlen; i++) {
      if (ChineseStr[ChineseStr.length - 1] == "零" && intNum[i] == "0") {
        continue;
      }
      ChineseStr += map.get(intNum[i]);
      if (Strlen - 2 - i >= 0) {
        if (intNum[i] != "0") {
          ChineseStr += Unit[Strlen - 2 - i];
        }
      }
    }
    if (ChineseStr.endsWith("零")) {
      ChineseStr = ChineseStr.substring(0, ChineseStr.length - 1);
    }
  }
  if (Strlen >= 6) {
    let str1 = intNum.substring(0, intNum.length - 4);
    let str2 = intNum.substring(intNum.length - 4, intNum.length);
    let heightStr = "";
    let lowStr = "";
    for (let i = 0; i < str1.length; i++) {
      heightStr += map.get(str1[i]);
      if (str1.length - i - 2 >= 0) {
        if (str1[i] != "0") {
          heightStr += Unit[str1.length - 2 - i];
        }
      }
    }
    if (heightStr.endsWith("零")) {
      heightStr = heightStr.substring(0, heightStr.length - 1);
    }
    if (heightStr.endsWith("拾")||str2.startsWith("0")) {
      heightStr += "万零";
    } else {
      heightStr += "万";
    }
    //console.log(str2);
    for (let i = 0; i < str2.length; i++) {
      if (lowStr[ChineseStr.length - 1] == "零" && str2[i] == "0") {
        continue;
      }
      lowStr += map.get(str2[i]);
      if (str2.length - 2 - i >= 0) {
        if (str2[i] != "0") {
          lowStr += Unit[str2.length - 2 - i];
        }
      }
      // if (str2[i] == "0" && i < str2.length - 1) {
      //   if (str2[i + 1] == "0") {
      //     continue;
      //   }
      // } else {
      //   lowStr += map.get(str2[i]);
      //   if (str2.length- 2 - i >= 0) {
      //     if (str2[i] != "0") {
      //       lowStr += Unit[str2.length - 2 - i];
      //     }
      //   }
      // }
    }
    console.log(lowStr + "qqqq");
    if (lowStr.endsWith("零")) {
      lowStr = lowStr.substring(0, lowStr.length - 1);
    }
    if (lowStr.startsWith("零")) {
      lowStr = lowStr.substring(1, lowStr.length);
    }
    ChineseStr = heightStr + lowStr;
    //console.log(ChineseStr);
  }
  if (PointNum != "0") {
    let pointStr = "";

    PointNum = PointNum.substring(0, 2);
    //console.log(PointNum);
    for (let i = 0; i < PointNum.length; i++) {
      if (PointNum[i] != "0") {
        pointStr += map.get(PointNum[i]) + Unit[6 + i];
      } else {
        continue;
      }
    }
    //console.log(pointStr);
    if (
      ChineseStr.endsWith("万") ||
      ChineseStr.endsWith("仟") ||
      ChineseStr.endsWith("佰")
    ) {
      ChineseStr += "圆零" + pointStr;
    } else {
      ChineseStr += "圆" + pointStr;
    }
  } else {
    ChineseStr += "圆整";
  }
  return ChineseStr;
}
