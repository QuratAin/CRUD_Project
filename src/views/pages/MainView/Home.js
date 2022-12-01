/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "./home.css";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import List from "./List";

const Home = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        fullname: "",
        email: "",
    });

    const [status, setStatus] = useState();

    function onTextFieldChange(e) {
        setStudent({ ...student, [e.target.name]: e.target.value });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3333/students`, student);
            setStatus(true);
        } catch (error) {
            console.log("Something is Wrong");
            console.log(error);
        }
    }
    if (status) {
        return <Home />;
    }

    return (
        <>
            <Box textAlign="center" className="box" p={2} mb={2}>
                <Typography variant="h2">React CRUD with API Call</Typography>
            </Box>
            <Grid container justify="center" spacing={4}>
                <Grid item md={6} xs={12}>
                    <Box textAlign="center" p={2} mb={2} className="add">
                        <Typography variant="h4">Add Student</Typography>
                    </Box>
                    <form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                                Add{" "}
                            </Button>
                        </Box>
                    </form>
                </Grid>
                <Grid item md={6} xs={12}>
                    <List />
                </Grid>
            </Grid>
        </>
    );
};

export default Home;