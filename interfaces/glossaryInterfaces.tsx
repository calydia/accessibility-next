export interface glossaryData {
  data: {
    glossaryTerms: {
      data: [{
        attributes: {
          termName: string,
          termDescription: string
        }
      }]
    }
  }
}

export interface glossaryItem {
  attributes: {
    termName: string,
    termDescription: string
  }
}
