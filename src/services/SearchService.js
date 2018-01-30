import apiUrl from './ApiUrl';
import FiltersService from './FiltersService';

const SearchService = (function () {

  let PARAMS = {
    from: 0,
    size: 2,
    facets: {
        types: {},
        start_date: {
            interval: 'year'
        },
        classification: {
            size: 100
        }
    },
    sort: '_score',
    order: 'desc',
    query: ''
  };

  function search(code, query = '', page = 1) {
    return fetch(`${apiUrl}v0/${parseCode(code)}/search`, {
      method: 'POST',
      body: handleData(code, query, page),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json());
  }

  function parseCode(code) {
    const level = code.slice(0,2).toLowerCase();

    switch(level) {
      case 'gm':
        return code.toLowerCase();
      case 'wk':
      case 'bu':
        return `gm${code.slice(2,6)}`;
      default:
      return code.toLowerCase();
    }
  }

  function getAreaFilter(code) {
    const level = code.slice(0,2).toLowerCase();

    switch(level) {
      case 'wk':
        return {districts: {terms: [code]}};
      case 'bu':
        return {neighborhoods: {terms: [code]}};
      default:
        return {};
    }
  }

  function getAreaFacet(code) {
    const level = code.slice(0,2).toLowerCase();

    switch(level) {
      case 'gm':
        return {districts: {size: 100}};
      case 'wk':
        return {neighborhoods: {size: 500}};
      default:
        return {};
    }
  }

  function getPage(page) {
    switch(page) {
      case 1:
        PARAMS.from = 0;
        PARAMS.size = 2;
        break;
      case 2:
        PARAMS.from = 2;
        PARAMS.size = 3;
        break;
      default:
        PARAMS.from += PARAMS.size;
        PARAMS.size = 5;
        break;
    }
    return [PARAMS.from, PARAMS.size]
  }

  function handleData(code, query, page) {
    const areaFilter = getAreaFilter(code);
    const areaFacet = getAreaFacet(code);
    const params = Object.assign({}, PARAMS);
    [params.from, params.size] = getPage(page);
    params.query = query;
    if (page <= 1) {
      // add districts or neighborhood facet on initial search
      params.facets = Object.assign({}, params.facets, areaFacet);
    } else {
      // no need for facets on subsequent pages
      delete params.facets
    }
    params.filters = Object.assign({}, areaFilter, FiltersService.get());
    return JSON.stringify(params);
  }

  function setParams(params) {
    PARAMS = Object.assign(PARAMS, params);
  }


  return {
    search,
    setParams
  }

}());

export default SearchService
