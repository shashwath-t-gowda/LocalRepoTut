const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});

function sayHello(name = "stranger") {
    return `Hello, ${String(name)}!`;
}

function randomInt(min = 0, max = 100) {
    min = Math.ceil(Number(min));
    max = Math.floor(Number(max));
    if (!Number.isFinite(min) || !Number.isFinite(max) || min > max) {
        throw new Error("Invalid min/max for randomInt");
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function currentTime() {
    return new Date().toLocaleString();
}

function printHelp() {
    console.log("Commands:");
    console.log("  help                - show help");
    console.log("  hello <name>        - greet someone");
    console.log("  rand <min> <max>    - random integer between min and max");
    console.log("  time                - current local time");
    console.log("  exit / quit         - exit");
}

function handleLine(line) {
    const parts = line.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return;
    const [cmd, ...args] = parts;
    try {
        switch (cmd.toLowerCase()) {
            case "help":
                printHelp();
                break;
            case "hello":
                console.log(sayHello(args.join(" ") || undefined));
                break;
            case "rand": {
                const a = args[0] ?? "0";
                const b = args[1] ?? "100";
                console.log(randomInt(a, b));
                break;
            }
            case "time":
                console.log(currentTime());
                break;
            case "exit":
            case "quit":
                rl.close();
                break;
            default:
                console.log(`Unknown command: ${cmd}`);
                printHelp();
        }
    } catch (err) {
        console.error("Error:", err.message);
    }
}

console.log("Simple JS CLI — type 'help' for commands.");
rl.prompt();
rl.on("line", (line) => {
    handleLine(line);
    rl.prompt();
}).on("close", () => {
    console.log("Goodbye.");
    process.exit(0);
});