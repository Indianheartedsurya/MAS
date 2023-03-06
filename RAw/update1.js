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
        let BREAKFAST = '07:30:00' <= Curr_Time <= '09:30:00';
        let LUNCH = '12:30:00' <= Curr_Time <= '14:30:00';
        let DINNER = '19:30:00' <= Curr_Time <= '21:30:00';


        // Working day Mess Timing for 1&2yr student --------------------------------------------
        //breakfast
        let B_Time_1_2yr = '7:30:0' <= Curr_Time <= '8:15:00';
        //Lunch
        let L_Time_1_2yr = '12:30:00' <= Curr_Time <= '14:00:00';
        // Dinner
        let D_Time_1_2yr = '19:30:00' <= Curr_Time <= '20:15:00';

        // Sat & Sun Mess Timing for 1&2yr student 
        //breakfast
        let B_HTime_1_2yr = '08:00:00' <= Curr_Time <= '09:00:00';
        //Lunch
        let L_HTime_1_2yr = '12:30:00' <= Curr_Time <= '13:15:00';
        // Dinner
        let D_HTime_1_2yr = '19:30:00' <= Curr_Time <= '20:15:00';



        // Working day Mess Timing for others yr student ------------------------------------
        //breakfast
        let B_Time_othersyr = '8:15:00' <= Curr_Time <= '9:00:00';
        //Lunch
        let L_Time_othersyr = '12:30:00' <= Curr_Time <= '14:00:00';
        // Dinner
        let D_Time_othersyr = '20:15:00' <= Curr_Time <= '21:00:00';

        // Sat & Sun Mess Timing for others yr student 
        //breakfast
        let B_HTime_othersyr = '8:30:00' <= Curr_Time <= '9:30:00';
        //Lunch
        let L_HTime_othersyr = '13:15:00' <= Curr_Time <= '14:00:00';
        // Dinner
        let D_HTime_othersyr = '08:15:00' <= Curr_Time <= '09:00:00';

        let range = sheet.getRange(4, 2);
        let data = range.getValue();

        //mainbody------------------------------------------------------------------------
        for (var param in e.parameter) {
            Logger.log('In for loop, param=' + param);
            var value = stripQuotes(e.parameter[param]);
            Logger.log(param + ':' + e.parameter[param]);
            switch (param) {
                case 'MessCode':

                    N = value - 1;
                    ROWO = (4 * N) + 1;
                    var YRCELLNO = ROWO + 1;

                    let Stuyear;
                    // Starting batch year of student--------------
                    let Syrrange = sheet.getRange(5, YRCELLNO + 1);
                    let Sbyear = Syrrange.getValue();
                    // End batch year of student--------------------
                    let Eyrrange = sheet.getRange(5, YRCELLNO + 3);
                    let Ebyear = Eyrrange.getValue();
                    // current year diffrence --only for building logic---
                    let StuyearL = Curr_YEAR - Sbyear;

                    // Find current year of student----------------------------
                    if (Sbyear <= Curr_YEAR <= Ebyear) {
                        if (6 <= Curr_Month & Curr_Month <= 11 && StuyearL == 0) {
                            Stuyear = '1yr';
                        } else if (0 <= Curr_Month & Curr_Month <= 5 && StuyearL == 1) {
                            Stuyear = '1yr';
                        } else if (6 <= Curr_Month & Curr_Month <= 11 && StuyearL == 1) {
                            Stuyear = '2yr';
                        } else if (0 <= Curr_Month & Curr_Month <= 5 && StuyearL == 2) {
                            Stuyear = '2yr';
                        } else if (6 <= Curr_Month & Curr_Month <= 11 && StuyearL == 2) {
                            Stuyear = '3yr';
                        } else if (0 <= Curr_Month & Curr_Month <= 5 && StuyearL == 3) {
                            Stuyear = '3yr';
                        } else if (6 <= Curr_Month & Curr_Month <= 11 && StuyearL == 3) {
                            Stuyear = '4yr';
                        } else if (0 <= Curr_Month & Curr_Month <= 5 && StuyearL == 4) {
                            Stuyear = '4yr';
                        } else if (6 <= Curr_Month & Curr_Month <= 11 && StuyearL == 4) {
                            Stuyear = '4+yr';
                        } else if (0 <= Curr_Month & Curr_Month <= 5 && StuyearL == 5) {
                            Stuyear = '4+yr';
                        } else {
                            Stuyear = 'Course-complete';
                        }
                    } else {
                        Stuyear = 'Pass/NotReg.';
                    }

                    // Print student year in cell------------------------
                    var Sturange = sheet.getRange(5, YRCELLNO);
                    Sturange.setValue(Stuyear);

                    // MainCode---------------------------------------------------------------------------------------

                    if (Stuyear == '1yr' || Stuyear == '2yr') {
                        fyrattendance();
                    } else {
                        oyrattendance();
                    }


                    //  Function------------------------------------------------------------
                    function fyrattendance() {
                        if (Curr_Day == 0 || Curr_Day == 6) {

                            if (BREAKFAST) {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 2] = 'B-P';

                                if (B_HTime_1_2yr) {
                                    rowData[ROWO + 3] = 'OnTime';
                                } else {
                                    rowData[ROWO + 3] = 'Late';
                                }
                            } else if (LUNCH) {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 2] = 'L-P';

                                if (L_HTime_1_2yr) {
                                    rowData[ROWO + 3] = 'OnTime';
                                } else {
                                    rowData[ROWO + 3] = 'Late';
                                }
                            } else if (DINNER) {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 2] = 'D-P';

                                if (D_HTime_1_2yr) {
                                    rowData[ROWO + 3] = 'OnTime';
                                } else {
                                    rowData[ROWO + 3] = 'Late';
                                }
                            } else {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 3] = '#Invalid';
                            }

                        } else {

                            if (BREAKFAST) {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 2] = 'B-P';

                                if (B_Time_1_2yr) {
                                    rowData[ROWO + 3] = 'OnTime';
                                } else {
                                    rowData[4] = 'Late';
                                }
                            } else if (LUNCH) {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 2] = 'L-P';

                                if (L_Time_1_2yr) {
                                    rowData[ROWO + 3] = 'OnTime';
                                } else {
                                    rowData[ROWO + 3] = 'Late';
                                }
                            } else if (DINNER) {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 2] = 'D-P';

                                if (D_Time_1_2yr) {
                                    rowData[ROWO + 3] = 'OnTime';
                                } else {
                                    rowData[ROWO + 3] = 'Late';
                                }
                            } else {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 3] = '#Invalid';
                            }

                        }
                        result = 'MessCode printed successfully ' + Stuyear;
                    }

                    function oyrattendance() {
                        if (Curr_Day == 0 || Curr_Day == 6) {

                            if (BREAKFAST) {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 2] = 'B-P';

                                if (B_HTime_othersyr) {
                                    rowData[ROWO + 3] = 'OnTime';
                                } else {
                                    rowData[ROWO + 3] = 'Late';
                                }
                            } else if (LUNCH) {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 2] = 'L-P';

                                if (L_HTime_othersyr) {
                                    rowData[ROWO + 3] = 'OnTime';
                                } else {
                                    rowData[ROWO + 3] = 'Late';
                                }
                            } else if (DINNER) {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 2] = 'D-P';

                                if (D_HTime_othersyr) {
                                    rowData[ROWO + 3] = 'OnTime';
                                } else {
                                    rowData[ROWO + 3] = 'Late';
                                }
                            } else {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 3] = '#Invalid';
                            }

                        } else {

                            if (BREAKFAST) {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 2] = 'B-P';

                                if (B_Time_othersyr) {
                                    rowData[ROWO + 3] = 'OnTime';
                                } else {
                                    rowData[ROWO + 3] = 'Late';
                                }
                            } else if (LUNCH) {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 2] = 'L-P';

                                if (L_Time_othersyr) {
                                    rowData[ROWO + 3] = 'OnTime';
                                } else {
                                    rowData[ROWO + 3] = 'Late';
                                }
                            } else if (DINNER) {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 2] = 'D-P';

                                if (D_Time_othersyr) {
                                    rowData[ROWO + 3] = 'OnTime';
                                } else {
                                    rowData[ROWO + 3] = 'Late';
                                }
                            } else {
                                rowData[ROWO] = new Date();
                                rowData[ROWO + 1] = Curr_Time;
                                rowData[ROWO + 3] = '#Invalid';
                            }

                        }
                        //  result = data;
                        result = 'MessCode printed successfully: Student current= ' + Stuyear;
                    }
                    break;
                default:
                    result = "unsupported parameter";
            }
        }
        Logger.log(JSON.stringify(rowData));
        var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
        newRange.setValues([rowData]);
    }
    return ContentService.createTextOutput(result);
}

function stripQuotes(value) {
    return value.replace(/^["']|['"]$/g, "");
}