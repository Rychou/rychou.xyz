export function formatDate(date){
    var date=new Date(date)
    var year = date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    return year+'-'+month+'-'+day;
}

export default{
    formatDate
}