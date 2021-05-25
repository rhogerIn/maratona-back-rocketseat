module.exports = {
    remainingDays(job) {
       const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed(); // toFixed() Arredondar número quebrados ( Ele transforma automaticamente em STRING)
               
       const createdDate = new Date(job.created_at);
       const dueDay = createdDate.getDate() + Number(remainingDays);
       const dueDateInMs = createdDate.setDate(dueDay);
       const timeDiffInMs = dueDateInMs - Date.now(); 
       //Transformando milisegundos em dias.
       const daysInMs = 1000 * 60 * 60 * 24;
       
       // Função Math.floor permite um arredondamento descrecente.
       const dayDiff = Math.ceil(timeDiffInMs / daysInMs);
       return dayDiff;
       },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
   }