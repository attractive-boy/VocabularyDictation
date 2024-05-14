// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const tencentcloud = require("tencentcloud-sdk-nodejs-ocr");
// 导入对应产品模块的client models。
const OcrClient = tencentcloud.ocr.v20181119.Client;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 从event对象中获取传递的参数
  const imageData = event.imageData;
  const clientConfig = {
    credential: {

    },
    region: "ap-shanghai",
    profile: {
      httpProfile: {
        endpoint: "ocr.tencentcloudapi.com",
      },
    },
  };
  
  // 实例化要请求产品的client对象,clientProfile是可选的
  const client = new OcrClient(clientConfig);
  const params = {
    "ImageBase64": imageData
  };

  try {
    // Perform OCR operation
    const data = await client.GeneralHandwritingOCR(params);
    console.log(data);
    
    return {
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
      result: data // Return the OCR result
    };
  } catch (err) {
    console.error("error", err);
    return {
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
      error: err // Return the error if any
    };
  }
}