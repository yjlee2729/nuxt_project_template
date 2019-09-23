const schedule = require('node-schedule');

/** crontab과 동일한 구조
 * RecurrenceRule properties
 * second (0-59)
 * minute (0-59)
 * hour (0-23)
 * date (1-31)
 * month (0-11)
 * year
 * dayOfWeek (0-6) Starting with Sunday
 * ----------------string rule------------------------
 *  *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    │
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)
 */
const batch = ()=>{
    let rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(4, 6)];
    rule.hour = 17;
    rule.minute = 0;
    
    let task = function(){
        console.log('Today is recognized by Rebecca Black!');
        }
    let j = schedule.scheduleJob(rule, task);
    // 위의 rule은 다음과 동일 : schedule.scheduleJob('0 17 ? * 0,4-6', task)
    //for cancel
    // j.cancel();
}

const startEndbatch = () =>{
    let startTime = new Date(Date.now() + 5000);
    let endTime = new Date(startTime.getTime() + 5000);
    // /1 -> 매 1분 마다
    var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
        console.log('Time for tea!');
    });
}


module.exports = {
    batch : batch
}