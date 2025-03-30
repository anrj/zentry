const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const psList = require("ps-list").default;
const { exec } = require("child_process");
const fs = require("fs");

let processes = [];
let blocked = { exes: [], windows: [] };

if (require("electron-squirrel-startup")) {
    app.quit();
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 520,
        resizable: false,
        autoHideMenuBar: true,
        backgroundColor: '#0e0e0e',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: path.join(__dirname, 'Assets/images/white-logo.png'),
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));
};

ipcMain.on("message-from-renderer", (event, data) => {
    blocked = data;
    createJSON()
});

ipcMain.on("sending-urls", (event, data) => {
    blocked.windows = data;
    createJSON()
});

app.whenReady().then(async () => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    try {
        processes = await psList();
    } catch (error) {
        console.error("Failed to get process list:", error);
    }

    setInterval(async () => {
        blockProcesses(blocked.exes);
    }, 1500);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

const blockProcesses = async (blocked) => {
    const processes = await psList();

    processes.forEach((process) => {
        if (blocked.includes(process.name)) {
            console.log(`Blocking: ${process.name}`);

            exec(`taskkill /PID ${process.pid} /F`, (err) => {
                if (err) {
                    console.error(`Error killing process: ${err}`);
                } else {
                    console.log(`Successfully blocked: ${process.name}`);
                }
            });
        }
    });
};

const createJSON = () => {
    fs.writeFileSync("../extension/urls.json", JSON.stringify({data: blocked.windows}, null, 2), "utf8");
}
