function helloWorld(){
  Logger.log(getSheetInfos());
}

function getSheetInfos(range){  /* �V�[�g�̃f�[�^������Ă��� */
  return SpreadsheetApp.getActiveSheet().getRange(range).getValues();
}

function postSlack(text){  /* Slack�Ƀf�[�^()�𓊂��� http���N�G�X�g JSON���N�G�X�g */
  const url = "https://hooks.slack.com/services/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";
  const options = {
    "method" : "POST",  /* http���N�G�X�g���\�b�h */
    "headers" : { "Content-type" : "application/json" },  /* ���M����f�[�^�̌`����JSON�w�� */
    "payload" : JSON.stringify({"text": text})
  };
  UrlFetchApp.fetch( url, options );
}

function test(){
  postSlack("����̓e�X�g�ł��B");
}

function notifyMondaySchedule(){
  const classes = getSheetInfos("B2:B11");
  const mondaySchedule = listToStr(classes);  /* ���X�g�𕶎���ɕϊ� */
  postSlack(mondaySchedule);
}

function listToStr(strList){
  const strs = strList.reduce(  /* ���K�֐� */
    function(previousValue, currentValue){  /* �����֐� */
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


function getDay(){  /* �g��Ȃ����ǌ�w�̂��߂� */
  const weekDayList = [
    "��",
    "��",
    "��",
    "��",
    "��",
    "��",
    "�y"
  ];
  const dateObj = new Date();
  const weekDay = weekDayList[dateObj.getDay()];
  Logger.log(weekDay);
  return weekDay;
}
