import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";
import SearchWithLabel from "src/components/common/SearchWithLabel";
import Grid from "@mui/material/Grid/Grid";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import Paper from "@mui/material/Paper/Paper";
import TableHead from "@mui/material/TableHead/TableHead";
import {useEffect, useState} from "react";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import Pagination from "@mui/material/Pagination/Pagination";
import {CustomButtonSquareSmall} from "../CustomButton";
import { CSVLink, CSVDownload } from "react-csv";


const ListViewer = (props) => {

    const perPage=10;
    const {data, columns, keys, searchField} = props;
    const [user, setUser] = useState({
        search: {value: null, error: "", showError: false},
    });
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [csvData,setCsvData]=useState([]);

    useEffect(()=>{
        setTotal(Math.ceil(data.length/perPage));
        let downloadData=[];

        downloadData.push(columns);
        for(let l of list){
            downloadData.push(getRawData(l))
        }
        setCsvData(downloadData);
    },[count])


    const onChange = (e, type) => {
        let data;
        data = {...user, [type]: {...user[type], value: e.target.value}};

        setUser(data);
        setCount(count + 1);
    }

    const getRowData = (row) => {
        return keys.map((key) =>
            <TableCell style={{wordBreak: "break-word"}}>
                {row[key]}
            </TableCell>
        )
    }

    const getRawData = (row) => {
        return keys.map((key) => row[key])
    }


    const handleChangePageNumber = (event, value) => {
        setPage(value);
    };


    const list = data && data.length > 0 ? data : [];


    const ColumnsData = columns.map((column) =>
        <TableCell
            sx={{
                minWidth: {xs:"100px",md:"150px"},
                background: "white",
                color: "black",
                fontWeight: "bold"
            }}>
            {column}
        </TableCell>
    )
    const search = user.search.value || "";


    const ContainerData = (list.slice((page-1)*perPage,page*perPage)).filter((d) => (d[searchField]).toLowerCase().includes(search.toLowerCase())).map((d, index) =>
        <TableRow hover tabIndex={-1} key={index} style={{background: (index + 1) % 2 === 0 ? "#f3f9f9" : "white"}}>
            {
                getRowData(d)
            }
        </TableRow>
    );





    return (
        <Grid item xs={12} style={{width: "100%", height: "100%", zIndex: 0}}
              sx={{marginTop: {xs: "30px", md: "20px"}}}>
                <>
                    <Grid item xs={12} container style={{marginTop: "15px"}} justifyContent={'center'}>
                        <Grid item xs={11.5} container justifyContent={"flex-end"}>
                            <CustomButtonSquareSmall>
                                <CSVLink style={{textDecoration:"none",color:"white"}} data={csvData}>Download me</CSVLink>
                            </CustomButtonSquareSmall>
                        </Grid>
                        <Grid item xs={11.5}>
                            <SearchWithLabel label={""} user={user} onChange={onChange}
                                             placeholder={"Search members by name"}/>

                            <Paper sx={{maxHeight:{xs:"50vh",sm:"60vh"}, paddingBottom: "20px",overflow:"auto",marginTop:"10px"}}>
                                <TableContainer style={{height: "85%"}}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {ColumnsData}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {ContainerData}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                            {total>0 &&
                                <Grid item xs={12} container justifyContent={"flex-end"} style={{marginTop:"10px"}}>
                                    <Pagination count={total} page={page} onChange={handleChangePageNumber}/>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </>
        </Grid>
    )
}

export default ListViewer;