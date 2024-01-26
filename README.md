# HTTP Server with File Content Retrieval

## Overview

This repository contains an HTTP server implemented using Express.js, designed to respond to GET requests on the `/data` endpoint. The server accepts query parameters `n` and `m`, allowing users to retrieve file content. The script `index.js` generates 35 data files, each approximately 100MB in size, filled with random text content.

## Usage

To retrieve file content, make a GET request to the `/data` endpoint with the following query parameters:

- `n`: File number (required)
- `m`: Line number (optional)

If both `n` and `m` are provided, the server returns the content of the specified file at the specified line number. If only `n` is provided, the entire content of the specified file is returned. The server also implements error handling for cases such as non-existent line numbers or file read errors.

## Optimizations

### Caching for Improved Performance

To enhance the server's responsiveness, caching mechanisms have been implemented. This stores frequently accessed file content, reducing the need for repeated file reads and significantly improving overall performance.

### Parallel File Reads for Efficiency

Consider parallelizing file reads, especially for requests requiring the entire file content. This optimization can boost performance by efficiently handling multiple concurrent requests simultaneously.

### Efficient Response Streaming

For large files, the server optimizes by streaming responses instead of buffering the entire content in memory. This not only enhances memory efficiency but also ensures a more responsive experience for users.
