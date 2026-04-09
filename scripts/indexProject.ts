import fs from 'node:fs/promises';
import path from 'node:path';

type ProjectIndex = {
  generatedAt: string;
  pages: string[];
  apiRoutes: string[];
  scripts: string[];
};

async function walk(dir: string, matcher: (filePath: string) => boolean, base = dir): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walk(fullPath, matcher, base)));
      continue;
    }
    if (matcher(fullPath)) {
      results.push(path.relative(base, fullPath).replace(/\\/g, '/'));
    }
  }
  return results;
}

async function main() {
  const root = process.cwd();
  const appDir = path.join(root, 'app');
  const scriptsDir = path.join(root, 'scripts');
  const exportDir = path.join(root, 'data', 'exports');

  const pageFiles = await walk(appDir, (file) => /page\.tsx$/.test(file));
  const routeFiles = await walk(appDir, (file) => /route\.ts$/.test(file));
  const scriptFiles = await walk(scriptsDir, (file) => /\.(ts|js)$/.test(file));

  const index: ProjectIndex = {
    generatedAt: new Date().toISOString(),
    pages: pageFiles.sort(),
    apiRoutes: routeFiles.sort(),
    scripts: scriptFiles.sort(),
  };

  await fs.mkdir(exportDir, { recursive: true });
  const target = path.join(exportDir, 'project-index.json');
  await fs.writeFile(target, JSON.stringify(index, null, 2), 'utf8');
  console.log(`Wrote project index to ${target}`);
  console.log(`Pages: ${index.pages.length}, API routes: ${index.apiRoutes.length}, Scripts: ${index.scripts.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

