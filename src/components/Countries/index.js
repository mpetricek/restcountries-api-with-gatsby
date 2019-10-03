import React from 'react';
import { StaticQuery, graphql } from "gatsby"
import ReactTable from 'react-table'
import Modal from '../Modal'
import 'react-table/react-table.css'
import './countries.scss'

class Countries extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            modalOpen: false
        }
    }
    modalOpener = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }
    render() {
        const countries = this.state.data.allInternalCountries.edges
        return (
            <>
                <Modal modalOpen={this.state.modalOpen} onClick={() => this.modalOpener()} />
                <ReactTable
                    showPagination={false}
                    className="countries"
                    pageSize={countries.length}
                    data={countries}
                    resolveData={countries => countries.map(edge => edge.node)}
                    noDataText={"No Data"}
                    defaultSorted={[
                        { id: "name", desc: false }
                    ]}
                    columns={[
                        {
                            accessor: "flag",
                            sortable: false,
                            Cell: ({ value }) => value && <img src={value} alt="Flag" />
                        },
                        {
                            accessor: "name",
                            sortable: false
                        },
                        {
                            accessor: "capital",
                            headerClassName: "capitalHeader"
                        },
                        {
                            accessor: "population",
                            headerClassName: "populationHeader",
                            Cell: ({ value }) => value && value.toLocaleString('en').replace(/,/g, ".")
                        },
                        {
                            accessor: "area",
                            headerClassName: "areaHeader",
                            Cell: ({ value }) => value && value.toLocaleString('en').replace(/,/g, ".")
                        },
                        {
                            accessor: "currencies",
                            headerClassName: "currenciesHeader",
                            className: "currenciesColumn",
                            sortable: false,
                            Cell: ({ value }) => value && value.map((child, index) => {
                                return (
                                    <div key={index}>{child.name && child.name} {child.symbol && `(${child.symbol})`}</div>
                                )

                            })
                        }
                    ]}
                    getTrProps={(state, rowInfo) => {
                        return {
                            onClick: () => {
                                const data = rowInfo.original;
                                const currencies = data.currencies && data.currencies.map(child => `${child.name !== null ? child.name : ""} ${child.symbol !== null ? `(${child.symbol})` : ""}`);
                                document.getElementById('countryModalImg').innerHTML = `<img src=${data.flag} alt="Modal flag"/>`;
                                document.getElementById('countryModalName').innerHTML = data.name;
                                document.getElementById('countryModalCapital').innerHTML = data.capital;
                                document.getElementById('countryModalPopulation').innerHTML = data.population;
                                document.getElementById('countryModalArea').innerHTML = data.area;
                                document.getElementById('countryModalCurrencies').innerHTML = currencies;
                                this.modalOpener();
                            }
                        };
                    }}
                />

            </>
        );

    }
}

export default props => (
    <StaticQuery
        query={graphql`
        query {
            allInternalCountries(
                filter: {name: {ne: null} }
                sort: {fields: [name], order: ASC}
            ){
                edges {
                    node {
                        name
                        currencies {
                            name
                            symbol
                        }
                        capital
                        population
                        area
                        alpha2Code
                        flag
                    }
                }
            }
        }
      `}
        render={data => <Countries data={data} {...props} />}
    />
)