// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    // 在 font-info 表中查询 word 字段等于 event.word 的记录
    const result = await db.collection('font-info')
      .where({
        word: event.word
      })
      .get()

    return result.data  // 返回查询结果
  } catch (err) {
    console.error(err)
    throw err
  }
}
