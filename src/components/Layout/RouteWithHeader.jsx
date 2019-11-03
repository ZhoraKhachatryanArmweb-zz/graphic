import React from 'react';
import {Route} from 'react-router-dom';
import PredefinedPropTypes from "../../constants/Proptypes";

const RouteWithHeader = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => (
            <>
              <div className="section">
                {/* eslint-disable-next-line react/jsx-no-undef */}

                <Component {...props} />
              </div>
            </>
        )}
    />
);

RouteWithHeader.propTypes = {
  children: PredefinedPropTypes.children
};

export default RouteWithHeader;
