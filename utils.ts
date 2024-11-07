import * as fs from "fs"

const sendMessage = (message: string) => {
  fs.appendFile("messages.txt", `${message}\n`, (err) => {
    if (err) {
      console.error("Error writing to file:", err)
      return
    }
    console.log(`Message saved successfully: ${message}. See messages.txt for more information`)
  })
}

const copyFile = (src: string, dst: string) => {
  fs.copyFile(src, dst, (err) => {
    if (err) {
      console.error("Error copying file:", err)
      return
    } else {
      console.log(`File copied successfully from ${src} to ${dst}`)
    }
  })
}

const deleteFile = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error("Error deleting file:", err)
      return
    } else {
      console.log(`File deleted successfully: ${path}`)
    }
  })
}

const createFile = (path: string, data: string) => {
  fs.writeFile(path, data, (err) => {
    if (err) {
      console.error("Error creating file:", err)
      return
    } else {
      console.log(`File created successfully at ${path}`)
    }
  })
}

export {
  sendMessage,
  copyFile,
  deleteFile,
  createFile,
}