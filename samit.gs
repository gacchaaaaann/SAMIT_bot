function helloWorld(){
  Logger.log(getSheetInfos());
}

function getSheetInfos(range){  /* シートのデータを取ってくる */
  return SpreadsheetApp.getActiveSheet().getRange(range).getValues();
}

function postSlack(text){  /* Slackにデータ()を投げる httpリクエスト JSONリクエスト */
  const url = "https://hooks.slack.com/services/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";
  const options = {
    "method" : "POST",  /* httpリクエストメソッド */
    "headers" : { "Content-type" : "application/json" },  /* 送信するデータの形式をJSON指定 */
    "payload" : JSON.stringify({"text": text})
  };
  UrlFetchApp.fetch( url, options );
}

function test(){
  postSlack("これはテストです。");
}

function notifyMondaySchedule(){
  const classes = getSheetInfos("B2:B11");
  const mondaySchedule = listToStr(classes);  /* リストを文字列に変換 */
  postSlack(mondaySchedule);
}

function listToStr(strList){
  const strs = strList.reduce(  /* 高階関数 */
    function(previousValue, currentValue){  /* 無名関数 */
      return previousValue + "\n" + currentValue;
  });
  return strs;
}

function notifyTodaySchedule(){
  const weekDayList = [ "B","B","C","D","E","F","B" ];
  const dateObj = new Date();
  const label = weekDayList[dateObj.getDay()];
  const range = label + "2:" + label + "11";
  Logger.log(range);
  const classes = getSheetInfos(range);
  const todayScheduleStr = listToStr(classes);
  postSlack(todayScheduleStr);
}


function getDay(){  /* 使わないけど後学のために */
  const weekDayList = [
    "日",
    "月",
    "火",
    "水",
    "木",
    "金",
    "土"
  ];
  const dateObj = new Date();
  const weekDay = weekDayList[dateObj.getDay()];
  Logger.log(weekDay);
  return weekDay;
}
