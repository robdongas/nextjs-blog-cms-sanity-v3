/**
 * This plugin contains all the logic for setting up the `Settings` singleton
 */

import { definePlugin, type DocumentDefinition } from 'sanity'
import type { StructureResolver } from 'sanity/structure'

export const settingsPlugin = definePlugin<{ type: string }>(({ type }) => {
  return {
    name: `singleton-${type}`,
    document: {
      // Hide 'Settings' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => templateItem.templateId !== type)
        }

        return prev
      },
      // Removes the "duplicate" action on the "settings" singleton
      actions: (prev, { schemaType }) => {
        if (schemaType === type) {
          return prev.filter(({ action }) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
})

export const settingsStructure = (
  ...typeDefs: DocumentDefinition[]
): StructureResolver => {
  return (S) => {
    const singletonNames = typeDefs.map((t) => t.name)

    const singletonItems = typeDefs.map((typeDef) =>
      S.listItem()
        .title(typeDef.title)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name),
        ),
    )

    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) => !singletonNames.includes(listItem.getId()!),
    )

    return S.list()
      .title('Content')
      .items([...singletonItems, S.divider(), ...defaultListItems])
  }
}
