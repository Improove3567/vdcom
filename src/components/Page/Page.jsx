import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../hooks/hook";
import { Grid, Typography } from "@mui/material";
import SideBar from "../sideBar/SideBar";

const Page = ({ routes }) => {
    const { isAuth } = useAppSelector((state) => state.auth)
    console.log(isAuth)

    const renderComponent = ({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
    );
    return (
        <Grid container>
            {isAuth && (
                <Grid>
                    <SideBar />
                </Grid>
            )}
            <Grid item xs={12} lg={isAuth ? 10 : 12}>
                <Routes>
                    {routes.map(renderComponent)}
                    <Route path="*" element={<Typography variant='h3' sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>Not found</Typography>} />
                </Routes>
            </Grid>
        </Grid>
    );
};

export default Page;