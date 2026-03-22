import type { DefaultDocumentNodeResolver } from 'sanity/structure'
import { Iframe, type IframeOptions } from 'sanity-plugin-iframe-pane'
import projectType from 'schemas/project'

const iframeOptions = {
  url: {
    origin: 'same-origin',
    preview: (document) => {
      if (!document) {
        return new Error('Missing document')
      }
      switch (document._type) {
        case 'project':
          return (document as any)?.slug?.current
            ? `/projects/${(document as any).slug.current}`
            : new Error('Missing slug')
        default:
          return new Error(`Unknown document type: ${document?._type}`)
      }
    },
  },
  reload: { button: true },
} satisfies IframeOptions

export const previewDocumentNode = (): DefaultDocumentNodeResolver => {
  return (S, { schemaType }) => {
    switch (schemaType) {
      case projectType.name:
        return S.document().views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      default:
        return null
    }
  }
}
