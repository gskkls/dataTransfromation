
exports.transformData = function (res, data) {
    try {
        if(data.payload != undefined && data.payload.value != undefined && data.referenceData != undefined  ){
            let finalResp= getTransformData(data.payload.value,  data.referenceData);
             data.payload.value=finalResp;
             return data.payload;
        }else{
            res.status(400).send("Please provide correct payload")
        }
        
    } catch (error) {
        console.log("Error in controller file", error)
        throw new Error(error.message)
    }
}

function getTransformData(payload, refData) {
    payload.forEach(val => {
        if ((val.valueType == 'string') && (val.value.includes('REF'))) {
            replaceRefValues(val, refData);
        } else if(val.value == 'object' || val.valueType =='array'){
            getTransformData(val.value, refData)
        }
    });
    return payload
}

function replaceRefValues(obj, refData) {
    let mainval = obj.value;
    let val = mainval.split('{').pop().split('}')[0];
    if (val in refData) {
        obj.value = obj.value.replace(`{${val}}`, refData[val])
    };
    return;
}