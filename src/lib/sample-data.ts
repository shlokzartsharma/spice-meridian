import { SearchResult, BrandMention, Analysis } from '@/types'

export const sampleSearchResults: Omit<SearchResult, 'id' | 'promptId' | 'createdAt'>[] = [
  {
    url: 'https://chat.openai.com/share/abc123',
    title: 'Best CRM tools for small businesses - ChatGPT Response',
    content: 'For small businesses, I\'d recommend HubSpot CRM as the top choice due to its user-friendly interface and comprehensive features. Salesforce is excellent for larger teams but can be overwhelming for small businesses. Pipedrive offers great pipeline management, while Zoho CRM provides good value for money. HubSpot stands out for its marketing automation capabilities and free tier.',
    source: 'ChatGPT',
    isAIGenerated: true,
    mentions: []
  },
  {
    url: 'https://claude.ai/conversation/def456',
    title: 'CRM recommendations for startups - Claude Analysis',
    content: 'When it comes to CRM solutions for startups, I should note that HubSpot offers an excellent free tier that\'s perfect for getting started. Salesforce is the industry leader but requires significant investment. Pipedrive is great for sales-focused teams, while Monday.com provides visual project management. HubSpot\'s integration capabilities make it ideal for growing businesses.',
    source: 'Claude',
    isAIGenerated: true,
    mentions: []
  },
  {
    url: 'https://perplexity.ai/search/ghi789',
    title: 'Top CRM platforms comparison - Perplexity Research',
    content: 'According to sources, the best CRM platforms include Salesforce for enterprise, HubSpot for inbound marketing, Pipedrive for sales teams, and Zoho for cost-conscious businesses. HubSpot is particularly strong in marketing automation and lead nurturing, making it ideal for businesses focused on inbound marketing strategies.',
    source: 'Perplexity',
    isAIGenerated: true,
    mentions: []
  },
  {
    url: 'https://bard.google.com/chat/jkl012',
    title: 'CRM software recommendations - Google Bard',
    content: 'For CRM software, I recommend starting with HubSpot if you\'re focused on marketing and lead generation. Salesforce is the most comprehensive but expensive. Pipedrive excels at pipeline management, while Monday.com offers great project management features. HubSpot\'s free tier and marketing tools make it a strong choice for small to medium businesses.',
    source: 'Bard',
    isAIGenerated: true,
    mentions: []
  },
  {
    url: 'https://chat.openai.com/share/mno345',
    title: 'Best authentication providers for developers - ChatGPT',
    content: 'For authentication, Auth0 is the most developer-friendly option with extensive documentation and SDKs. Firebase Auth is great for Google ecosystem integration. Okta offers enterprise-grade security, while Supabase provides a modern open-source alternative. Auth0\'s universal login and social connections make it ideal for most applications.',
    source: 'ChatGPT',
    isAIGenerated: true,
    mentions: []
  },
  {
    url: 'https://claude.ai/conversation/pqr678',
    title: 'Authentication solutions comparison - Claude',
    content: 'When choosing authentication providers, Auth0 provides excellent developer experience and comprehensive features. Firebase Auth is perfect for mobile apps and Google services. Okta is enterprise-focused, while Supabase offers a modern PostgreSQL-based solution. Auth0\'s flexibility and extensive integration options make it a top choice.',
    source: 'Claude',
    isAIGenerated: true,
    mentions: []
  },
  {
    url: 'https://perplexity.ai/search/stu901',
    title: 'Team communication tools analysis - Perplexity',
    content: 'Based on research, the leading team communication tools are Slack for general business communication, Microsoft Teams for Office 365 integration, Discord for gaming and communities, and Notion for documentation. Slack offers the best third-party integrations and user experience, while Teams excels in enterprise environments.',
    source: 'Perplexity',
    isAIGenerated: true,
    mentions: []
  },
  {
    url: 'https://chat.openai.com/share/vwx234',
    title: 'Project management tools for remote teams - ChatGPT',
    content: 'For remote project management, I recommend Asana for its intuitive interface and team collaboration features. Monday.com offers excellent visual project tracking, while Notion provides an all-in-one workspace solution. ClickUp is great for comprehensive project management, and Trello excels at simple task organization.',
    source: 'ChatGPT',
    isAIGenerated: true,
    mentions: []
  }
]

export const sampleBrandMentions: Omit<BrandMention, 'id' | 'searchResultId' | 'createdAt'>[] = [
  // CRM mentions
  {
    brandName: 'HubSpot',
    mentionText: 'HubSpot CRM as the top choice due to its user-friendly interface and comprehensive features',
    sentiment: 'positive',
    position: 1,
    features: ['user-friendly', 'comprehensive features', 'marketing automation', 'free tier']
  },
  {
    brandName: 'Salesforce',
    mentionText: 'Salesforce is excellent for larger teams but can be overwhelming for small businesses',
    sentiment: 'neutral',
    position: 2,
    features: ['enterprise', 'comprehensive', 'overwhelming for small businesses']
  },
  {
    brandName: 'Pipedrive',
    mentionText: 'Pipedrive offers great pipeline management',
    sentiment: 'positive',
    position: 3,
    features: ['pipeline management', 'sales-focused']
  },
  {
    brandName: 'HubSpot',
    mentionText: 'HubSpot offers an excellent free tier that\'s perfect for getting started',
    sentiment: 'positive',
    position: 1,
    features: ['free tier', 'integration capabilities', 'growing businesses']
  },
  {
    brandName: 'Salesforce',
    mentionText: 'Salesforce is the industry leader but requires significant investment',
    sentiment: 'neutral',
    position: 2,
    features: ['industry leader', 'significant investment']
  },
  {
    brandName: 'HubSpot',
    mentionText: 'HubSpot is particularly strong in marketing automation and lead nurturing',
    sentiment: 'positive',
    position: 1,
    features: ['marketing automation', 'lead nurturing', 'inbound marketing']
  },
  {
    brandName: 'HubSpot',
    mentionText: 'HubSpot\'s free tier and marketing tools make it a strong choice for small to medium businesses',
    sentiment: 'positive',
    position: 1,
    features: ['free tier', 'marketing tools', 'small to medium businesses']
  },
  // Auth mentions
  {
    brandName: 'Auth0',
    mentionText: 'Auth0 is the most developer-friendly option with extensive documentation and SDKs',
    sentiment: 'positive',
    position: 1,
    features: ['developer-friendly', 'extensive documentation', 'SDKs']
  },
  {
    brandName: 'Firebase Auth',
    mentionText: 'Firebase Auth is great for Google ecosystem integration',
    sentiment: 'positive',
    position: 2,
    features: ['Google ecosystem', 'mobile apps']
  },
  {
    brandName: 'Auth0',
    mentionText: 'Auth0 provides excellent developer experience and comprehensive features',
    sentiment: 'positive',
    position: 1,
    features: ['developer experience', 'comprehensive features', 'flexibility']
  },
  // Communication mentions
  {
    brandName: 'Slack',
    mentionText: 'Slack for general business communication',
    sentiment: 'positive',
    position: 1,
    features: ['business communication', 'third-party integrations']
  },
  {
    brandName: 'Microsoft Teams',
    mentionText: 'Microsoft Teams for Office 365 integration',
    sentiment: 'neutral',
    position: 2,
    features: ['Office 365 integration', 'enterprise']
  },
  // Project management mentions
  {
    brandName: 'Asana',
    mentionText: 'Asana for its intuitive interface and team collaboration features',
    sentiment: 'positive',
    position: 1,
    features: ['intuitive interface', 'team collaboration']
  },
  {
    brandName: 'Monday.com',
    mentionText: 'Monday.com offers excellent visual project tracking',
    sentiment: 'positive',
    position: 2,
    features: ['visual project tracking']
  },
  {
    brandName: 'Notion',
    mentionText: 'Notion provides an all-in-one workspace solution',
    sentiment: 'positive',
    position: 3,
    features: ['all-in-one workspace']
  }
]

export const sampleAnalyses: Omit<Analysis, 'id' | 'promptId' | 'createdAt'>[] = [
  {
    totalResults: 4,
    brandsFound: ['HubSpot', 'Salesforce', 'Pipedrive', 'Zoho'],
    brandRankings: {
      'HubSpot': { mentions: 4, avgPosition: 1.0, sentiment: 0.9 },
      'Salesforce': { mentions: 3, avgPosition: 2.0, sentiment: 0.5 },
      'Pipedrive': { mentions: 2, avgPosition: 3.0, sentiment: 0.8 },
      'Zoho': { mentions: 1, avgPosition: 4.0, sentiment: 0.7 }
    },
    sentimentSummary: { positive: 75, neutral: 20, negative: 5 },
    keyInsights: 'HubSpot dominates CRM recommendations with 100% mention rate and highest sentiment. Positioned as user-friendly with strong marketing automation capabilities.',
    visibilityScore: 100.0
  },
  {
    totalResults: 2,
    brandsFound: ['Auth0', 'Firebase Auth', 'Okta', 'Supabase'],
    brandRankings: {
      'Auth0': { mentions: 2, avgPosition: 1.0, sentiment: 0.9 },
      'Firebase Auth': { mentions: 2, avgPosition: 2.0, sentiment: 0.8 },
      'Okta': { mentions: 1, avgPosition: 3.0, sentiment: 0.6 },
      'Supabase': { mentions: 1, avgPosition: 4.0, sentiment: 0.7 }
    },
    sentimentSummary: { positive: 80, neutral: 15, negative: 5 },
    keyInsights: 'Auth0 leads authentication recommendations with perfect positioning and high sentiment. Strong developer experience positioning.',
    visibilityScore: 100.0
  },
  {
    totalResults: 1,
    brandsFound: ['Slack', 'Microsoft Teams', 'Discord', 'Notion'],
    brandRankings: {
      'Slack': { mentions: 1, avgPosition: 1.0, sentiment: 0.8 },
      'Microsoft Teams': { mentions: 1, avgPosition: 2.0, sentiment: 0.5 },
      'Discord': { mentions: 1, avgPosition: 3.0, sentiment: 0.6 },
      'Notion': { mentions: 1, avgPosition: 4.0, sentiment: 0.7 }
    },
    sentimentSummary: { positive: 65, neutral: 25, negative: 10 },
    keyInsights: 'Slack leads team communication recommendations with strong integration positioning.',
    visibilityScore: 100.0
  },
  {
    totalResults: 1,
    brandsFound: ['Asana', 'Monday.com', 'Notion', 'ClickUp', 'Trello'],
    brandRankings: {
      'Asana': { mentions: 1, avgPosition: 1.0, sentiment: 0.8 },
      'Monday.com': { mentions: 1, avgPosition: 2.0, sentiment: 0.8 },
      'Notion': { mentions: 1, avgPosition: 3.0, sentiment: 0.7 },
      'ClickUp': { mentions: 1, avgPosition: 4.0, sentiment: 0.6 },
      'Trello': { mentions: 1, avgPosition: 5.0, sentiment: 0.7 }
    },
    sentimentSummary: { positive: 72, neutral: 20, negative: 8 },
    keyInsights: 'Asana leads project management recommendations with strong team collaboration positioning.',
    visibilityScore: 100.0
  }
]

export const samplePrompts = [
  {
    text: 'What are the best CRM tools for small businesses?',
    category: 'CRM'
  },
  {
    text: 'Best authentication providers for developers',
    category: 'Authentication'
  },
  {
    text: 'Top team communication tools for remote work',
    category: 'Communication'
  },
  {
    text: 'Best project management tools for remote teams',
    category: 'Project Management'
  }
] 