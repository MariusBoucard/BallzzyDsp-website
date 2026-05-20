const STRAPI_URL = 'http://localhost:3000/api';

export const useStrapi = () => {
  const fetchPlugins = async () => {
    try {
      const response = await fetch(`${STRAPI_URL}/plugins?populate=*`);
      if (!response.ok) throw new Error('Failed to fetch plugins');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching plugins:', error);
      return [];
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${STRAPI_URL}/projects?populate=*`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch(`${STRAPI_URL}/social-links?populate=*`);
      if (!response.ok) throw new Error('Failed to fetch social links');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching social links:', error);
      return [];
    }
  };

  return {
    fetchPlugins,
    fetchProjects,
    fetchSocialLinks,
  };
};
