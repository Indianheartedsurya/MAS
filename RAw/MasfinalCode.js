function doGet(e) {
    Logger.log(JSON.stringify(e));
    var result = 'Ok';
    if (e.parameter == 'undefined') {
        result = 'No Parameters';
    } else {
        var sheet_id = '1jOjHmCIweIY3JM9_g4C2Chzm6Gdm0I9xweRwkYEO6Uw'; // Spreadsheet ID
        var sheet = SpreadsheetApp.openById(sheet_id).getActiveSheet();

        var newRow = sheet.getLastRow() + 1;
        var rowData = [];

        var Curr_Date = new Date();
        var Curr_Day = Curr_Date.getDay();
        var Curr_Month = Curr_Date.getMonth();
        var Curr_YEAR = Curr_Date.getFullYear();
        var Curr_Time = Utilities.formatDate(Curr_Date, "Asia/Kolkata", 'HH:mm:ss');

        // Time range-------------------------------------------------------------------------
        var BREAKFAST = '07:30:00' <= Curr_Time & Curr_Time <= '09:30:00';
        var LUNCH = '12:30:00' <= Curr_Time & Curr_Time <= '14:30:00';
        var DINNER = '19:30:00' <= Curr_Time & Curr_Time <= '21:30:00';


        // Working day Mess Timing for 1&2yr student --------------------------------------------
        //breakfast
        var B_Time_1_2yr = '7:30:0' <= Curr_Time & Curr_Time <= '8:15:00';
        //Lunch
        var L_Time_1_2yr = '12:30:00' <= Curr_Time & Curr_Time <= '14:00:00';
        // Dinner
        var D_Time_1_2yr = '19:30:00' <= Curr_Time & Curr_Time <= '20:15:00';

        // Sat & Sun Mess Timing for 1&2yr student 
        //breakfast
        var B_HTime_1_2yr = '08:00:00' <= Curr_Time & Curr_Time <= '09:00:00';
        //Lunch
        var L_HTime_1_2yr = '12:30:00' <= Curr_Time & Curr_Time <= '13:15:00';
        // Dinner
        var D_HTime_1_2yr = '19:30:00' <= Curr_Time & Curr_Time <= '20:15:00';



        // Working day Mess Timing for others yr student ------------------------------------
        //breakfast
        var S_B_Time_othersyr = '8:15:00';
        var B_Time_othersyr = S_B_Time_othersyr <= Curr_Time & Curr_Time <= '9:00:00';
        //Lunch
        var S_L_Time_othersyr = '12:30:00';
        var L_Time_othersyr = S_L_Time_othersyr <= Curr_Time & Curr_Time <= '14:00:00';
        // Dinner
        var S_D_Time_othersyr = '20:15:00';
        var D_Time_othersyr = S_D_Time_othersyr <= Curr_Time & Curr_Time <= '21:00:00';

        // Sat & Sun Mess Timing for others yr student 
        //breakfast
        var S_B_HTime_othersyr = '8:30:00';
        var B_HTime_othersyr = S_B_HTime_othersyr <= Curr_Time & Curr_Time <= '9:30:00';
        //Lunch
        var S_L_HTime_othersyr = '13:15:00';
        var L_HTime_othersyr = S_L_HTime_othersyr <= Curr_Time & Curr_Time <= '14:00:00';
        // Dinner
        var S_D_HTime_othersyr = '08:15:00';
        var D_HTime_othersyr = S_D_HTime_othersyr <= Curr_Time & Curr_Time <= '09:00:00';





        //mainbody------------------------------------------------------------------------
        for (var param in e.parameter) {
            Logger.log('In for loop, param=' + param);
            var value = stripQuotes(e.parameter[param]);
            Logger.log(param + ':' + e.parameter[param]);
            switch (param) {
                case 'M':

                    N = value - 1;
                    var ColNum = (4 * N) + 2;


                    var Colrange = sheet.getRange(7, ColNum).getA1Notation();
                    var ColWord = Colrange[0]; //B,C..

                    var Colrange = ColWord + 1 + ':' + ColWord;

                    var lrow = sheet.getLastRow();
                    var Avals = sheet.getRange(Colrange + lrow).getValues();
                    var Alast = lrow - Avals.reverse().findIndex(c => c[0] != '');
                    var RowNum = Alast + 1;

                    var dateRange = sheet.getRange(RowNum, ColNum);
                    var timeRange = sheet.getRange(RowNum, ColNum + 1);
                    var attendanceRange = sheet.getRange(RowNum, ColNum + 2);
                    var entrystatusRange = sheet.getRange(RowNum, ColNum + 3);

                    //  Variable-----------------------------------------
                    var Stuyear;
                    var Stusem;
                    var Entrystatus;
                    var EmailQuotaRemaining;


                    // Starting batch year of student--------------
                    var Syrrange = sheet.getRange(5, ColNum + 1);
                    var Sbyear = Syrrange.getValue();
                    // End batch year of student--------------------
                    var Eyrrange = sheet.getRange(5, ColNum + 3);
                    var Ebyear = Eyrrange.getValue();
                    // current year diffrence --only for building logic---
                    var StuyearL = Curr_YEAR - Sbyear;

                    // Find current year of student----------------------------
                    if (Sbyear <= Curr_YEAR <= Ebyear) {
                        if (6 <= Curr_Month & Curr_Month <= 11 && StuyearL == 0) {
                            Stuyear = '1yr';
                            Stusem = '1';
                        } else if (0 <= Curr_Month & Curr_Month <= 5 && StuyearL == 1) {
                            Stuyear = '1yr';
                            Stusem = '2';
                        } else if (6 <= Curr_Month & Curr_Month <= 11 && StuyearL == 1) {
                            Stuyear = '2yr';
                            Stusem = '3';
                        } else if (0 <= Curr_Month & Curr_Month <= 5 && StuyearL == 2) {
                            Stuyear = '2yr';
                            Stusem = '4';
                        } else if (6 <= Curr_Month & Curr_Month <= 11 && StuyearL == 2) {
                            Stuyear = '3yr';
                            Stusem = '5';
                        } else if (0 <= Curr_Month & Curr_Month <= 5 && StuyearL == 3) {
                            Stuyear = '3yr';
                            Stusem = '6';
                        } else if (6 <= Curr_Month & Curr_Month <= 11 && StuyearL == 3) {
                            Stuyear = '4yr';
                            Stusem = '7';
                        } else if (0 <= Curr_Month & Curr_Month <= 5 && StuyearL == 4) {
                            Stuyear = '4yr';
                            Stusem = '8';
                        } else if (6 <= Curr_Month & Curr_Month <= 11 && StuyearL == 4) {
                            Stuyear = '4+yr';
                            Stusem = '9';
                        } else if (0 <= Curr_Month & Curr_Month <= 5 && StuyearL == 5) {
                            Stuyear = '4+yr';
                            Stusem = '10';
                        } else {
                            Stuyear = 'Course-compvare';
                        }
                    } else {
                        Stuyear = 'Pass/NotReg.';
                    }

                    var SemYr = Stusem + 'sem/' + Stuyear;

                    // Print student year in cell------------------------

                    sheet.getRange(5, ColNum).setValue(SemYr);

                    // MainCode---------------------------------------------------------------------------------------

                    if (Stuyear == '1yr' || Stuyear == '2yr') {
                        fyrattendance();
                    } else {
                        oyrattendance();
                    }
                    // Email code -------------------------------------------------------------------------------------


                    if (Entrystatus == 'OnTime') {
                        return 0;

                    } else {
                        var Emailrange = sheet.getRange(6, ColNum);
                        var EmailId = Emailrange.getValue();
                        EmailQuotaRemaining = MailApp.getRemainingDailyQuota();

                        if (Entrystatus == 'Before Time') {

                            MailApp.sendEmail(EmailId,
                                "Mess(Bh-3)-Early Entry!",
                                "You are early. Follow the Mess timing");

                        } else if (Entrystatus == 'Late') {
                            MailApp.sendEmail(EmailId,
                                "Mess(Bh-3)-Late Entry!!",
                                "Your are late. You are Charging with 100Rs fine. Kindly follow the Mess Timing.");

                        } else if (Entrystatus == '#Invalid') {
                            MailApp.sendEmail(EmailId,
                                "Mess(Bh-3)-Invalid Entry!! ",
                                "Invalid Entry!!");
                        }
                        if (EmailQuotaRemaining == 50) {
                            MailApp.sendEmail(EmailId,
                                "50% daily Email quata used",
                                "50 Email send successfully. 50 Email Remain");
                        } else if (EmailQuotaRemaining == 10) {
                            MailApp.sendEmail(EmailId,
                                "90% daily Email quata used",
                                "90 Email send successfully. 10 Email Remain");
                        }

                    }


                    //  Function------------------------------------------------------------
                    function fyrattendance() {
                        if (Curr_Day == 0 || Curr_Day == 6) {

                            if (BREAKFAST) {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                attendanceRange.setValue('B-P');


                                if (B_HTime_1_2yr) {
                                    entrystatusRange.setValue(Entrystatus = 'OnTime');
                                } else {
                                    entrystatusRange.setValue(Entrystatus = 'Late');
                                }
                            } else if (LUNCH) {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                attendanceRange.setValue('L-P');

                                if (L_HTime_1_2yr) {
                                    entrystatusRange.setValue(Entrystatus = 'OnTime');

                                } else {

                                    entrystatusRange.setValue(Entrystatus = 'Late');
                                }
                            } else if (DINNER) {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                attendanceRange.setValue('D-P');

                                if (D_HTime_1_2yr) {
                                    entrystatusRange.setValue(Entrystatus = 'OnTime');
                                } else {
                                    entrystatusRange.setValue(Entrystatus = 'Late');
                                }
                            } else {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                entrystatusRange.setValue(Entrystatus = '#invalid');
                            }

                        } else {

                            if (BREAKFAST) {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                attendanceRange.setValue('B-P');

                                if (B_Time_1_2yr) {
                                    entrystatusRange.setValue(Entrystatus = 'OnTime');
                                } else {
                                    entrystatusRange.setValue(Entrystatus = 'Late');
                                }
                            } else if (LUNCH) {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                attendanceRange.setValue('L-P');

                                if (L_Time_1_2yr) {
                                    entrystatusRange.setValue(Entrystatus = 'OnTime');
                                } else {
                                    entrystatusRange.setValue(Entrystatus = 'Late');
                                }
                            } else if (DINNER) {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                attendanceRange.setValue('D-P');

                                if (D_Time_1_2yr) {
                                    entrystatusRange.setValue(Entrystatus = 'OnTime');
                                } else {
                                    entrystatusRange.setValue(Entrystatus = 'Late');
                                }
                            } else {
                                dateRange.setValue(new Date());
                                // dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                entrystatusRange.setValue(Entrystatus = '#invalid');
                            }

                        }
                        // result = 'MessCode printed successfully ' + SemYr +' ' + Entrystatus +' '+ EmailQuotaRemaining;
                    }

                    function oyrattendance() {
                        if (Curr_Day == 0 || Curr_Day == 6) {

                            if (BREAKFAST) {

                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                attendanceRange.setValue('B-P');

                                if (B_HTime_othersyr) {
                                    entrystatusRange.setValue(Entrystatus = 'OnTime');
                                    'OnTime';
                                } else if (Curr_Time < S_B_HTime_othersyr) {
                                    entrystatusRange.setValue(Entrystatus = 'Before Time');
                                } else {
                                    entrystatusRange.setValue(Entrystatus = 'Late');
                                }
                            } else if (LUNCH) {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                attendanceRange.setValue('L-P');

                                if (L_HTime_othersyr) {
                                    entrystatusRange.setValue(Entrystatus = 'OnTime');
                                } else if (Curr_Time < S_L_HTime_othersyr) {
                                    entrystatusRange.setValue(Entrystatus = 'Before Time');
                                } else {
                                    entrystatusRange.setValue(Entrystatus = 'Late');
                                }
                            } else if (DINNER) {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                attendanceRange.setValue('D-P');

                                if (D_HTime_othersyr) {
                                    entrystatusRange.setValue(Entrystatus = 'OnTime');
                                } else if (Curr_Time < S_D_HTime_othersyr) {
                                    entrystatusRange.setValue(Entrystatus = 'Before');
                                } else {
                                    entrystatusRange.setValue(Entrystatus = 'Late');
                                }
                            } else {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                entrystatusRange.setValue(Entrystatus = '#invalid');
                            }

                        } else {

                            if (BREAKFAST) {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                attendanceRange.setValue('B-P');

                                if (B_Time_othersyr) {
                                    entrystatusRange.setValue(Entrystatus = 'OnTime');
                                } else if (Curr_Time < S_B_Time_othersyr) {
                                    entrystatusRange.setValue(Entrystatus = 'Before Time');
                                } else {
                                    entrystatusRange.setValue(Entrystatus = 'Late');
                                }
                            } else if (LUNCH) {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                attendanceRange.setValue('L-P');

                                if (L_Time_othersyr) {
                                    entrystatusRange.setValue(Entrystatus = 'OnTime');
                                } else if (Curr_Time < S_L_Time_othersyr) {
                                    entrystatusRange.setValue(Entrystatus = 'Before Time');
                                } else {
                                    entrystatusRange.setValue(Entrystatus = 'Late');
                                }
                            } else if (DINNER) {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                attendanceRange.setValue('D-P');

                                if (D_Time_othersyr) {
                                    entrystatusRange.setValue(Entrystatus = 'OnTime');
                                } else if (Curr_Time < S_D_Time_othersyr) {
                                    entrystatusRange.setValue(Entrystatus = 'Before Time');
                                } else {
                                    entrystatusRange.setValue(Entrystatus = 'Late');
                                }
                            } else {
                                dateRange.setValue(new Date());
                                timeRange.setValue(Curr_Time);
                                entrystatusRange.setValue(Entrystatus = '#invalid');
                            }

                        }



                    }
                    result = 'MessCode printed successfully ' + SemYr + ' ' + Entrystatus + ' ' + EmailQuotaRemaining + ' ' + ColWord;
                    break;
                default:
                    result = "unsupported parameter";
            }
        }

    }
    return ContentService.createTextOutput(result);
}

function stripQuotes(value) {
    return value.replace(/^["']|['"]$/g, "");
}