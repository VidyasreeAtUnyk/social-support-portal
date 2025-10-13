import i18n from 'i18next';

export const loadLocale = async (lng: string, ns: string) => {
  try {
    const resources = await import(`../../locales/${lng}/${ns}.json`);
    i18n.addResourceBundle(lng, ns, resources.default || resources, true, true);
    return resources;
  } catch (err) {
    console.warn(`Failed to load ${lng}/${ns}:`, err);
    return {};
  }
};
