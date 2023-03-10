import React, {createContext, useContext, useEffect, useState} from "react";
import DataTable from 'react-data-table-component';
import SearchFilter from "../search-filter";
import CreateDeleteButton from "../create-delete-button";
import {SelectedIndexContext} from "../../../contex/SelectedIndexContext";
import {differenceBy} from "lodash/array";
import Spiner from "../Spiner";
import placeholder from "lodash/fp/placeholder";
import {columnsAdmin, columnsEtudiant, columnsProfesseur} from "../../../data/starter";
import {ScreenWidthContext} from "../../../contex/ScreenWidthContext";
import CardTable from "../card-table";
import PopUpAlert from "../pop-up-alert";
import {useLocation, useNavigate} from "react-router-dom";
import TabBar from "../tab-bar";

const DynamicTable = ({columns = [placeholder],dataOrigin = [placeholder],deleteFunction,target,loading,className }) => {

    const width = useContext(ScreenWidthContext)

    let navigate = useNavigate();



    const [data,setData]= useState(dataOrigin)
    const [filterText, setFilterText] = React.useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const [active, setActive] = useState(false);
    const [isVisible, setVisible] = useState(() => {
        return width > 768
    })



    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    useEffect(() => {
        if (width < 768) {
            setVisible(false)
        } else setVisible(true)
    }, [width]);


    const keys = Object.keys(data[0]);
    const filteredItems = data.filter(
        item => item[keys[selectedIndex + 1]] && item[keys[selectedIndex + 1]].toLowerCase().includes(filterText.toLowerCase())
    );


    const subHeaderComponentMemo = React.useMemo(() => {

        const handleDelete = () => {

            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.idC)}?`)) {
                setToggleCleared(!toggleCleared);
                if (selectedRows.length === data.length) setData([placeholder])
                else setData(differenceBy(data, selectedRows, 'idC'));

                selectedRows.map((selectedRow) => deleteFunction(selectedRow.idC))
            }
        };


        return (
            <>
                <SelectedIndexContext.Provider value={{selectedIndex, setSelectedIndex}}>
                    <SearchFilter options={columns} onFilter={e => setFilterText(e.target.value)}
                                  filterText={filterText}/>
                    <CreateDeleteButton target={target} selectedRows={selectedRows} createFunction={() => navigate("/Admin/etudiant/add")}
                                        deleteFunction={handleDelete}/>
                </SelectedIndexContext.Provider>

            </>

        );
    }, [data, selectedRows, toggleCleared, filterText, selectedIndex]);

    const paginationComponentOptions = {
        noRowsPerPage:true,
        selectAllRowsItem: false,
        rangeSeparatorText: 'de',
        selectAllRowsItemText: 'Tous',
    };


    return (
        <>
                {isVisible ?
                    <DataTable columns={columns} data={filteredItems} selectableRows={true} center responsive={true}
                               fixedHeader={true} fixedHeaderScrollHeight="100%" subHeader
                               subHeaderComponent={subHeaderComponentMemo} pagination
                               clearSelectedRows={toggleCleared} onSelectedRowsChange={handleRowSelected}
                               progressPending={loading}
                               progressComponent={<Spiner/>}
                               paginationComponentOptions={paginationComponentOptions}
                               className="scrollbar-hide"

                    /> :
                    <CardTable columns={columns} data={filteredItems}/>
                }

            <PopUpAlert open={active} setOpen={() => setActive(false)}/>
        </>


    );
};

export default DynamicTable;