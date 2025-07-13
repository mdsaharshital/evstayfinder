// contentlayer.config.js
import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from "contentlayer/source-files";
var Image = defineNestedType(() => ({
  name: "Image",
  fields: {
    src: { type: "string", required: true },
    width: { type: "number", required: true },
    height: { type: "number", required: true }
  }
}));
var City = defineDocumentType(() => ({
  name: "City",
  filePathPattern: `cities/**/*.md`,
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    date: { type: "date", required: true },
    image: { type: "nested", of: Image, required: true },
    tags: { type: "list", of: { type: "string" } },
    notionId: { type: "string", required: false },
    status: { type: "boolean", required: false },
    bodyText: { type: "string", required: false }
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/${doc.slug}` }
  }
}));
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/**/*.md`,
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    date: { type: "date", required: true },
    excerpt: { type: "string", required: false },
    image: { type: "nested", of: Image, required: true },
    tags: { type: "list", of: { type: "string" } },
    notionId: { type: "string", required: false },
    status: { type: "boolean", required: false },
    bodyText: { type: "string", required: false }
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/blog/${doc.slug}` }
  }
}));
var Hotel = defineDocumentType(() => ({
  name: "Hotel",
  filePathPattern: `hotels/**/*.md`,
  fields: {
    title: { type: "string", required: true },
    citySlug: {
      type: "string",
      required: true
    },
    slug: { type: "string", required: true },
    date: { type: "date", required: true },
    image: { type: "nested", of: Image, required: true },
    affiliateLink: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
    notionId: { type: "string", required: false },
    status: { type: "boolean", required: false },
    bodyText: { type: "string", required: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc.citySlug}/${doc.slug}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "src/content",
  documentTypes: [City, Blog, Hotel]
});
export {
  Blog,
  City,
  Hotel,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-66DUG2UR.mjs.map
