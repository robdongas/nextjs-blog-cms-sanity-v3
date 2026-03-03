export const useCdn = false

export const dataset = assertValue(
    import.meta.env.PUBLIC_SANITY_DATASET,
    'Missing environment variable: PUBLIC_SANITY_DATASET',
)

export const projectId = assertValue(
    import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    'Missing environment variable: PUBLIC_SANITY_PROJECT_ID',
)

export const readToken = import.meta.env.SANITY_API_READ_TOKEN || ''

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion =
    import.meta.env.PUBLIC_SANITY_API_VERSION || '2023-06-21'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        throw new Error(errorMessage)
    }

    return v
}
