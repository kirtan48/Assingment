const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const app = express();
const port = 8080;
const { loremIpsum } = require('lorem-ipsum');
const dataFolderPath = path.join(__dirname, 'tmp', 'data');
const numberOfFiles = 35;


async function generateData() {
    try {
        try {
            await fs.access(dataFolderPath);
        } catch (error) {
            await fs.mkdir(dataFolderPath, { recursive: true });
        }
        for (let i = 1; i <= numberOfFiles; i++) {
            const filePath = path.join(dataFolderPath, `${i}.txt`);
            const lines = [];
            const targetFileSize = 100 * 1024 * 1024; 
            let currentFileSize = 0;

            while (currentFileSize < targetFileSize) {
                const randomText = loremIpsum({ count: 1000, units: 'words' }); 
                lines.push(randomText);
                currentFileSize += Buffer.from(randomText + '\n').length;
            }

            const fileContent = lines.join('\n');
            await fs.writeFile(filePath, fileContent);
        }

        console.log(`Data files generated in ${dataFolderPath}`);
    } catch (error) {
        console.error('Error generating data:', error.message);
    }
}


generateData();
async function read_file_content(file_path, line_number) {
    try {
        const data = await fs.readFile(file_path, 'utf-8');
        const lines = data.split('\n');
        if (line_number <= lines.length) {
            return lines[line_number - 1].trim();
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}


app.get('/data', async (req, res) => {
    const n = req.query.n;
    const m = req.query.m;
    if (n && m) {
        try {
            const file_path = path.join(__dirname, 'tmp', 'data', `${n}.txt`);
            const content = await read_file_content(file_path, parseInt(m));
            if (content !== null) {
                res.send(content);
            } else {
                res.status(404).send('Line number does not exits in the FIle');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    else if (n) {
        try {
            const file_path = path.resolve(__dirname, 'tmp', 'data', `${n}.txt`);
            

            const data = await fs.readFile(file_path, 'utf-8');
            

            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Content-Length', Buffer.from(data).length);
            

            res.send(data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    } else {
        res.status(400).send('Invalid request, provide at least "n"(Page Number) parameter');
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

