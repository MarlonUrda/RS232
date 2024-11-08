const SerialPort = require("serialport").SerialPort;

const portName = process.argv[2];

if (!portName) {
  console.log("Por favor ingrese el nombre del puerto serial");
  process.exit(1);
}

const port = new SerialPort({
  path: portName,
  baudRate: 9600,
});

/**
 * @param {string} command
 */
const sendCommand = (command) => {
  port.write(command + "\r\n", (err) => {
    if (err) {
      return console.log("Error al enviar comando:", err.message);
    }
    console.log("Comando enviado:", command);
  });
};

const allowedCommand = ["sms", "copy", "delete", "create"];

const command = process.argv[3];
const argNumber = {
  sms: 1,
  copy: 2,
  delete: 1,
  create: 2,
};

if (!allowedCommand.includes(command)) {
  console.log("Comando no permitido");
  process.exit(1);
}

if (process.argv.length !== argNumber[command] + 4) {
  console.log("Número de argumentos incorrecto");
  process.exit(1);
}

port.on("open", () => {
  console.log("Puerto serial abierto");

  const args = process.argv.slice(4);
  sendCommand(`${command}:${args.join(":")}`);
});
