// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const collection = db.collection('records')

  // 获取当前时间和当前月份的起始和结束时间
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

  try {
    // 查询当前用户在当前月份的数据
    const result = await collection.where({
      userId: wxContext.OPENID,
      timestamp: _.gte(startOfMonth).and(_.lte(endOfMonth))
    }).get()

    // 按日期的日进行分组 listenwords 和其他数据
    const recordsByDay = {}
    result.data.forEach(record => {
      // 只保留日期的日
      const day = new Date(record.timestamp).getDate()
      if (!recordsByDay[day]) {
        recordsByDay[day] = []
      }
      recordsByDay[day].push({
        listenwords: record.listenwords,
        startTime: record.startTime,
        endTime: record.endTime,
        accuracy: record.accuracy,
        completion: record.completion
      })
    })

    // 获取有数据的天数
    const daysWithData = Object.keys(recordsByDay).map(Number)

    return {
      success: true,
      recordsByDay,
      daysWithData
    }
  } catch (error) {
    return {
      success: false,
      error: error
    }
  }
}
