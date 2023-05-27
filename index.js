const fsAsync = require('fs/promises');
const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const execAsync = promisify(exec);

const projects = process.env.npm_config_path;

async function main() {
    const folders = await fsAsync.readdir(path.resolve(projects));

    for (const folder of folders) {
        const path = getPath(folder);
    
        await addIgnore(path);

        try {
            await addGit(path);
        } catch(err) {
            logError(err);
        }
    
    }
}

async function addGit(path) {
    const folder = path.split('/').pop();
    const cmd = sanitizeCmd(path);
    
    await execAsync(cmd('git init'));
    await execAsync(cmd('git add .'));
    await execAsync(cmd('git commit -m "initial commit"'));
    await execAsync(cmd(`gh repo create ${folder} --public --source=. --remote=upstream --push`));
}

function sanitizeCmd(path) {
    const cd = `cd ${path} &&`;

    return (cmd) => {
        return `${cd} ${cmd}`;
    };
}

function logError(err) {
    console.error(`got error: ${err}`);
}

async function addIgnore(path) {
    return fsAsync.writeFile(`${path}/.gitignore`, 'node_modules')
}

function getPath(name) {
    return path.join(projects, name);
}

main();
