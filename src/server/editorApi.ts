/**
 * Vite Plugin for Editor API
 *
 * Provides API endpoints for:
 * - Reading and writing design tokens
 * - Saving generated components
 * - Project persistence
 */

import type { Plugin, ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs/promises';
import path from 'path';

// Token categories for organization
const TOKEN_CATEGORIES = {
  'color-primitives':
    /^--ink-(black|white|cobalt|neutral|red|green|orange|ecru|cyan|purple|fuchsia)-/,
  'semantic-colors': /^--ink-(bg|font|border|icon|status|message|bar)-/,
  'component-colors': /^--ink-(button|form|item|recipient|focus)-/,
  spacing: /^--ink-spacing-/,
  typography: /^--ink-(font-family|font-weight|font-size|line-height)/,
  radius: /^--ink-radius-/,
  shadow: /^--ink-(shadow|elevation)-/,
  animation: /^--ink-transition-/,
  'z-index': /^--ink-z-/,
};

// Parse tokens.css to JSON
function parseTokensCSS(css: string): Record<string, string> {
  const tokens: Record<string, string> = {};

  // Match CSS custom properties within :root block
  const rootMatch = css.match(/:root\s*\{([^}]+)\}/s);
  if (!rootMatch) return tokens;

  const rootContent = rootMatch[1];
  const regex = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let match;

  while ((match = regex.exec(rootContent)) !== null) {
    const name = match[1].trim();
    const value = match[2].trim();
    tokens[name] = value;
  }

  return tokens;
}

// Serialize tokens back to CSS (preserving structure)
function serializeTokensToCSS(tokens: Record<string, string>, originalCSS: string): string {
  let result = originalCSS;

  // Replace each token value in the original CSS
  for (const [name, value] of Object.entries(tokens)) {
    // Match the token definition and replace its value
    const regex = new RegExp(`(${escapeRegex(name)}\\s*:\\s*)([^;]+)(;)`, 'g');
    result = result.replace(regex, `$1${value}$3`);
  }

  return result;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Categorize tokens
function categorizeTokens(tokens: Record<string, string>): Record<string, Record<string, string>> {
  const categorized: Record<string, Record<string, string>> = {};

  for (const [name, value] of Object.entries(tokens)) {
    let category = 'other';

    for (const [cat, regex] of Object.entries(TOKEN_CATEGORIES)) {
      if (regex.test(name)) {
        category = cat;
        break;
      }
    }

    if (!categorized[category]) {
      categorized[category] = {};
    }
    categorized[category][name] = value;
  }

  return categorized;
}

// Helper to read request body
async function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

// Helper to send JSON response
function sendJSON(res: ServerResponse, data: unknown, status = 200): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

// Helper to send error response
function sendError(res: ServerResponse, message: string, status = 500): void {
  sendJSON(res, { success: false, error: message }, status);
}

// Create the Vite plugin
export function editorApiPlugin(): Plugin {
  let tokensPath: string;
  let projectsDir: string;
  let examplesDir: string;
  let feedbackPath: string;
  let originalTokensCSS: string = '';

  return {
    name: 'ink-editor-api',

    configResolved(config) {
      const root = config.root;
      tokensPath = path.resolve(root, 'src/design-system/1-tokens/tokens.css');
      projectsDir = path.resolve(root, 'src/editor-projects');
      examplesDir = path.resolve(root, 'src/examples');
      feedbackPath = path.resolve(root, 'src/lab/feedback.json');
    },

    configureServer(server: ViteDevServer) {
      // ========================================
      // POST /__submit-feedback - Submit iteration feedback
      // ========================================
      server.middlewares.use('/__submit-feedback', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next();
        }

        try {
          const body = await readBody(req);
          const feedback = JSON.parse(body);

          // Write feedback to file for Claude to read
          await fs.writeFile(feedbackPath, JSON.stringify(feedback, null, 2));

          console.log('\n📌 Feedback submitted for review:');
          console.log(`   Component: ${feedback.component}`);
          console.log(`   Pins: ${feedback.totalPins}`);
          feedback.feedback.forEach((f: { pin: number; category: string; content: string }) => {
            console.log(`   [${f.pin}] ${f.category}: ${f.content}`);
          });
          console.log('');

          sendJSON(res, { success: true });
        } catch (error) {
          console.error('Error saving feedback:', error);
          sendError(res, 'Failed to save feedback');
        }
      });
      // ========================================
      // GET /api/tokens - Read tokens
      // ========================================
      server.middlewares.use('/api/tokens', async (req, res, next) => {
        if (req.method !== 'GET') {
          return next();
        }

        try {
          const content = await fs.readFile(tokensPath, 'utf-8');
          originalTokensCSS = content; // Cache for later writes
          const tokens = parseTokensCSS(content);
          const categorized = categorizeTokens(tokens);

          sendJSON(res, {
            success: true,
            data: {
              tokens,
              categorized,
              categories: Object.keys(TOKEN_CATEGORIES),
            },
          });
        } catch (error) {
          console.error('Error reading tokens:', error);
          sendError(res, 'Failed to read tokens file');
        }
      });

      // ========================================
      // POST /api/tokens/save - Save tokens
      // ========================================
      server.middlewares.use('/api/tokens/save', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next();
        }

        try {
          const body = await readBody(req);
          const { tokens } = JSON.parse(body) as { tokens: Record<string, string> };

          if (!tokens || typeof tokens !== 'object') {
            return sendError(res, 'Invalid tokens data', 400);
          }

          // Read current file to preserve structure
          let currentCSS = originalTokensCSS;
          if (!currentCSS) {
            currentCSS = await fs.readFile(tokensPath, 'utf-8');
          }

          // Update tokens in CSS
          const updatedCSS = serializeTokensToCSS(tokens, currentCSS);
          await fs.writeFile(tokensPath, updatedCSS);
          originalTokensCSS = updatedCSS;

          sendJSON(res, { success: true });
        } catch (error) {
          console.error('Error saving tokens:', error);
          sendError(res, 'Failed to save tokens');
        }
      });

      // ========================================
      // POST /api/components/save - Save component
      // ========================================
      server.middlewares.use('/api/components/save', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next();
        }

        try {
          const body = await readBody(req);
          const { filename, code } = JSON.parse(body) as {
            filename: string;
            code: string;
          };

          if (!filename || !code) {
            return sendError(res, 'Missing filename or code', 400);
          }

          // Sanitize filename
          const safeName = filename.replace(/[^a-zA-Z0-9_-]/g, '');
          const filePath = path.resolve(examplesDir, `${safeName}.tsx`);

          await fs.writeFile(filePath, code);

          sendJSON(res, {
            success: true,
            data: { path: filePath, filename: `${safeName}.tsx` },
          });
        } catch (error) {
          console.error('Error saving component:', error);
          sendError(res, 'Failed to save component');
        }
      });

      // ========================================
      // GET /api/projects - List projects
      // ========================================
      server.middlewares.use('/api/projects', async (req, res, next) => {
        // Only handle exact path, not subpaths
        if (req.url !== '/api/projects' && req.url !== '/api/projects/') {
          return next();
        }

        if (req.method !== 'GET') {
          return next();
        }

        try {
          // Ensure projects directory exists
          await fs.mkdir(projectsDir, { recursive: true });

          const files = await fs.readdir(projectsDir);
          const projects = files
            .filter((f) => f.endsWith('.json'))
            .map((f) => {
              const name = f.replace('.json', '');
              return { id: name, name };
            });

          sendJSON(res, { success: true, data: projects });
        } catch (error) {
          console.error('Error listing projects:', error);
          sendError(res, 'Failed to list projects');
        }
      });

      // ========================================
      // GET/POST /api/projects/:id - Load/Save project
      // ========================================
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/api\/projects\/([^/?]+)/);
        if (!match) {
          return next();
        }

        const projectId = match[1];
        const safeName = projectId.replace(/[^a-zA-Z0-9_-]/g, '');
        const projectPath = path.resolve(projectsDir, `${safeName}.json`);

        try {
          if (req.method === 'GET') {
            // Load project
            try {
              const content = await fs.readFile(projectPath, 'utf-8');
              const data = JSON.parse(content);
              sendJSON(res, { success: true, data });
            } catch {
              // Project doesn't exist
              sendError(res, 'Project not found', 404);
            }
          } else if (req.method === 'POST') {
            // Save project
            const body = await readBody(req);
            const data = JSON.parse(body);

            // Ensure directory exists
            await fs.mkdir(projectsDir, { recursive: true });
            await fs.writeFile(projectPath, JSON.stringify(data, null, 2));

            sendJSON(res, { success: true, data: { id: safeName } });
          } else if (req.method === 'DELETE') {
            // Delete project
            try {
              await fs.unlink(projectPath);
              sendJSON(res, { success: true });
            } catch {
              sendError(res, 'Project not found', 404);
            }
          } else {
            next();
          }
        } catch (error) {
          console.error('Error handling project:', error);
          sendError(res, 'Failed to handle project request');
        }
      });
    },
  };
}

export default editorApiPlugin;
