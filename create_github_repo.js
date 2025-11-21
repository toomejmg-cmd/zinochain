import { Octokit } from '@octokit/rest';

let connectionSettings;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function createAndPushRepo() {
  try {
    const octokit = await getGitHubClient();
    
    // Get authenticated user
    const { data: user } = await octokit.rest.users.getAuthenticated();
    const username = user.login;
    
    console.log(`Creating repository for user: ${username}`);
    
    // Create repository
    const { data: repo } = await octokit.rest.repos.createForAuthenticatedUser({
      name: 'zinochain',
      description: 'AI-powered multi-chain trading ecosystem for Solana, Ethereum, and BSC',
      private: false,
      auto_init: false
    });
    
    console.log(`Repository created: ${repo.clone_url}`);
    
    // Output the repository URL
    console.log(`\nRepository ready at: https://github.com/${username}/zinochain`);
    console.log(`Clone URL: ${repo.clone_url}`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAndPushRepo();
