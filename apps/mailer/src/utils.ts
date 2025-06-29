import express from "express";

// Context type for Fission serverless functions
// https://github.com/fission/environments/blob/c679ff68371ec779f87e855987157a52f05ea8dd/nodejs/server.js#L138-L142
export type FissionContext = {
    request: express.Request,
    response: express.Response
}

// Callback type for Fission serverless functions
// https://github.com/fission/environments/blob/c679ff68371ec779f87e855987157a52f05ea8dd/nodejs/server.js#L144-L152
export type FissionCallback = (status: number, body: any, headers?: Record<string, string>) => void