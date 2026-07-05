const fs = require('fs');
const path = require('path');
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.md')) results.push(file);
        }
    });
    return results;
}
const files = walk('docs');
files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    let nc = c.replace(/href=\"\/industrial-cg-platform-docs\//g, 'href=\"/');
    
    // Also fix the YAML error in the specific blog post
    if (f.includes('2026-06-29-code-quality-month.md')) {
        nc = nc.replace('代码质量与功能包加固行动”。 editLink: false', '代码质量与功能包加固行动”。\neditLink: false');
    }

    if (nc !== c) {
        fs.writeFileSync(f, nc, 'utf8');
        console.log('Fixed', f);
    }
});
