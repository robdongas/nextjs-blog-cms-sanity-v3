'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import {assist} from '@sanity/assist'
import {
  apiVersion,
  dataset,
  DRAFT_MODE_ROUTE,
  projectId,
} from 'lib/sanity.api'
import { locate } from 'plugins/locate'
import { previewDocumentNode } from 'plugins/previewPane'
import { settingsPlugin, settingsStructure } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import projectType from 'schemas/project'
import settingsType from 'schemas/settings'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Blog with Sanity.io'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [projectType, settingsType],
  },
  beta: {
    create: {
      startInCreateEnabled: true,
      fallbackStudioOrigin: 'www.ilanabode.com/studio'
    }
  },
  plugins: [
    structureTool({
      structure: settingsStructure(settingsType),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode(),
    }),
    presentationTool({
      locate,
      previewUrl: {
        previewMode: {
          enable: DRAFT_MODE_ROUTE,
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    settingsPlugin({ type: settingsType.name }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV !== 'production' &&
      visionTool({ defaultApiVersion: apiVersion }),
    assist()
  ],
})
