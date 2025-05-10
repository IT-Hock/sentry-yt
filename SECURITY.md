# Security Policy

## Supported Versions

The following versions of Sentry-YouTrack Integration are currently being supported with security updates:

| Version | Supported          |
|---------|--------------------|
| 0.0.0   | :white_check_mark: |

As this project is in early development, only the latest version is supported. Once we reach a stable release (1.0.0), we will provide a more detailed support policy.

## Reporting a Vulnerability

We take the security of the Sentry-YouTrack Integration seriously. If you believe you've found a security vulnerability, please follow these steps:

1. **Do not disclose the vulnerability publicly**
2. **Email the details to [support@it-hock.de](mailto:support@it-hock.de)**
   - Provide a detailed description of the vulnerability
   - Include steps to reproduce the issue
   - Attach any proof-of-concept code if applicable
   - Suggest a fix if possible

## What to Expect

- We will acknowledge receipt of your vulnerability report within 3 business days
- We will provide a more detailed response within 10 business days
  - This response will outline our planned actions and when you can expect updates
- We will keep you informed about our progress in addressing the issue
- Once the vulnerability is fixed, we will publicly acknowledge your responsible disclosure (unless you prefer to remain anonymous)

## Security Best Practices for Deployment

When deploying this application, please follow these security best practices:

1. **Environment Variables**: Never commit sensitive information like API tokens to your repository. Always use environment variables or secure secret management solutions.

2. **Access Control**: Limit access to the application and its administrative interfaces to authorized personnel only.

3. **Network Security**: Deploy the application behind a firewall and consider using a reverse proxy like Nginx with HTTPS.

4. **Regular Updates**: Keep the application and all its dependencies up to date to benefit from security patches.

5. **Monitoring**: Implement logging and monitoring to detect unusual activities or potential security incidents.

6. **Backups**: Regularly backup your data and configuration to enable quick recovery in case of an incident.

## Security Considerations

This application handles communication between Sentry and YouTrack, which may involve sensitive error data and issue information. Consider the following:

- The application requires access tokens for both Sentry and YouTrack, which should be kept secure
- Data transmitted between services may contain sensitive information about your application's errors and internal structure
- Ensure proper network security to protect data in transit

## Thank You

We appreciate your help in keeping this project and its users secure. Responsible disclosure of vulnerabilities helps us ensure the security and privacy of everyone who uses this software.
