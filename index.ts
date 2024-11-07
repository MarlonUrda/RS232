import { SerialPort, ReadlineParser } from "serialport"
import { sendMessage, deleteFile, createFile, copyFile } from "./utils";

const port = new SerialPort({
  path: "COM1",
  baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

parser.on("data", (data: string) => {
  const command = data.trim()
  processCommand(command)
})

const processCommand = (command: string) => {
  if(command.startsWith("sms:")) {
    const message = command.slice(4)
    sendMessage(message)
  } else if (command.startsWith("copy:")) {
    const parts = command.slice(5).split(":")
    if(parts.length === 2){
      copyFile(parts[0], parts[1])
    }
  } else if (command.startsWith("delete:")){
    const path = command.slice(7)
    deleteFile(path)
  } else if (command.startsWith("create:")){
    const parts = command.slice(7).split(":")
    if(parts.length === 2){
      createFile(parts[0], parts[1])
    }
  } else {
    console.log("Invalid command")
  }
}