import React from 'react';
import Alert from './Alert';
import NavigableMap from './NavigableMap';
import Drawer from './Drawer';
import ZoomControls from './ZoomControls';
import Filters from './Filters';
import * as MapService from '../services/MapService';

class Map extends React.Component {
    componentWillMount() {
        this.props.setFiltersfromURL(this.props.location.search, this.props.match.params);
        this.props.setCode(this.props.match.params.code);
    }

    componentWillReceiveProps({ filters, query }) {
        const { code } = this.props.match.params;
        if (code !== this.props.code) {
            this.props.getArea({ code, filters, query });
        }
    }

    getSearchParams(filters, isDrawerOpen) {
        const searchParams = new URLSearchParams();
        Object.keys(filters)
            .filter(filter => filter !== 'types' && filters[filter])
            .forEach(filter => {
                if (filter === 'classification') {
                    searchParams.append(filter, filters[filter].terms);
                }
                if (filter === 'start_date') {
                    searchParams.append('from', filters[filter].from);
                    searchParams.append('to', filters[filter].to);
                }
            });

        if (isDrawerOpen) {
            searchParams.append('isDrawerOpen', true);
        }

        return searchParams.toString();
    }

    handleRouting(code) {
        let url = `/${code}`;
        const searchParams = this.getSearchParams(this.props.filters, this.props.isDrawerOpen);
        url = searchParams ? `${url}?${searchParams}` : url;
        this.props.history.push(url);
    }

    selectArea(code) {
        this.handleRouting(code);
        this.props.setCode(code);
    }

    getSearch() {
        const { code, query, filters } = this.props;
        this.handleRouting(code);
        this.props.getSearch({ code, query, filters });
    }

    async goToMunicipalities() {
        await this.props.resetArea();
        this.props.changePage('');
    }

    async removeFilters(key, filterName) {
        const { removeFilters, getSearch, code, filters, query } = this.props;
        await removeFilters({ key, filterName });
        await this.handleRouting(code);
        getSearch({ code, filters, query });
    }

    async resetQuery() {
        const { updateQuery, getSearch, code, filters, query } = this.props;
        await updateQuery('');
        getSearch({ code, filters, query });
    }

    getMoreDocuments(page) {
        const { getMoreDocs, code, filters, query } = this.props;
        getMoreDocs({ code, filters, query, page });
    }

    async toggleDrawer(isDrawerOpen) {
        await this.props.toggleDrawer(isDrawerOpen);
        this.handleRouting(this.props.code);
    }

    setZoomLevel(code) {
        const { filters, query } = this.props;
        this.props.getArea({ code, filters, query });
    }

    render() {
        const {
            geo,
            adjacent,
            code,
            counts,
            getSearch,
            getArea,
            facets,
            filters,
            documents,
            hasMoreDocs,
            isDrawerOpen,
            documentsCount,
            toggleDrawer,
            changePage,
            name,
            history,
            query,
            resetQuery,
            updateFilters,
            updateQuery,
            getMoreDocuments,
            resetFilters,
            location: { search }
        } = this.props;

        return (
            <div>
                <NavigableMap
                    geo={geo}
                    adjacent={adjacent}
                    code={code}
                    counts={counts}
                    selectArea={this.selectArea.bind(this)}
                    isDrawerOpen={isDrawerOpen}
                />

                {!isDrawerOpen && (
                    <ZoomControls
                        code={code}
                        setZoomLevel={this.setZoomLevel.bind(this)}
                        history={history}
                        goToMunicipalities={this.goToMunicipalities.bind(this)}
                        search={search}
                    />
                )}
                {!isDrawerOpen &&
                    documentsCount && (
                        <Filters
                            facets={facets}
                            filters={filters}
                            updateFilters={updateFilters}
                            removeFilters={this.removeFilters.bind(this)}
                            updateQuery={updateQuery}
                            submit={this.getSearch.bind(this)}
                            resetFilters={resetFilters}
                        />
                    )}

                <Alert
                    area={name}
                    filters={filters['classification'] || {}}
                    removeFilters={this.removeFilters.bind(this)}
                    query={query}
                    resetQuery={this.resetQuery.bind(this)}
                />

                <Drawer
                    documentsCount={documentsCount}
                    area={name}
                    isDrawerOpen={isDrawerOpen}
                    toggleDrawer={this.toggleDrawer.bind(this)}
                    service={this.DocumentService}
                    facets={facets}
                    documents={documents}
                    filters={filters}
                    removeFilters={this.removeFilters.bind(this)}
                    query={query}
                    resetQuery={this.resetQuery.bind(this)}
                    getMoreDocuments={this.getMoreDocuments.bind(this)}
                    hasMoreDocs={hasMoreDocs}
                />
            </div>
        );
    }
}

export default Map;
