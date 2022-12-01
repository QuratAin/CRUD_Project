/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
    Box,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Button,
} from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./list.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Edit from "./Edit";
import Modal from "@mui/material/Modal";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const List = () => {
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = (id) => {
        setOpen(true);
        setStudentId(id);
    };
    const handleClose = () => setOpen(false);
    const [studentid, setStudentId] = useState();

    useEffect(() => {
        async function getAllStudent() {
            try {
                const students = await axios.get("http://localhost:3333/students");
                // console.log(students.data);
                setStudents(students.data);
            } catch (error) {
                console.log("Something is Wrong");
            }
        }
        getAllStudent();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3333/students/${id}`);
        var newstudent = students.filter((item) => {
            // console.log(item);
            return item.id !== id;
        });
        setStudents(newstudent);
        handleClose();
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm to Delete
                    </Typography>
                    <Button onClick={() => handleDelete(studentid)}>Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </Box>
            </Modal>
            <Box textAlign="center" p={2} className="stdList">
                <Typography variant="h4">Student List</Typography>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#616161" }}>
                            <TableCell
                                align="center"
                                className="th"
                                style={{ color: "#fff", fontSize: "1rem" }}
                            >
                                No
                            </TableCell>
                            <TableCell
                                align="center"
                                className="th"
                                style={{ color: "#fff" }}
                            >
                                Name
                            </TableCell>
                            <TableCell
                                align="center"
                                className="th"
                                style={{ color: "#fff" }}
                            >
                                Email
                            </TableCell>
                            <TableCell
                                align="center"
                                className="th"
                                style={{ color: "#fff" }}
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell align="center">{i + 1}</TableCell>
                                    <TableCell align="center">{student.fullname}</TableCell>
                                    <TableCell align="center">{student.email}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Edit">
                                            <IconButton>
                                                <Link to={`/edit/${student.id}`}>
                                                    <EditIcon />
                                                </Link>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleOpen(student.id)}>
                                                <DeleteIcon color="secondary" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default List;