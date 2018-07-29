export function formatDate(date) {
  var date = new Date(date)
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return year + '-' + month + '-' + day;
}

export function sortByCreateTime(a, b) { 
  return new Date(b.create_time) - new Date(a.create_time) //根据创建日期降序排序
}

export default {
  formatDate,
  sortByCreateTime
}
