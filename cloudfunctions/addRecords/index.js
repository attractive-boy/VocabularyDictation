// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const collection = db.collection('records')

  // 获取当前时间
  const currentTime = new Date()

  try {
    const result = await collection.add({
      data: {
        userId: wxContext.OPENID,
        timestamp: currentTime,
        listenwords: event.listenwords,
        startTime: event.startTime,
        endTime: event.endTime,
        accuracy: event.accuracy,
        completion: event.completion
      }
    })
    return {
      success: true,
      data: result
    }
  } catch (error) {
    return {
      success: false,
      error: error
    }
  }
}
