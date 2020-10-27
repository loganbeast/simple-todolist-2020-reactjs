import React, { Component } from 'react';


class Search extends Component {
    render() {
        return (
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control "
                        name=""
                        placeholder="Add keyword"
                    />
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-primary">
                            <span className="fas fa-search mr-1"></span>
                        Find
                    </button>
                    </span>
                </div>
            </div>
        );
    }
}


export default Search;
