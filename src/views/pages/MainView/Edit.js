/* eslint-disable prettier/prettier */
import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "./edit.css";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const Edit = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        fullname: "",
        email: "",
    });
    useEffect(() => {
        async function getStudent() {
            try {
                const student = await axios.get(`http://localhost:3333/students/${id}`);
                setStudent(student.data);
            } catch (error) {
                console.log("Something is Wrong");
            }
        }
        getStudent();
    }, [id]);

    const [status, setStatus] = useState();

    function onTextFieldChange(e) {
        setStudent({ ...student, [e.target.name]: e.target.value });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        try {
            console.log(student);
            await axios.put(`http://localhost:3333/students/${id}`, student);
            setStatus(true);
        } catch (error) {
            console.log("Something is Wrong");
            console.log(error);
        }
    }

    function handleClick() {
        navigate("/create");
    }
    return (
        <>
            <Grid container justify="center" spacing={4}>
                <Grid item md={6} xs={12}>
                    <Box textAlign="center" p={2} mb={2}>
                        <Typography variant="h4">Edit Student</Typography>
                    </Box>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="id"
                                    name="id"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="id"
                                    label="ID"
                                    autoFocus
                                    value={id}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="stuname"
                                    name="fullname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="stuname"
                                    label="Name"
                                    value={student.stuname}
                                    onChange={(e) => onTextFieldChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="email"
                                    name="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    value={student.email}
                                    onChange={(e) => onTextFieldChange(e)}
                                />
                            </Grid>
                        </Grid>
                        <Box m={3}>
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={(e) => onFormSubmit(e)}
                            >
                                {" "}
                                Update{" "}
                            </Button>
                        </Box>
                    </form>
                    <Box m={3} textAlign="center">
                        <Button variant="contained" color="primary" onClick={handleClick}>
                            Back to Home
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Edit 