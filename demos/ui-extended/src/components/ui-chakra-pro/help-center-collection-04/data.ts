interface HelpCenterAuthor {
  id: string
  name: string
  avatar_url: string | null
}

interface HelpCenterArticle {
  id: string
  title: string
  description: string | null
  body: string | null
  url: string | null
  author_id: string
  created_at: string
  updated_at: string
  parent_id: string | null
  parent_ids: string[]
}

interface HelpCenterCollection {
  id: string
  title: string
  url: string | null
  description: string | null
  icon: string | null
  parent_id: string | null
}

export interface HelpCenterData {
  authors: HelpCenterAuthor[]
  articles: HelpCenterArticle[]
  collections: HelpCenterCollection[]
}

export const data: HelpCenterData = {
  collections: [
    {
      id: 'about',
      title: 'About',
      description: 'Learn about our platform and its features',
      icon: '🚀',
      parent_id: null,
      url: '#',
    },
    {
      id: 'account-settings',
      title: 'Account Settings',
      description: 'Manage your account preferences and security settings',
      icon: '🔑',
      parent_id: null,
      url: '#',
    },
    {
      id: 'api-docs',
      title: 'API Documentation',
      description: 'Complete guide to our API endpoints',
      icon: '🔌',
      parent_id: null,
      url: '#',
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Common issues and how to resolve them',
      icon: '🔧',
      parent_id: null,
      url: '#',
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      description: 'Tips and recommendations for optimal usage',
      icon: '✨',
      parent_id: null,
      url: '#',
    },
    {
      id: 'designers',
      title: 'Designers',
      description: 'Best practices for designers',
      icon: '🎨',
      parent_id: 'best-practices',
      url: '#',
    },
    {
      id: 'developers',
      title: 'Developers',
      description: 'Best practices for developers',
      icon: '💻',
      parent_id: 'best-practices',
      url: '#',
    },
    {
      id: 'security-privacy',
      title: 'Security & Privacy',
      description: 'Understanding our security features and privacy policies',
      icon: '🔒',
      parent_id: null,
      url: '#',
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: 'Connect and use with other tools and services',
      icon: '🔄',
      parent_id: null,
      url: '#',
    },
    {
      id: 'updates-changes',
      title: 'Updates & Changes',
      description: 'Latest features and platform changes',
      icon: '📢',
      parent_id: null,
      url: '#',
    },
    {
      id: 'privacy-and-legal',
      title: 'Privacy & Legal',
      description: 'Learn about our privacy and legal policies',
      icon: '👥',
      parent_id: null,
      url: '#',
    },
  ],
  authors: [
    {
      id: '1',
      name: 'John Smith',
      avatar_url: 'https://i.pravatar.cc/150?u=john',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar_url: 'https://i.pravatar.cc/150?u=sarah',
    },
  ],
  articles: [
    {
      id: 'about-1',
      title: 'Getting Started Guide',
      description: 'Learn the basics of our platform',
      body: 'Detailed guide content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-01-01',
      updated_at: '2023-01-01',
      parent_id: 'about',
      parent_ids: ['about'],
    },
    {
      id: 'about-2',
      title: 'Platform Overview',
      description: 'High-level overview of key features',
      body: 'Overview content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-01-02',
      updated_at: '2023-01-02',
      parent_id: 'about',
      parent_ids: ['about'],
    },
    {
      id: 'about-3',
      title: 'Core Concepts',
      description: 'Understanding fundamental concepts',
      body: 'Core concepts content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-01-03',
      updated_at: '2023-01-03',
      parent_id: 'about',
      parent_ids: ['about'],
    },
    {
      id: 'about-4',
      title: 'Feature Highlights',
      description: 'Exploring key platform capabilities',
      body: 'Feature highlights content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-01-04',
      updated_at: '2023-01-04',
      parent_id: 'about',
      parent_ids: ['about'],
    },
    {
      id: 'account-1',
      title: 'Managing Your Profile',
      description: 'Update and maintain your account information',
      body: 'Profile management content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-02-01',
      updated_at: '2023-02-01',
      parent_id: 'account-settings',
      parent_ids: ['account-settings'],
    },
    {
      id: 'account-2',
      title: 'Security Settings',
      description: 'Configure your security preferences',
      body: 'Security settings content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-02-02',
      updated_at: '2023-02-02',
      parent_id: 'account-settings',
      parent_ids: ['account-settings'],
    },
    {
      id: 'account-3',
      title: 'Notification Preferences',
      description: 'Customize your notification settings',
      body: 'Notification settings content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-02-03',
      updated_at: '2023-02-03',
      parent_id: 'account-settings',
      parent_ids: ['account-settings'],
    },
    {
      id: 'account-4',
      title: 'Billing Information',
      description: 'Manage payment methods and billing details',
      body: 'Billing information content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-02-04',
      updated_at: '2023-02-04',
      parent_id: 'account-settings',
      parent_ids: ['account-settings'],
    },
    {
      id: 'api-1',
      title: 'Authentication',
      description: 'Learn about API authentication methods',
      body: 'Authentication content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-03-01',
      updated_at: '2023-03-01',
      parent_id: 'api-docs',
      parent_ids: ['api-docs'],
    },
    {
      id: 'api-2',
      title: 'Endpoints Reference',
      description: 'Complete list of API endpoints',
      body: 'Endpoints content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-03-02',
      updated_at: '2023-03-02',
      parent_id: 'api-docs',
      parent_ids: ['api-docs'],
    },
    {
      id: 'api-3',
      title: 'Rate Limiting',
      description: 'Understanding API rate limits',
      body: 'Rate limiting content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-03-03',
      updated_at: '2023-03-03',
      parent_id: 'api-docs',
      parent_ids: ['api-docs'],
    },
    {
      id: 'api-4',
      title: 'Error Handling',
      description: 'Managing API errors and responses',
      body: 'Error handling content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-03-04',
      updated_at: '2023-03-04',
      parent_id: 'api-docs',
      parent_ids: ['api-docs'],
    },
    {
      id: 'troubleshooting-1',
      title: 'Common Issues',
      description: 'Solutions to frequent problems',
      body: 'Common issues content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-04-01',
      updated_at: '2023-04-01',
      parent_id: 'troubleshooting',
      parent_ids: ['troubleshooting'],
    },
    {
      id: 'troubleshooting-2',
      title: 'Error Messages',
      description: 'Understanding error messages',
      body: 'Error messages content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-04-02',
      updated_at: '2023-04-02',
      parent_id: 'troubleshooting',
      parent_ids: ['troubleshooting'],
    },
    {
      id: 'troubleshooting-3',
      title: 'Performance Issues',
      description: 'Resolving performance problems',
      body: 'Performance issues content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-04-03',
      updated_at: '2023-04-03',
      parent_id: 'troubleshooting',
      parent_ids: ['troubleshooting'],
    },
    {
      id: 'troubleshooting-4',
      title: 'Connection Problems',
      description: 'Fixing connectivity issues',
      body: 'Connection problems content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-04-04',
      updated_at: '2023-04-04',
      parent_id: 'troubleshooting',
      parent_ids: ['troubleshooting'],
    },
    {
      id: 'designers-1',
      title: 'Design System Guidelines',
      description: 'Working with our design system',
      body: 'Design system content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-05-01',
      updated_at: '2023-05-01',
      parent_id: 'designers',
      parent_ids: ['best-practices', 'designers'],
    },
    {
      id: 'designers-2',
      title: 'Component Library',
      description: 'Using our component library effectively',
      body: 'Component library content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-05-02',
      updated_at: '2023-05-02',
      parent_id: 'designers',
      parent_ids: ['best-practices', 'designers'],
    },
    {
      id: 'designers-3',
      title: 'Design Workflow',
      description: 'Optimizing your design process',
      body: 'Design workflow content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-05-03',
      updated_at: '2023-05-03',
      parent_id: 'designers',
      parent_ids: ['best-practices', 'designers'],
    },
    {
      id: 'developers-1',
      title: 'Code Standards',
      description: 'Following our coding standards',
      body: 'Code standards content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-05-04',
      updated_at: '2023-05-04',
      parent_id: 'developers',
      parent_ids: ['best-practices', 'developers'],
    },
    {
      id: 'developers-2',
      title: 'Architecture Patterns',
      description: 'Recommended architecture patterns',
      body: 'Architecture patterns content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-05-05',
      updated_at: '2023-05-05',
      parent_id: 'developers',
      parent_ids: ['best-practices', 'developers'],
    },
    {
      id: 'developers-3',
      title: 'Testing Guidelines',
      description: 'Best practices for testing',
      body: 'Testing guidelines content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-05-06',
      updated_at: '2023-05-06',
      parent_id: 'developers',
      parent_ids: ['best-practices', 'developers'],
    },
    {
      id: 'security-1',
      title: 'Data Protection',
      description: 'Understanding data security measures',
      body: 'Data protection content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-06-01',
      updated_at: '2023-06-01',
      parent_id: 'security-privacy',
      parent_ids: ['security-privacy'],
    },
    {
      id: 'security-2',
      title: 'Access Control',
      description: 'Managing user permissions',
      body: 'Access control content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-06-02',
      updated_at: '2023-06-02',
      parent_id: 'security-privacy',
      parent_ids: ['security-privacy'],
    },
    {
      id: 'security-3',
      title: 'Encryption',
      description: 'Data encryption methods',
      body: 'Encryption content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-06-03',
      updated_at: '2023-06-03',
      parent_id: 'security-privacy',
      parent_ids: ['security-privacy'],
    },
    {
      id: 'security-4',
      title: 'Compliance',
      description: 'Meeting security standards',
      body: 'Compliance content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-06-04',
      updated_at: '2023-06-04',
      parent_id: 'security-privacy',
      parent_ids: ['security-privacy'],
    },
    {
      id: 'integrations-1',
      title: 'Available Integrations',
      description: 'Overview of integration options',
      body: 'Integrations overview content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-07-01',
      updated_at: '2023-07-01',
      parent_id: 'integrations',
      parent_ids: ['integrations'],
    },
    {
      id: 'integrations-2',
      title: 'Setting Up Integrations',
      description: 'Integration configuration guide',
      body: 'Setup guide content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-07-02',
      updated_at: '2023-07-02',
      parent_id: 'integrations',
      parent_ids: ['integrations'],
    },
    {
      id: 'integrations-3',
      title: 'Custom Integrations',
      description: 'Building custom integrations',
      body: 'Custom integration content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-07-03',
      updated_at: '2023-07-03',
      parent_id: 'integrations',
      parent_ids: ['integrations'],
    },
    {
      id: 'integrations-4',
      title: 'Troubleshooting Integrations',
      description: 'Solving integration issues',
      body: 'Integration troubleshooting content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-07-04',
      updated_at: '2023-07-04',
      parent_id: 'integrations',
      parent_ids: ['integrations'],
    },
    {
      id: 'updates-1',
      title: 'Release Notes',
      description: 'Latest platform updates',
      body: 'Release notes content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-08-01',
      updated_at: '2023-08-01',
      parent_id: 'updates-changes',
      parent_ids: ['updates-changes'],
    },
    {
      id: 'updates-2',
      title: 'Upcoming Features',
      description: 'Preview of planned changes',
      body: 'Upcoming features content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-08-02',
      updated_at: '2023-08-02',
      parent_id: 'updates-changes',
      parent_ids: ['updates-changes'],
    },
    {
      id: 'updates-3',
      title: 'Migration Guides',
      description: 'Updating to new versions',
      body: 'Migration guide content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-08-03',
      updated_at: '2023-08-03',
      parent_id: 'updates-changes',
      parent_ids: ['updates-changes'],
    },
    {
      id: 'updates-4',
      title: 'Deprecation Notices',
      description: 'Important changes and removals',
      body: 'Deprecation notices content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-08-04',
      updated_at: '2023-08-04',
      parent_id: 'updates-changes',
      parent_ids: ['updates-changes'],
    },
    {
      id: 'privacy-1',
      title: 'Privacy Policy',
      description: 'Our privacy commitments',
      body: 'Privacy policy content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-09-01',
      updated_at: '2023-09-01',
      parent_id: 'privacy-and-legal',
      parent_ids: ['privacy-and-legal'],
    },
    {
      id: 'privacy-2',
      title: 'Terms of Service',
      description: 'Platform usage terms',
      body: 'Terms of service content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-09-02',
      updated_at: '2023-09-02',
      parent_id: 'privacy-and-legal',
      parent_ids: ['privacy-and-legal'],
    },
    {
      id: 'privacy-3',
      title: 'Data Processing',
      description: 'How we handle your data',
      body: 'Data processing content here...',
      url: '#',
      author_id: '1',
      created_at: '2023-09-03',
      updated_at: '2023-09-03',
      parent_id: 'privacy-and-legal',
      parent_ids: ['privacy-and-legal'],
    },
    {
      id: 'privacy-4',
      title: 'Cookie Policy',
      description: 'Website cookie usage',
      body: 'Cookie policy content here...',
      url: '#',
      author_id: '2',
      created_at: '2023-09-04',
      updated_at: '2023-09-04',
      parent_id: 'privacy-and-legal',
      parent_ids: ['privacy-and-legal'],
    },
  ],
}

export const collectionQuery = {
  find(id: string) {
    const collection = data.collections.find((collection) => collection.id === id)
    if (!collection) {
      throw new Error(`Collection with ID ${id} not found`)
    }
    return collection
  },
  findArticles(ids: string | string[]) {
    const idsArray = Array.isArray(ids) ? ids : [ids]
    return articleQuery.findByParentIds(idsArray)
  },
  get() {
    return data.collections
      .filter((collection) => !collection.parent_id)
      .map((collection) => {
        const articles = articleQuery.findByParentIds([collection.id])
        const authorIds = [...new Set(articles.map((article) => article.author_id))]
        const authors = authorIds.map((id) => authorQuery.findOrThrow(id))
        return { ...collection, articles, authors }
      })
  },
}

interface CollectionWithArticles extends HelpCenterCollection {
  articles: HelpCenterArticle[]
}

export const articleQuery = {
  find(id: string) {
    return data.articles.find((article) => article.id === id)
  },
  findMany(ids: string[]) {
    return data.articles.filter((article) => ids.includes(article.id))
  },
  findByParentId(parentId: string) {
    return data.articles.filter((article) => article.parent_id === parentId)
  },
  findByParentIds(parentIds: string[]) {
    return data.articles.filter((article) =>
      parentIds.some((pid) => article.parent_ids.includes(pid)),
    )
  },
  search(query: string) {
    const searchTerm = query.toLowerCase()
    return data.articles.filter((article) => {
      const titleMatch = article.title.toLowerCase().includes(searchTerm)
      const descriptionMatch = article.description?.toLowerCase().includes(searchTerm)
      return titleMatch || descriptionMatch
    })
  },
  findRelated(articleId: string, limit = 3) {
    const article = this.find(articleId)
    if (!article) return []

    const relatedArticles = this.findByParentIds(article.parent_ids)
    return relatedArticles
      .sort((a, b) => {
        const aShared = a.parent_ids.filter((pid) => article.parent_ids.includes(pid)).length
        const bShared = b.parent_ids.filter((pid) => article.parent_ids.includes(pid)).length
        return bShared - aShared
      })
      .slice(0, limit)
  },
  group(articles: HelpCenterArticle[]) {
    return articles.reduce((acc, article) => {
      if (!article.parent_id) return acc
      const collection = collectionQuery.find(article.parent_id)
      if (!collection) return acc
      const existing = acc.find((c) => c.id === collection.id)
      if (existing) {
        existing.articles.push(article)
        return acc
      }
      return acc.concat({ ...collection, articles: [article] })
    }, [] as CollectionWithArticles[])
  },
}

export const authorQuery = {
  find(id: string) {
    return data.authors.find((author) => author.id === id)
  },
  findOrThrow(id: string) {
    const author = this.find(id)
    if (!author) {
      throw new Error(`Author with ID ${id} not found`)
    }
    return author
  },
  findMany(ids: string[]) {
    return data.authors.filter((author) => ids.includes(author.id))
  },
}
