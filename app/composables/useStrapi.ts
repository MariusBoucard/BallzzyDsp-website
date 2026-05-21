
export const useStrapi = () => {
  const config = useRuntimeConfig();
  const STRAPI_URL = config.public.strapiUrl;
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

  const getPlugin = async (id: string) => {
    try {
      const response = await fetch(`${STRAPI_URL}/plugins/${id}?populate=*`);
      if (!response.ok) throw new Error('Failed to fetch plugin');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching plugin:', error);
      return null;
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

  const getProject = async (id: string) => {
    try {
      const response = await fetch(`${STRAPI_URL}/projects/${id}?populate=*`);
      if (!response.ok) throw new Error('Failed to fetch project');
      const data = await response.json();
      return data.data;
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
      return data.data || [];
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
  };
};
