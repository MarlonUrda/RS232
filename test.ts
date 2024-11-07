import { SerialPort } from "serialport";

const port = new SerialPort({
  path: "COM1",
  baudRate: 9600,
});

const sendCommand = (command: string) => {
  port.write(command + "\r\n", (err) => {
    if (err) {
      return console.log("Error al enviar comando:", err.message);
    }
    console.log("Comando enviado:", command);
  });
};

port.on("open", () => {
  console.log("Puerto serial abierto");

  // Enviar comandos de prueba
  sendCommand("sms:Hello, World!");
  // sendCommand("copy:source.txt:destination.txt");
  // sendCommand("del:file.txt");
  // sendCommand("create:newfile.txt:Hello, this is a test.");
});

port.on("data", (data: Buffer) => {
  console.log("Respuesta recibida:", data.toString());
});

port.on("error", (err) => {
  console.log("Error:", err.message);
});