import { visionTool } from '@sanity/vision'
import { assist } from '@sanity/assist'
import { previewDocumentNode } from 'plugins/previewPane'
import { settingsPlugin, settingsStructure } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import aboutType from 'schemas/about'
import projectType from 'schemas/project'
import settingsType from 'schemas/settings'

const apiVersion = '2026-03-22'

export default defineConfig({
  name: 'ib-site',
  projectId: '2rllabgd',
  dataset: 'production',
  apiVersion: apiVersion,
  title: 'Ilana Bodenstein',
  schema: {
    types: [aboutType, projectType, settingsType],
  },
  plugins: [
    structureTool({
      structure: settingsStructure(settingsType, aboutType),
      defaultDocumentNode: previewDocumentNode(),
    }),
    settingsPlugin({ type: settingsType.name }),
    settingsPlugin({ type: aboutType.name }),
    visionTool({ defaultApiVersion: apiVersion }),
    assist(),
  ],
})
