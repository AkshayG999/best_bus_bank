const autoNoServices = require("../services/autoNoForAllServices");
const accountRunningNumberServices = require("../services/accountRunningNoServices");

exports.createEntryNo = async (type,transaction) => {
    try {
        let entryNo = "";
        const autoNo = await autoNoServices.getOne({
            type: type,
            fYear: parseInt((new Date("2022-01-01").getFullYear()+1).toString().slice(2)),
        });
        if(autoNo===null){
            return null;
        } else{
            let autoID = parseInt(autoNo.autoId) + 1;
            await autoNoServices.updateByTypeAndFYear(type, autoNo.fYear, transaction, autoID);
            entryNo = `${autoNo.type}${autoNo.fYear}${pad(autoNo.cId,2)}-${pad(autoID,6)}`;
            return entryNo;
        }
    } catch (error) {
        throw error;
    }
}


exports.createTransNo = async (initNo,Branch_Tr,transaction) => {
    try {
        let transNo = "";
        const runningNo = await accountRunningNumberServices.getByBranchAndInit(initNo,Branch_Tr);
        if(runningNo===null){
            return null;
        }else{
            transNo = parseInt(runningNo.RunningNo) + 1;
            await accountRunningNumberServices.updateByBranchAndInit(initNo,Branch_Tr, transaction,transNo);
            transNo = parseInt(`${initNo}00000`)+transNo;
            return transNo;
        }
    } catch (error) {
        throw error;
    }
}

exports.accountInitNo = (type,payType) => {
    switch(type){
        case "PC":
            if(payType==1){
                return 1;
            }else if(payType==2){
                return 2;
            }
        case "CB":
            if(payType==1){
                return 3;
            }else if(payType==2){
                return 4;
            }
        case "BB":
            if(payType==1){
                return 5;
            }else if(payType==2){
                return 6;
            }
        case "JV":
            return 7;
        case "CE":
            return 8;
        default:
            return -1;
    }
};

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}
