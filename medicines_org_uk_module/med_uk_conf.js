module.exports = {
    siteUrl: 'https://www.medicines.org.uk',
    searchInputSelector: 'input[id=searchField]',
    searchInputConfirmButton: 'button[id=searchBtn]',
    searchResultsListSelector: 'div.search-results.search-border.data-results.search-panel-results',
    elementFromList: (idx) => `div.search-results.search-border.data-results.search-panel-results>div:nth-child(${idx})>div>h2>a`,
    descriptionTableSelector: 'div.smpc',

    medicines: 'pregabalin',

}
