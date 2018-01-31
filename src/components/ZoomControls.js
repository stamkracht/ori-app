import React from 'react'
import ZoomButton from './ZoomButton'

const ZoomControls = ({code, setZoomLevel, municipality, district, neighborhood, search}) => {
  const level = code.slice(0, 2);
  
  return (
    <div className='c-zoomControls'>     
      <ZoomButton
        pathname={'/'}
        search={false}
        name={'Kies gemeente'}
        onClick={() => setZoomLevel()} />            

      {(level === 'GM' || level === 'WK' || level === 'BU') && 
      <ZoomButton
        pathname={`/${municipality}`}
        search={search}
        name={'Gemeente'}
        isActive={level === 'GM'}
        setZoomLevel={() => setZoomLevel(`GM${code.match(/[0-9]{4}/g)[0]}`)}/>}
        
      {(level === 'WK' || level === 'BU') &&
      <ZoomButton
        pathname={`/${municipality}/${district}`}    
        search={search}
        name={'Wijk'}
        isActive={level === 'WK'}
        setZoomLevel={() => setZoomLevel(`WK${code.match(/[0-9]{6}/g)[0]}`)}/>}

      {(level === 'BU') && 
      <ZoomButton
        pathname={`/${municipality}/${district}/${neighborhood}`}
        name={'Buurt'}
        search={search}
        isActive={level === 'BU'}
        setZoomLevel={() => setZoomLevel(`BU${code.match(/[0-9]{8}/g)[0]}`)}/>}
    </div>
  )
}

ZoomControls.defaultProps = {
  setZoomLevel: undefined,
  code: '',
  municipality: '',
  district: '',
  neighborhood: '',
  search: {}
};

export default ZoomControls