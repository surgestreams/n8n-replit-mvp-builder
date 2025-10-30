// *FULL Code Forge server.js* – Paste into GitHub → Import Replit → *MVP FACTORY LIVE!* 🚀
// Fixes applied: Replit /new/github/, Puppeteer Chromium, rate limits, error handling

import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import axios from 'axios';
import crypto from 'crypto';
import yaml from 'js-yaml';
import puppeteer from 'puppeteer'; // For /import auto-Replit

const {
  PORT = 8080,
  API_TOKEN,
  GITHUB_TOKEN,
  GITHUB_OWNER,
  DEFAULT_VISIBILITY = 'public',
  DEFAULT_BRANCH = 'main',
  REPLIT_USER,
  REPLIT_PASSWORD,
} = process.env;

if (!API_TOKEN || !GITHUB_TOKEN || !GITHUB_OWNER) {
  console.error('❌ Missing: API_TOKEN, GITHUB_TOKEN, GITHUB_OWNER');
  process.exit(1);
}

const app = express();
app.use(helmet());
app.use(express.json({ limit: '5mb' }));
app.use(morgan('combined'));

// *AUTH Middleware*
function auth(req, res, next)
