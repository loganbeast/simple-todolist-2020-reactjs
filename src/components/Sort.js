import React, { Component } from 'react';


class Sort extends Component {
    render() {
        return (


            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div className="dropdown open">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Arrange
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <a role="button" className="dropdown-item sort_selected" href="#top">
                            <i className="fa fa-sort-alpha-asc mr-2  " aria-hidden="true" ></i>a-z
                        </a>
                        <a role="button" className="dropdown-item sort_selected" href="#top">
                            <i className="fa fa-sort-alpha-desc  mr-2" aria-hidden="true"  ></i>z-a
                        </a>
                        <div className="dropdown-divider"></div>
                        <a role="button" className="dropdown-item"  href="#top">Actived</a>
                        <a role="button" className="dropdown-item"  href="#top">Notactived</a>
                    </div>
                </div>
            </div>

        );
    }
}

export default Sort;
