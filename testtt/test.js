// import { timeStamp } from "console";



sentChat = [
  {
    message: "hi",
    timeStamp: new Date("11:59"),
  }, {
    message: "Hello",
    timeStamp: new Date("12:00"),
  }
]


receivedChat = [
  {
    message: "hi",
    timeStamp: new Date("2024-06-04T11:54:52.985Z").getTime(),
  }, {
    message: "Hello",
    timeStamp: new Date("2024-06-04T10:54:51.985Z").getTime(),
  }
]

console.log([...sentChat, ...receivedChat]);

combinedArray = [...sentChat, ...receivedChat].sort((a, b) => {
  console.log("a = ", a, "b = ", b);
  return a.timeStamp - b.timeStamp
})

console.log(combinedArray);