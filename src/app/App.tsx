import Menu from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"

import React from "react"
import { Route, Routes } from "react-router-dom"
import { TodolistsList } from "@/features/TodolistsList/TodolistsList"
import { Login } from "@/features/Login/Login"
import { ErrorBar } from "@/components/ErrorBar/ErrorBar"
import "./App.css"

type PropsType = {
   demo?: boolean
}

function App({ demo = false }: PropsType) {
   // const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
   // const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
   // const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
   // const dispatch = useDispatch<any>()
   //
   // useEffect(() => {
   //    dispatch(initializeAppTC())
   // }, [])
   //
   // const logoutHandler = useCallback(() => {
   //    dispatch(logoutTC())
   // }, [])
   //
   // if (!isInitialized) {
   //    return (
   //       <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
   //          <CircularProgress />
   //       </div>
   //    )
   // }

   return (
      <div className="App">
         <ErrorBar />
         <AppBar position="fixed">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <Menu />
               </IconButton>
               {/* {isLoggedIn && ( */}
               {/*   <Button color="primary" onClick={logoutHandler} variant={"contained"}> */}
               {/*      Log out */}
               {/*   </Button> */}
               {/* )} */}
            </Toolbar>
            {/* {status === "loading" && <LinearProgress />} */}
         </AppBar>
         <Container fixed sx={{ marginTop: "64px" }}>
            <Routes>
               <Route path={"/"} element={<TodolistsList demo={demo} />} />
               <Route path={"/todolist_main"} element={<TodolistsList demo={demo} />} />
               <Route path={"/login"} element={<Login />} />
            </Routes>
         </Container>
      </div>
   )
}

export default App
