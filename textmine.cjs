// node textmine.cjs src
// node textmine.cjs src/router
// node textmine.cjs src/components

const fs = require('fs').promises;
const path = require('path');

const IGNORED_DIRS = ['node_modules', 'images', 'layout', 'mixins', 'vendor'];
const IGNORED_FILES = ['yarn.lock'];

function getTimestamp() {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

async function getAllFiles(dir) {
    let files = [];

    const entries = await fs.readdir(dir, {withFileTypes: true});

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (IGNORED_DIRS.includes(entry.name)) continue;

            const subFiles = await getAllFiles(fullPath);

            files = files.concat(subFiles);
        } else if (entry.isFile()) {
            if (IGNORED_FILES.includes(entry.name)) continue;

            files.push(fullPath);
        }
    }

    return files;
}

async function formatFilesContent(filePaths) {
    const sections = [];

    for (const filePath of filePaths) {
        try {
            const content = await fs.readFile(filePath, 'utf8');
            sections.push([
                '```',
                `// ${filePath}`,
                '',
                content.trim(),
                '```',
                '',
            ].join('\n'));
        } catch (err) {
            console.error(`Не удалось прочитать файл ${filePath}: ${err.message}`);
        }
    }

    return sections.join('\n');
}

(async () => {
    const inputPath = process.argv[2];
    const targetDir = inputPath
        ? path.resolve(process.cwd(), inputPath)
        : process.cwd();

    try {
        const stat = await fs.stat(targetDir);

        if (!stat.isDirectory()) {
            console.error(`Указанный путь не является директорией: ${targetDir}`);

            process.exit(1);
        }
    } catch (err) {
        console.error(`Директория не найдена: ${targetDir}`);

        process.exit(1);
    }

    console.log(`Обход директории: ${targetDir}`);

    const timestamp = getTimestamp();
    const outputFileName = `textmine_${timestamp}.txt`;

    try {
        const allFiles = await getAllFiles(targetDir);
        const outputContent = await formatFilesContent(allFiles);

        await fs.writeFile(outputFileName, outputContent, 'utf8');

        console.log(`Результат записан в ${outputFileName}`);
    } catch (err) {
        console.error(`Ошибка при обработке: ${err.message}`);
    }
})();
