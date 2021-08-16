import React, {useMemo, useState} from "react"
import ContentLoader from "react-content-loader"
import { isEmpty } from "lodash"
import { withRouter } from "react-router-dom"
import { injectIntl } from "react-intl"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, { PaginationProvider } from "react-bootstrap-table2-paginator"
import { getAttr } from "../../../../../helpers"
import Pagination from "./../../data-table/Pagination"
import * as columnFormatters from "./column-formatter"

import {Col} from "react-bootstrap"
import DisplayItem from "../DisplayItem"
import SearchFilter from "./../../../controls/SearchFilter"


const TableLoader = ({ colNbr = 5, colHeigth = 20, width = 100 }) => (
  <ContentLoader
    width={`${width}%`}
    height={colNbr * colHeigth + 10}
    viewBox={`0 0 ${width}% ${colNbr * colHeigth + 10}`}
    backgroundColor="#eaeced"
    foregroundColor="#ffffff"
  >
    {new Array(colNbr).fill(" ").map((_, i) => {
      const colWidth = ((width - colNbr) / colNbr)
      return (
        <React.Fragment key={i}>
          <rect x={(colWidth * i) + i + "%"} y={ 10 } rx="0" ry="0" width={ colWidth + "%"} height={colHeigth} />
          <rect x={(colWidth * i) + i + "%"} y={ colHeigth + 20 } rx="0" ry="0" width={ colWidth + "%"} height={colHeigth} />
          <rect x={(colWidth * i) + i + "%"} y={ colHeigth + colHeigth + 30 } rx="0" ry="0" width={ colWidth + "%"} height={colHeigth} />
        </React.Fragment>
      )
    })}
  </ContentLoader>
)


const TableOfItems = ({ field, object, intl, history }) => {

  const { name, columns, openShowPage, showSearchField=true, addAnotherActions, showActions = true, icon, label, size = 12 } = field

  const [searchTerm, setSearchTerm] = useState()

  const currentValue = useMemo(() => {
    return getAttr(object, name, [])

    // eslint-disable-next-line
  }, [object])

  const searchInTable = (currentValue, searchTerm) => {
    const values = JSON.parse(JSON.stringify(currentValue))
    if (searchTerm){
      return values.filter((fields) => Object.keys(fields).some((key) => fields[key] === searchTerm))
    }
    return values
  }

  const fieldPaginationOptions = {
    custom: true,
    totalSize: currentValue.length
  }

  return (
    <>
      <Col lg={size}>
        <DisplayItem
          primary={ label }
          icon={icon}
          secondary={
            isEmpty(object) ? <TableLoader colNbr={columns.length} /> :
              <>
                { showSearchField && <SearchFilter applyFilter={({ search }) => setSearchTerm(search) } /> }
                <PaginationProvider pagination={paginationFactory(fieldPaginationOptions)}>
                  {({ paginationProps, paginationTableProps }) => (
                    <Pagination
                      paginationProps={paginationProps}
                    >
                      <BootstrapTable
                        pagination={paginationFactory(fieldPaginationOptions)}
                        keyField="id"
                        wrapperClasses="table-responsive"
                        classes="table table-head-custom table-vertical-center overflow-hidden"
                        bootstrap4
                        bordered={false}
                        data={ searchInTable(currentValue, searchTerm) }
                        noDataIndication={ () => <div className="p-4 text-center text-muted font-weight-bolder">{ intl.formatMessage({ id: "GENERAL.NO_DATA" }) } </div> }
                        columns={ showActions ? [
                          ...columns,
                          {
                            dataField: "action",
                            text: intl.formatMessage({ id: "GENERAL.ACTIONS" }),
                            formatter: columnFormatters.ActionsColumnFormatter,
                            formatExtraData: {
                              openShowPage,
                              currentObj: object,
                              addAnotherActions,
                              history
                            },
                            classes: "text-right pr-0",
                            headerClasses: "text-right pr-3",
                            style: {
                              minWidth: "200px",
                            },
                          },
                        ] : columns}
                        {...paginationTableProps}
                      />
                    </Pagination>
                  ) }
                </PaginationProvider>
              </>
          }
        />
      </Col>
    </>
  )
}


export default withRouter(injectIntl(TableOfItems))
