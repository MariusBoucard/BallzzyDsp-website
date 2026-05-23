export const useStrapi = () => {
  const config = useRuntimeConfig();
  const STRAPI_URL = config.public.strapiUrl;

  // Helper function to get the full image URL from Strapi response
  const getImageUrl = (image: any): string => {
    if (!image) return '';
    
    // Handle Strapi v4 nested image object structure
    if (typeof image === 'object') {
      // If it's an array (multiple images), get the first one
      if (Array.isArray(image) && image.length > 0) {
        image = image[0];
      }
      
      // Navigate nested structure: image.attributes.url
      if (image.attributes?.url) {
        return `${STRAPI_URL.replace('/api', '')}${image.attributes.url}`;
      }
      
      // Fallback: direct url property
      if (image.url) {
        return `${STRAPI_URL.replace('/api', '')}${image.url}`;
      }
    }
    
    // If it's already a URL string
    if (typeof image === 'string') {
      if (image.startsWith('http')) return image;
      return `${STRAPI_URL.replace('/api', '')}${image}`;
    }
    
    return '';
  };

  // Helper to transform API response data
  const transformData = (items: any[]): any[] => {
    return items.map((item) => {
      // Handle Strapi v4 response format where data is nested in attributes
      const attributes = item.attributes || item;
      
      return {
        id: item.id,
        ...attributes,
        image: item.attributes?.image || item.image, // Preserve image for getImageUrl
      };
    });
  };


  // Build a deep populate query string for plugins
  const pluginPopulateQuery = new URLSearchParams({
      'populate[image]': 'true',
  'populate[formats][populate][logo]': 'true',
  'populate[formats][populate][os_supported]': 'true',
  'populate[download_links][populate][format][populate][os_supported]': 'true',
  //  'populate[os_supported][populate][logo]': 'true',

   /* 'populate[image]': 'true',
    'populate[formats][populate][os_supported]': 'true',
    'populate[formats][populate][logo]': 'true',
    'populate[download_links][populate][format]': 'true',
       // 'populate[download_links][populate][format][populate][]': 'true',
    'populate[download_links][populate][format][populate][os_supported]': 'true',
   // 'appends[download_links][populate][format]': 'true',

    //'appends[formats][populate][os_supported]': 'true',
  //  'populate[formats][populate][os_supported][populate][logo]': 'true',*/
  }).toString();

  // Build a deep populate query string for projects
  const projectPopulateQuery = new URLSearchParams({
    'populate[image]': 'true',
    'populate[thumbnail]': 'true',
    'populate[tags]': 'true',
    // Add more nested relations here as needed
  }).toString();

  const fetchPlugins = async () => {
    try {
      const response = await fetch(`${STRAPI_URL}/plugins?${pluginPopulateQuery}`);
      if (!response.ok) throw new Error('Failed to fetch plugins');
      const data = await response.json();
      const plugins = transformData(data.data || []);

      return plugins.map((plugin) => ({
        ...plugin,
        imageUrl: getImageUrl(plugin.image),
        // formats now contains nested os_supported + logo
        formats: plugin.formats?.map((format: any) => ({
          ...format,
          logoUrl: getImageUrl(format.logo),
        })) ?? [],
      }));
    } catch (error) {
      console.error('Error fetching plugins:', error);
      return [];
    }
  };

  const getPlugin = async (documentId: string) => {
    try {
      const response = await fetch(`${STRAPI_URL}/plugins/${documentId}?${pluginPopulateQuery}`);
      if (!response.ok) throw new Error('Failed to fetch plugin');
      const data = await response.json();
      const plugin = data.data.attributes
        ? { id: data.data.id, ...data.data.attributes }
        : data.data;

      return {
        ...plugin,
        imageUrl: getImageUrl(plugin.image),
        formats: plugin.formats?.map((format: any) => ({
          ...format,
          logoUrl: getImageUrl(format.logo),
        })) ?? [],
      };
    } catch (error) {
      console.error('Error fetching plugin:', error);
      return null;
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${STRAPI_URL}/projects?${projectPopulateQuery}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      const projects = transformData(data.data || []);

      return projects.map((project) => ({
        ...project,
        imageUrl: getImageUrl(project.image),
      }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  };

  const getProject = async (id: string) => {
    try {
      const response = await fetch(`${STRAPI_URL}/projects/${id}?${projectPopulateQuery}`);
      if (!response.ok) throw new Error('Failed to fetch project');
      const data = await response.json();
      const project = data.data.attributes
        ? { id: data.data.id, ...data.data.attributes }
        : data.data;

      return {
        ...project,
        imageUrl: getImageUrl(project.image),
      };
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  };


  const fetchSocialLinks = async () => {
    try {
      const response = await fetch(`${STRAPI_URL}/social-links?populate=*`);
      if (!response.ok) throw new Error('Failed to fetch social links');
      const data = await response.json();
      return transformData(data.data || []);
    } catch (error) {
      console.error('Error fetching social links:', error);
      return [];
    }
  };

  return {
    fetchPlugins,
    getPlugin,
    fetchProjects,
    getProject,
    fetchSocialLinks,
    getImageUrl, // Export for manual use if needed
  };
};
