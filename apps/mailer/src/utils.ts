import express from "express";
import fsPromise from "fs/promises"

const FISSION_CONFIGS_BASE_PATH = "/configs/fission-default/mailer-configs"
const FISSION_SECRETS_BASE_PATH = "/secrets/fission-default/mailer-secrets"

// Context type for Fission serverless functions
// https://github.com/fission/environments/blob/c679ff68371ec779f87e855987157a52f05ea8dd/nodejs/server.js#L138-L142
export type FissionContext = {
    request: express.Request,
    response: express.Response
}

// Callback type for Fission serverless functions
// https://github.com/fission/environments/blob/c679ff68371ec779f87e855987157a52f05ea8dd/nodejs/server.js#L144-L152
export type FissionCallback = (status: number, body: any, headers?: Record<string, string>) => void

// Cache for storing configuration values
const configCache = new Map<string, string>();

export async function fissionGetConfig(name: string, useCache: boolean = true): Promise<string | null> {
    // Check environment variables first (highest priority, always fresh)
    if (process.env[name]) {
        return process.env[name]!;
    }

    // Check cache if enabled
    if (useCache && configCache.has(name)) {
        return configCache.get(name)!;
    }

    // Check if file exists
    try {
        await fsPromise.access(`${FISSION_CONFIGS_BASE_PATH}/${name}`);
    } catch (e) {
        return null;
    }

    // Read and cache the file content
    const content = await fsPromise.readFile(`${FISSION_CONFIGS_BASE_PATH}/${name}`, 'utf8');
    
    // Update cache
    if (useCache) {
        configCache.set(name, content);
    }
    
    return content;
}

// Cache for storing secret values
const secretCache = new Map<string, string>();

export async function fissionGetSecret(name: string, useCache: boolean = true): Promise<string | null> {
    // Check environment variables first (highest priority, always fresh)
    if (process.env[name]) {
        return process.env[name]!;
    }

    // Check cache if enabled
    if (useCache && secretCache.has(name)) {
        return secretCache.get(name)!;
    }

    // Check if file exists
    try {
        await fsPromise.access(`${FISSION_SECRETS_BASE_PATH}/${name}`);
    } catch (e) {
        return null;
    }

    // Read and cache the secret content
    const content = await fsPromise.readFile(`${FISSION_SECRETS_BASE_PATH}/${name}`, 'utf8');
    
    // Update cache
    if (useCache) {
        secretCache.set(name, content);
    }
    
    return content;
}
