# Sentry <> YouTrack Integration/Bridge

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)


A Node.js application that integrates Sentry with YouTrack, allowing Sentry issues and alerts to be automatically created and updated in YouTrack.

*Brought to you by [IT-Hock](https://github.com/IT-Hock)*

## :warning: **Attention** :warning:
This project is in early development and may not be fully functional. Use at your own risk.
We suggest to **NOT** use this in production. *There be dragons.*

## Features

*Please see the [Issues](https://github.com/Subtixx/sentry-yt/issues) for all features that are not yet implemented.*

- Receive and process Sentry webhooks
- Create YouTrack issues from Sentry errors
- Link Sentry issues to YouTrack issues
- Handle Sentry alert rule actions
- Verify Sentry webhook signatures for security

## Prerequisites

- Node.js 18 or higher
- npm
- Docker and Docker Compose (for containerized deployment)
- YouTrack instance with API token
- Sentry instance (self-hosted or cloud)

## Installation

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/IT-Hock/sentry-yt.git
   cd sentry-yt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:
   ```
   NODE_ENV=development
   HOST=0.0.0.0
   PORT=3000
   YOUTRACK_BASE_URL=https://youtrack.example.com
   YOUTRACK_TOKEN=your-youtrack-token
   ```

4. Start the development server with hot-reload:
   ```bash
   npm run watch
   ```

### Docker Deployment

1. Build and run with Docker:
   ```bash
   npm run docker:build
   npm run docker:run
   ```

2. Alternatively, use Docker Compose:
   ```bash
   npm run docker:compose:up
   ```

## Configuration

### YouTrack Configuration

1. Generate a permanent token in YouTrack with the following permissions:
   - Read/write access to projects and issues
   - Read access to users and groups

2. Add the token to your `.env` file as `YOUTRACK_TOKEN`.

### Sentry Configuration

1. In your Sentry project, go to Settings > Integrations > Integrations.
2. Find the "WebHooks" integration and add it.
3. Configure the webhook URL to point to your deployed application's `/sentry/webhook` endpoint.
4. Configure the events you want to trigger the webhook.

### Config

## HOST
The host on which the application will list.
### Default
> `localhost`

## PORT
The port on which the application will listen.
### Default
> `3000`

## SKIP_SIG_VERIFY
If set to `true`, the application will skip the signature verification for Sentry Webhooks.

**This is not recommended for production environments.**
### Default
> `false`

## SKIP_INSTALL_VERIFY
If set to `true`, the application will skip the installation verification for Sentry Webhooks.

**This is not recommended for production environments.**
### Default
> `false`

# Sentry Config

## SENTRY_CLIENT_SECRET
The client secret for the Sentry application. This is used to verify the signature of incoming requests.

## SENTRY_INSTALLATION_CONFIG
A mapping of Sentry installation IDs to YouTrack project IDs. This is used to determine which YouTrack project to create issues in based on the Sentry installation ID.
### Format
> `INSTALLATION_ID:PROJECT_ID:SENTRY_FIELD_ID;INSTALLATION_ID:PROJECT_ID:SENTRY_FIELD_ID`
### Example
In the example below we have two installations one which maps to the `YOUTRACK` project and one which maps to the `DEMO` project.
Both use the same custom field id `500-11` which is the `Sentry Issue ID` field (created earlier).
> `022627fb-0a95-43af-868a-02b8c24e5248:YOUTRACK:500-11;a2ff916a-1f61-4be0-8b34-45aae4262b12:DEMO:500-11`

# YouTrack Config
## YOUTRACK_BASE_URL
The base URL of your YouTrack instance. This should include the protocol (http or https) and the domain.
### Example
> `https://youtrack.example.com`

## YOUTRACK_TOKEN
The API token for your YouTrack instance. This should be a permanent token with read/write access to projects and issues.

# Other

## IGNORE_SSL
If set to `true`, the application will ignore SSL certificate errors. This is useful for development environments or environments with self-signed certificates.

## Usage

### Endpoints

The application exposes the following endpoints:

- `GET /` - Returns basic API information
- `GET /sentry` - Returns information about Sentry-related endpoints
- `GET /sentry/members` - Member-related endpoints
- `GET /sentry/issues` - Issue-related endpoints

Additional endpoints that may be available in future versions:
- `/sentry/setup` - Setup-related endpoints
- `/sentry/webhook` - Webhook handling endpoints
- `/sentry/options` - Options-related endpoints
- `/sentry/alert-rule-action` - Alert rule action endpoints

## Development

### Building the Project

```bash
npm run build
```

The compiled output will be in the `dist` directory.

### Running Tests

```bash
npm test
```

### Using the Released Docker Image

After the release workflow completes, you can pull the Docker image from GitHub Container Registry:

```bash
docker pull ghcr.io/it-hock/sentry-yt:latest
# or with a specific version
docker pull ghcr.io/it-hock/sentry-yt:1.0.0
```

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Security

Please read [SECURITY.md](SECURITY.md) for details on our security policy and how to report security vulnerabilities.
