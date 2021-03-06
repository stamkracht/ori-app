import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    getMunicipalities,
    filterMunicipalities,
    getUserLocation,
    showUserLocation,
    resetLocation
} from '../actions/municipalities';
import Municipalities from '../components/Municipalities';

const chooseMunicipality = municipalities => (municipalities.length ? push(`${municipalities[0].code}`) : null);

const mapStateToProps = state => {
    const { filtered: municipalities, term, loadingLocation, loadingLocationFailed, code } = state.municipalities;

    return {
        municipalities,
        term,
        loadingLocation,
        loadingLocationFailed,
        code
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            changePage: code => push(`/${code}`),
            getMunicipalities,
            filterMunicipalities,
            chooseMunicipality,
            getUserLocation,
            showUserLocation,
            resetLocation
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Municipalities);
