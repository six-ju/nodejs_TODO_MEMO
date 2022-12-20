const mongoose = require("mongoose");

// localhost의 27017 포트 번호로 MongoDB와 연결합니다.
// Database Name은 todo-demo 입니다.

//7-12번째줄 app에서 불러오면 바로 실행되는 코드
mongoose.connect("mongodb://localhost:27017/todo-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(value => console.log("MongoDB 연결에 성공하였습니다."))
  .catch(reason => console.log("MongoDB 연결에 실패하였습니다."))


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

module.exports = db;