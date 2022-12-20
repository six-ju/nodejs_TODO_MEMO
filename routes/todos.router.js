const express = require("express");
const Todo = require("../models/todo");
const router = express.Router();


router.post("/todos", async (req, res) => {
  const { value } = req.body;
  const maxOrderByUserId = await Todo.findOne().sort("-order").exec();

  const order = maxOrderByUserId ? 
    maxOrderByUserId.order + 1 :    //maxOrderByUserId가 있을때
    1;  //maxOrderByUserId 가 없을때 
  const todo = new Todo({ value, order });
  await todo.save();
  res.send({ todo });
});
// 할일 목록 가져오기 API
router.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort("-order").exec();

  res.send({ todos });
});
// routes/todos.router.js
// 할일 순서 변경하는 API
router.patch("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const { order, value, done } = req.body;

  const currentTodo = await Todo.findById(todoId);
  if (!currentTodo) {
    throw new Error("존재하지 않는 todo 데이터입니다.");
  }

  if (order) {
    const targetTodo = await Todo.findOne({ order }).exec();
    if (targetTodo) {
      targetTodo.order = currentTodo.order;
      await targetTodo.save();
    }
    currentTodo.order = order;
  } else if (value) {   // 할 일 내용 수정 API
    currentTodo.value = value;
  } else if (done !== undefined) {  // 할일 체크박스 수정 API
    currentTodo.doneAt = done ? new Date() : null;
  }                     // 체크박스에 체크가 되면 
                        // doneAt에 날짜 입력 아니면 null입력

  await currentTodo.save();

  res.send({});
});
// 할일목록 삭제 API
router.delete("/todos/:todoId" ,async(req,res) =>{
  const { todoId } = req.params;

  const todo = await Todo.findById(todoId).exec();
  await todo.delete()

  res.send({});
})
// 할일 수정 API
router.patch("/todos/:todoId", async(req,res)=>{
  const{ value } = req.body;
  const { todoId } = req.params;

  const currentTodo = await Todo.findById(todoId).exec();
  if (value){
    currentTodo.value = value;
  }

await currentTodo.save();

res.send({});


})


router.get("/", (req, res) =>{
    res.send("Hi");
})

module.exports = router;