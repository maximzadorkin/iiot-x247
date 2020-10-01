import React from 'react';
import Header from './Header/Header.js';
import SideBarNavigation from './SideBarNavigation/SideBarNavigation.js';

const linkToRoom = '#'
export default (props) => (
 <React.Fragment>
   <Header
    activePageTitle={props.activePageTitle}
    linkToRoom={linkToRoom}  
  />
   <SideBarNavigation />
 </React.Fragment> 
);