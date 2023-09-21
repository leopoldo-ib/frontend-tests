require('dotenv').config({ path: '.playwright/.env' });

/**
 * Get an error message about a missing environment variable.
 */
const getErrorMessageForMissingEnv = (envName: string) => {
  return `${envName} not found in environment.`
}

const shopifyFlagStore = process.env.SHOPIFY_FLAG_STORE
if (!shopifyFlagStore) {
  throw new Error(getErrorMessageForMissingEnv('Shopify flag store'))
  
}

const onlineStorePassword = process.env.SHOPIFY_ONLINE_STORE_PASSWORD
if (!onlineStorePassword) {
  throw new Error(getErrorMessageForMissingEnv('Online store password'))
}

const shopifyCliThemeToken = process.env.SHOPIFY_CLI_THEME_TOKEN
if (!shopifyCliThemeToken) {
  throw new Error(getErrorMessageForMissingEnv('Shopify CLI theme token'))
}

const config = {
  ONLINE_STORE_PASSWORD: onlineStorePassword,
  ROUTES: {
    HOMEPAGE: '/',
    COLLECTION_PAGE_ALL: '/collections/all',
    PRODUCT_PAGE_SAMPLE: '/products/amazing-aluminum-bag-collection1'
  },
  TEST_WEB_SERVER: {
    SHOPIFY_FLAG_STORE: shopifyFlagStore,
    SHOPIFY_CLI_THEME_TOKEN: shopifyCliThemeToken,
    HOST: '127.0.0.1',
    PORT: '9291'
  }
}

export default config